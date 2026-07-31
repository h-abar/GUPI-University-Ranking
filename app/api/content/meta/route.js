import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET — admin only, returns full site_content with metadata
export async function GET(request) {
  const auth = requireAuth(request);
  if (!auth.id) return auth;

  const { rows } = await query('SELECT key, value, label, section, type, sort_order FROM site_content ORDER BY section, sort_order');
  return NextResponse.json(rows);
}
