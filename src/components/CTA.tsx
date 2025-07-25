import React from 'react';

const CTA = () => (
  <section className="w-full py-10 md:py-16 flex justify-center items-center bg-transparent" id="contact">
    <div className="w-full max-w-2xl bg-gradient-to-br from-yellow-100 via-white to-yellow-200 rounded-2xl shadow-xl p-8 mx-4 text-center flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-800">Ready to GLO?</h2>
      <p className="mb-6 text-brown-700">[CTA placeholder: Encourage consultation booking]</p>
      <a href="https://thegloalchemist.myaestheticrecord.com/online-booking" target="_blank" rel="noopener noreferrer" className="inline-block btn-thermal text-white mb-2 rounded-lg px-6 py-3">Book Your Consultation</a>
    </div>
  </section>
);

export default CTA; 