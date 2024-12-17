import React, { useState,useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Tag, 
  Compass, 
  Headset, 
  CheckCircle 
} from 'lucide-react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedTours from '../components/FeaturedTours';


// Destinations Data
const destinations = [
  { 
    name: 'Beaches', 
    image: "assets/beach.jpg",
    icon: <MapPin className="w-12 h-12 text-blue-600" />
  },
  { 
    name: 'Mountains', 
    image: 'assets/mountains.jpg',
    icon: <Compass className="w-12 h-12 text-green-600" />
  },
  { 
    name: 'Cultural Heritage', 
    image: 'assets/temple.jpeg',
    icon: <Clock className="w-12 h-12 text-purple-600" />
  },
  { 
    name: 'Adventure Sports', 
    image: 'assets/sports.jpg',
    icon: <Tag className="w-12 h-12 text-red-600" />
  }
];

// Testimonials Data
const testimonials = [
  {
    name: 'Sarah M.',
    quote: 'An incredible journey that exceeded all my expectations!',
    rating: 5
  },
  {
    name: 'John D.',
    quote: 'Professional service and amazing travel packages.',
    rating: 4
  }
];

const HomePage = () => {
  const [email, setEmail] = useState('');

  // Custom Card Component
  const CustomCard = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-white mt-16">
      
      <HeroSection />

      <FeaturedTours />

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            Why Choose Our Travel Agency
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                icon: <CheckCircle className="mx-auto mb-4 w-12 h-12 text-blue-600" />, 
                title: 'Expertly Curated Packages' 
              },
              { 
                icon: <Headset className="mx-auto mb-4 w-12 h-12 text-green-600" />, 
                title: '24/7 Support' 
              },
              { 
                icon: <Tag className="mx-auto mb-4 w-12 h-12 text-red-600" />, 
                title: 'Best Price Guarantee' 
              },
              { 
                icon: <Compass className="mx-auto mb-4 w-12 h-12 text-purple-600" />, 
                title: 'Customizable Itineraries' 
              }
            ].map((benefit, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                {benefit.icon}
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Destinations */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Explore Destinations
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <CustomCard key={index} className="hover:shadow-xl transition-all">
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-full h-48 object-cover"
              />
              <div className="flex items-center justify-between p-4">
                {dest.icon}
                <h3 className="text-xl font-semibold">{dest.name}</h3>
                <button className="border border-blue-500 text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-50 transition">
                  Explore
                </button>
              </div>
            </CustomCard>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            What Our Travelers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((test, index) => (
              <CustomCard key={index} className="p-6">
                <p className="italic mb-4">"{test.quote}"</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{test.name}</span>
                  <div className="text-yellow-500">
                    {'★'.repeat(test.rating)}
                  </div>
                </div>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Stay Updated with Exclusive Deals
        </h2>
        <p className="mb-6 text-muted-foreground">
          Subscribe for exclusive travel deals and updates!
        </p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mr-2 flex-grow px-4 py-2 border rounded-lg"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Subscribe
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          We'll send updates monthly. No spam, guaranteed!
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link, index) => (
              <a 
                key={index} 
                href="#" 
                className="block mb-2 hover:text-blue-300"
              >
                {link}
              </a>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {['Facebook', 'Instagram', 'Twitter'].map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="hover:text-blue-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">We Accept</h3>
            <div className="flex space-x-4">
              {['Visa', 'Mastercard', 'PayPal'].map((payment, index) => (
                <span key={index}>{payment}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          © 2024 Adventure Travel Agency. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;