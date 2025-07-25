import { services } from '../../data/services';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceCard from '../../components/ServiceCard';

function groupByCategory(servicesArr: typeof services) {
  return servicesArr.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, typeof services>);
}

const placeholderDesc = 'Short description of the service goes here.';
const placeholderBullets = [
  'Key benefit or feature',
  'Another highlight',
  'Why choose this service',
];

export default function ServicesMainPage() {
  const grouped = groupByCategory(services);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Skin Care Clinic</h1>
        <p className="text-center text-gray-600 mb-10">Discover our comprehensive range of advanced aesthetic treatments designed to help you achieve your skin goals.</p>
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat} className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-pink-700 text-center">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {list.map(service => (
                <ServiceCard
                  key={service.slug}
                  name={service.name}
                  description={placeholderDesc}
                  bullets={placeholderBullets}
                  href={`/${service.slug}/littleton-co`}
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
