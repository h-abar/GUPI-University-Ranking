import { query } from '@/lib/db';

const SITE_URL = 'https://gupi.topauniversity.com';

export default async function sitemap() {
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/rankings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/methodology`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  let universityPages = [];
  try {
    const { rows } = await query('SELECT id, updated_at FROM universities ORDER BY id');
    universityPages = rows.map((u) => ({
      url: `${SITE_URL}/universities/${u.id}`,
      lastModified: u.updated_at ? new Date(u.updated_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (e) {
    // DB not available at build time — skip dynamic pages
  }

  return [...staticPages, ...universityPages];
}
