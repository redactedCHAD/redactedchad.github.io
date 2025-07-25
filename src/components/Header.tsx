import React from 'react';
import Link from 'next/link';

// Add smooth scroll globally
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth';
}

const Header = () => (
  <header className="sticky top-0 w-full bg-gradient-to-br from-yellow-100 via-white to-yellow-200 rounded-2xl shadow-xl py-4 px-6 flex flex-col md:flex-row md:items-center md:justify-between z-50">
    <Link href="/" className="text-2xl font-bold text-gray-900">The GLO Alchemist</Link>
    <nav className="mt-2 md:mt-0 flex flex-wrap gap-2">
      <Link href="/#hero" className="btn-thermal text-white text-xs px-3 py-1.5 rounded-lg">GLO Alchemist</Link>
      <Link href="/#services" className="btn-thermal text-white text-xs px-3 py-1.5 rounded-lg">Services</Link>
      <Link href="/#about" className="btn-thermal text-white text-xs px-3 py-1.5 rounded-lg">About</Link>
      <Link href="/#testimonials" className="btn-thermal text-white text-xs px-3 py-1.5 rounded-lg">Testimonials</Link>
      <Link href="/#contact" className="btn-thermal text-white text-xs px-3 py-1.5 rounded-lg">Contact</Link>
    </nav>
    <div className="mt-2 md:mt-0 text-xs text-gray-500 text-right">
      709 W Littleton Blvd Suite 105<br />
      Littleton, CO 80120<br />
      (303) 506-3582
    </div>
  </header>
);

export default Header; 