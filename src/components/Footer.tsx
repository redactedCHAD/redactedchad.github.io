import React from 'react';

const Footer = () => (
  <footer className="w-full bg-gradient-to-br from-yellow-100 via-white to-yellow-200 rounded-2xl shadow-xl py-8 px-6 text-xs text-brown-700 mt-12 font-serif">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 max-w-5xl mx-auto">
      <div>
        <strong className="text-orange-800">The GLO Alchemist</strong> &bull; 709 W Littleton Blvd Suite 105, Littleton, CO 80120<br />
        (303) 506-3582 &bull; info@thegloalchemist.com
      </div>
      <div>
        <span>Hours: Tues-Sat 9:30 AM - 5:00 PM</span>
      </div>
      <div>
        &copy; {new Date().getFullYear()} The GLO Alchemist. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer; 