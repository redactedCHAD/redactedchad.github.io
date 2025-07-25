import { Metadata } from 'next';
import { services } from '../../../data/services';
import { neighborhoods } from '../../../data/neighborhoods';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

function groupByCategory(servicesArr: typeof services) {
  return servicesArr.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, typeof services>);
}

export async function generateStaticParams() {
  const params = [];
  for (const service of services) {
    for (const neighborhood of neighborhoods) {
      params.push({ service: service.slug, neighborhood });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ service: string, neighborhood: string }> }): Promise<Metadata> {
  const { service: serviceSlug, neighborhood: neighborhoodSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  const neighborhood = neighborhoodSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    title: `${service?.name || '[Service]'} in ${neighborhood}, CO | The GLO Alchemist`,
    description: `[SEO placeholder: ${service?.name || '[Service]'} in ${neighborhood}, CO at The GLO Alchemist]`,
  };
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ service: string, neighborhood: string }> }) {
  const { service: serviceSlug, neighborhood: neighborhoodSlug } = await params;
  const service = services.find((s) => s.slug === serviceSlug);
  const neighborhood = neighborhoodSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const grouped = groupByCategory(services);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">{service?.name || '[Service]'} in {neighborhood}, CO | The GLO Alchemist</h1>
        <div className="mb-6 text-gray-600">[Neighborhood page placeholder: local landmarks, service availability, travel considerations, 800-1000 words]</div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">All Services & Subcategories</h2>
          {Object.entries(grouped).map(([cat, list]) => (
            <div key={cat} className="mb-4">
              <div className="font-bold text-pink-700 mb-1">{cat}</div>
              <ul className="list-disc list-inside ml-4">
                {list.map(s => (
                  <li key={s.slug} className={s.slug === service?.slug ? 'font-semibold text-black' : ''}>{s.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Schema.org JSON-LD placeholder */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service?.name || '[Service]',
            provider: {
              '@type': 'SkinCareClinic',
              name: 'The GLO Alchemist',
              address: '709 W Littleton Blvd Suite 105, Littleton, CO 80120',
              telephone: '(303) 506-3582',
            },
            areaServed: `${neighborhood}, CO`,
          }),
        }} />
      </main>
      <Footer />
    </div>
  );
} 