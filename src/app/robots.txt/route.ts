export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://thegloalchemist.com/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}