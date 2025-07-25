import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ServiceCardProps = {
  name: string;
  description?: string;
  bullets?: string[];
  href: string;
  imgSrc?: string;
};

const ServiceCard = ({ name, description, bullets, href, imgSrc }: ServiceCardProps) => (
  <div className="card-spike bg-gradient-to-br from-yellow-100 via-white to-yellow-200 border-0 rounded-2xl shadow-xl p-6 flex flex-col items-start min-h-[320px]">
    {imgSrc ? (
      <Image 
        src={imgSrc} 
        alt={`${name} service at The GLO Alchemist`} 
        width={300}
        height={112}
        className="w-full h-28 object-cover rounded-xl mb-4" 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    ) : (
      <div className="w-full h-28 bg-orange-100 rounded-xl mb-4 flex items-center justify-center text-orange-400 text-sm font-serif">Service Image</div>
    )}
    <h3 className="text-lg font-bold mb-1 text-orange-800">{name}</h3>
    {description && <p className="text-sm text-brown-700 mb-2">{description}</p>}
    {bullets && (
      <ul className="text-xs text-brown-700 mb-2 list-disc list-inside">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    )}
    <Link href={href} className="mt-auto btn-thermal text-white text-sm rounded-lg px-6 py-2">Learn More →</Link>
  </div>
);

export default ServiceCard; 