import React from 'react';

const Testimonials = () => (
  <section className="w-full py-10 md:py-16 bg-transparent" id="testimonials">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-800 text-center font-serif">What Our Clients Say</h2>
    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-6 bg-gradient-to-br from-yellow-100 via-white to-yellow-200 rounded-2xl shadow-xl">
        <p className="text-brown-700 font-serif">[Testimonial placeholder]</p>
        <div className="mt-2 text-sm text-orange-700 font-serif">- [Client Name]</div>
      </div>
      <div className="p-6 bg-gradient-to-br from-yellow-100 via-white to-yellow-200 rounded-2xl shadow-xl">
        <p className="text-brown-700 font-serif">[Testimonial placeholder]</p>
        <div className="mt-2 text-sm text-orange-700 font-serif">- [Client Name]</div>
      </div>
    </div>
  </section>
);

export default Testimonials; 