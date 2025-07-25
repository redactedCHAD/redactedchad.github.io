import { services } from '../../data/services';
import { neighborhoods } from '../../data/neighborhoods';
import { NextResponse } from 'next/server';

const BASE_URL = 'https://thegloalchemist.com'; // Change to your production URL

export async function GET() {
  const staticPages = [
    '',
    'services',
  ];

  const servicePages = services.map(s => `${s.slug}-littleton-co`);

  const neighborhoodPages = services.flatMap(s =>
    neighborhoods.map(n => `${s.slug}/${n}`)
  );

  const allPages = [
    ...staticPages,
    ...servicePages,
    ...neighborhoodPages,
  ];

  const urls = allPages.map(path =>
    `<url>
      <loc>${BASE_URL}/${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>`
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 