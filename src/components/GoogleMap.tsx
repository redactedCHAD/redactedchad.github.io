import React from 'react';

const GoogleMap = () => (
  <section className="w-full py-10 md:py-16 bg-gray-50 flex flex-col items-center" id="map">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Find Us</h2>
    <div className="w-full max-w-2xl h-72 md:h-96 rounded-lg overflow-hidden shadow">
      {/* Replace src with actual Google Maps embed URL for the business profile */}
      <iframe
        title="Google Maps Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3067.123456789!2d-105.016650684623!3d39.6133219794616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c7e1b1b1b1b1b%3A0x123456789abcdef!2s709%20W%20Littleton%20Blvd%20Ste%20105%2C%20Littleton%2C%20CO%2080120!5e0!3m2!1sen!2sus!4v0000000000000!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </section>
);

export default GoogleMap; 