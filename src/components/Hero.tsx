import React from 'react';
import Image from 'next/image';

const features = [
  'Licensed Medical Professionals',
  'Advanced Laser Technology',
  'Personalized Treatment Plans',
];

const Hero = () => (
  <section className="w-full min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl mx-auto">
      <div className="flex-1 max-w-xl flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-3xl md:text-5xl mb-4 text-brown-900">
          <span className="italic">Find Your </span>
          <span className="font-bold text-orange-700">GLO</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-brown-800 mb-4">Skin Care Clinic in Littleton, Colorado</h2>
        <p className="text-md md:text-lg text-brown-700 mb-6">
          Transform your skin with advanced laser treatments, professional facials, and medical-grade aesthetics. Experience the difference at The GLO Alchemist – where <span className="italic">healthy skin is always in</span>.
        </p>
        <div className="flex gap-4 mb-6 justify-center md:justify-start">
          <a
            href="https://thegloalchemist.myaestheticrecord.com/online-booking"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-thermal text-white rounded-full px-8 py-3"
          >
            Book Free Consultation
          </a>
          <a
            href="tel:3035063582"
            className="btn-thermal text-white rounded-lg px-8 py-3"
          >
            Call Now
          </a>
        </div>
        <div className="flex flex-wrap gap-6 mt-4 justify-center md:justify-start">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-green-700 text-sm">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 16.5 5 12l1.4-1.4 3.1 3.09 7.09-7.09L18 8l-8.5 8.5Z"/></svg>
              {f}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[27rem] h-[27rem] rounded-2xl shadow-xl flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 overflow-hidden">
          <Image
            src="/hero1.png"
            alt="Professional skin care treatment at The GLO Alchemist in Littleton, CO"
            width={432}
            height={432}
            className="object-cover w-full h-full"
            priority
            sizes="(max-width: 768px) 100vw, 432px"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Hero; 