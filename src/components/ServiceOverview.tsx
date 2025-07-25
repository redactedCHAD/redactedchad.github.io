import React from 'react';
import { services } from '../data/services';
import ServiceCard from './ServiceCard';

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

const serviceImages: Record<string, string> = {
  'dermaplaning': '/dermaplaning-ft.png',
  'chemical-peels': '/chemicalpeel-ft.png',
  'microneedling': '/microneedling-ft.png',
  'hydrating-facial': '/hydrating-f.png',
  'detoxifying-facial': '/detoxifying-f.png',
  'vitality-facial': '/vitality-f.png',
};

const ServiceOverview = () => {
  const grouped = groupByCategory(services);
  return (
    <section className="w-full py-10 md:py-16 bg-white" id="services">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Services</h2>
      <div className="max-w-6xl mx-auto">
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat} className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-pink-700 text-center">{cat}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {list.map(service => (
                <ServiceCard
                  key={service.slug}
                  name={service.name}
                  description={placeholderDesc}
                  bullets={placeholderBullets}
                  href={`/${service.slug}/littleton-co`}
                  imgSrc={serviceImages[service.slug]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceOverview; 