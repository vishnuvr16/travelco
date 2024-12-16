import React from 'react';
const Newsletter = () => {
  return (
    <section className="bg-travel-primary py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Get Travel Updates
        </h2>
        <p className="text-white/80 mb-8">
          Subscribe to our newsletter and never miss our special offers
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-3 rounded focus:outline-none focus:ring-2 focus:ring-travel-accent"
          />
          <button className="bg-travel-accent text-white px-8 py-3 rounded hover:bg-travel-accent/90 transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};
export default Newsletter;