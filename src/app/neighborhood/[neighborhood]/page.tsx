import { services } from '../../../data/services';
import { neighborhoods } from '../../../data/neighborhoods';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ServiceCard from '../../../components/ServiceCard';
import { notFound } from 'next/navigation';

function groupByCategory(servicesArr: typeof services) {
  return servicesArr.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, typeof services>);
}

export async function generateStaticParams() {
  return neighborhoods.map((neighborhood) => ({ neighborhood }));
}

export default async function NeighborhoodServicesPage({ params }: { params: Promise<{ neighborhood: string }> }) {
  const { neighborhood } = await params;
  if (!neighborhoods.includes(neighborhood)) return notFound();
  const grouped = groupByCategory(services);
  const prettyName = neighborhood.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">All Services in {prettyName}, CO</h1>
        <p className="text-center text-gray-600 mb-10">Explore our advanced treatments available in {prettyName}. Click any card to view details for this neighborhood.</p>
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat} className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-pink-700 text-center">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {list.map(service => (
                <ServiceCard
                  key={service.slug}
                  name={service.name}
                  description={'Service Description Placeholder'}
                  bullets={['Key Feature 1', 'Key Feature 2', 'Key Feature 3']}
                  href={`/${service.slug}/${neighborhood}`}
                />
              ))}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}