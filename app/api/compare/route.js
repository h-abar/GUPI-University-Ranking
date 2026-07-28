import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { rankUniversities, getRankingConfigs, getSettings } from '@/lib/scoring';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET() {
  const { rows } = await query('SELECT id, name, country, founded FROM universities ORDER BY name');
  return NextResponse.json(rows);
}

export async function POST(request) {
  const { university1Id, university2Id } = await request.json();

  if (!university1Id || !university2Id || university1Id === university2Id) {
    return NextResponse.json({ error: 'اختر جامعتين مختلفتين' }, { status: 400 });
  }

  const { rows } = await query('SELECT * FROM universities WHERE id = $1 OR id = $2', [
    university1Id,
    university2Id,
  ]);

  if (rows.length < 2) {
    return NextResponse.json({ error: 'لم يتم العثور على الجامعتين' }, { status: 404 });
  }

  const configs = await getRankingConfigs();
  const settings = await getSettings();
  const ranked = await rankUniversities(rows, configs, settings);

  const uni1 = ranked.find((u) => u.id === university1Id);
  const uni2 = ranked.find((u) => u.id === university2Id);

  const comparisonData = buildComparisonData(uni1, uni2, configs, settings);

  // Return comparison data immediately — AI analysis is fetched separately
  return NextResponse.json({ ...comparisonData, aiAnalysis: null, aiError: null });
}

export async function PATCH(request) {
  const { university1Id, university2Id } = await request.json();

  if (!university1Id || !university2Id || university1Id === university2Id) {
    return NextResponse.json({ error: 'اختر جامعتين مختلفتين' }, { status: 400 });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      aiAnalysis: null,
      aiError: 'مفتاح NVIDIA API غير مُهيأ. تواصل مع المسؤول.',
    });
  }

  const { rows } = await query('SELECT * FROM universities WHERE id = $1 OR id = $2', [
    university1Id,
    university2Id,
  ]);

  if (rows.length < 2) {
    return NextResponse.json({ error: 'لم يتم العثور على الجامعتين' }, { status: 404 });
  }

  const configs = await getRankingConfigs();
  const settings = await getSettings();
  const ranked = await rankUniversities(rows, configs, settings);

  const uni1 = ranked.find((u) => u.id === university1Id);
  const uni2 = ranked.find((u) => u.id === university2Id);

  try {
    const aiAnalysis = await getAIAnalysis(uni1, uni2, configs);
    return NextResponse.json({ aiAnalysis, aiError: null });
  } catch (err) {
    return NextResponse.json({
      aiAnalysis: null,
      aiError: `تعذر الحصول على التحليل الذكي: ${err.message}`,
    });
  }
}

function buildComparisonData(uni1, uni2, configs, settings) {
  const allRankings = configs
    .filter((c) => c.active)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((c) => ({
      field_key: c.field_key,
      label_ar: c.label_ar,
      label_en: c.label_en,
      category: c.category,
      is_presence: c.is_presence,
      is_excellence: c.is_excellence,
      uni1_value: uni1[c.field_key] || null,
      uni2_value: uni2[c.field_key] || null,
      uni1_present: isPresentCheck(uni1[c.field_key]),
      uni2_present: isPresentCheck(uni2[c.field_key]),
    }));

  return {
    uni1: {
      id: uni1.id,
      name: uni1.name,
      country: uni1.country,
      founded: uni1.founded,
      articles_2025: uni1.articles_2025,
      rank: uni1.rank,
      gupi: uni1.gupi,
    },
    uni2: {
      id: uni2.id,
      name: uni2.name,
      country: uni2.country,
      founded: uni2.founded,
      articles_2025: uni2.articles_2025,
      rank: uni2.rank,
      gupi: uni2.gupi,
    },
    allRankings,
    settings: {
      maxPresence: settings.max_presence_score || '18',
      maxExcellence: settings.max_excellence_score || '5',
      maxTotal: settings.max_total_score || '100',
    },
  };
}

function isPresentCheck(value) {
  if (value === null || value === undefined) return false;
  const s = String(value).trim();
  if (s === '' || s === 'ـ' || s === '-' || s === 'None' || s === 'null') return false;
  return true;
}

async function getAIAnalysis(uni1, uni2, configs) {
  const uni1Data = buildUniSummary(uni1, configs);
  const uni2Data = buildUniSummary(uni2, configs);

  const systemPrompt = `أنت محلل أكاديمي خبير في مؤشر GUPI. قارن جامعتين عربيتين بناءً على البيانات المقدمة فقط.
قواعد: لا تخترع بيانات، اكتب بالعربية الفصحى، نظّم بالعناوين والنقاط.
هيكل التحليل:
## ملخص المواجهة
- الفائز ولماذا
## مقارنة الحضور الدولي
## مقارنة التميز الأكاديمي
## نقاط القوة والضعف
## الخلاصة`;

  const userPrompt = `قارن بين الجامعتين التاليتين:
الجامعة الأولى: ${JSON.stringify(uni1Data)}
الجامعة الثانية: ${JSON.stringify(uni2Data)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  let response;
  try {
    response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-8b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        top_p: 0.7,
        max_tokens: 1024,
      }),
      signal: controller.signal,
    });
  } catch (fetchErr) {
    clearTimeout(timeout);
    if (fetchErr.name === 'AbortError') {
      throw new Error('انتهت مهلة الاتصال بـ NVIDIA API (60 ثانية)');
    }
    throw fetchErr;
  }
  clearTimeout(timeout);

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`NVIDIA API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'لم يتم إنشاء تحليل.';
}

function buildUniSummary(uni, configs) {
  const rankings = {};
  for (const c of configs.filter((c) => c.active)) {
    rankings[c.label_ar] = {
      value: uni[c.field_key] || null,
      present: isPresentCheck(uni[c.field_key]),
    };
  }

  return {
    name: uni.name,
    country: uni.country,
    founded: uni.founded,
    articles_2025: uni.articles_2025,
    gupi_rank: uni.rank,
    gupi_total_score: uni.gupi.totalScore,
    presence_score: uni.gupi.presenceScore,
    max_presence: uni.gupi.maxPresence,
    excellence_score: uni.gupi.excellenceScore,
    max_excellence: uni.gupi.maxExcellence,
    best_top_ranking: uni.gupi.bestTopRanking,
    presence_details: uni.gupi.presenceDetails.map((d) => ({
      label: d.label,
      present: d.present,
      weight: d.weight,
    })),
    excellence_details: uni.gupi.excellenceDetails.map((d) => ({
      label: d.label,
      present: d.present,
      rankNum: d.rankNum,
      excellencePoints: d.excellencePoints,
    })),
    all_rankings: rankings,
  };
}
