import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { neighborhoods } from '../data/neighborhoods';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Lazy load components below the fold
const ServiceOverview = dynamic(() => import('../components/ServiceOverview'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
});
const About = dynamic(() => import('../components/About'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
});
const Testimonials = dynamic(() => import('../components/Testimonials'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
});
const GoogleMap = dynamic(() => import('../components/GoogleMap'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
});
const CTA = dynamic(() => import('../components/CTA'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg mx-4" />}>
          <ServiceOverview />
        </Suspense>
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg mx-4" />}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg mx-4" />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg mx-4" />}>
          <GoogleMap />
        </Suspense>
        <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse rounded-lg mx-4" />}>
          <CTA />
        </Suspense>
      </main>
        <div className="w-full flex justify-center items-center py-10">
          <div className="w-full max-w-2xl bg-gradient-to-br from-yellow-100 via-white to-yellow-200 rounded-2xl shadow-xl p-8 mx-4 text-center flex flex-col items-center">
            <h3 className="text-lg mb-4 text-center">Proudly Serving These Colorado Neighborhoods</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {neighborhoods.map(n => (
                <a
                  key={n}
                  href={`/neighborhood/${n}`}
                  className="btn-thermal text-white text-sm px-4 py-2 rounded-lg"
                >
                  {n.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </a>
              ))}
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
}
