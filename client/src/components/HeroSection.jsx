import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [destination, setDestination] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const backgroundVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.5 } }
  };

  const searchVariants = {
    initial: { width: '100%', borderRadius: '10px' },
    focused: { 
      width: '110%', 
      borderRadius: '15px', 
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Gradient Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-200 z-0"
        variants={backgroundVariants}
        initial="initial"
        whileHover="hover"
      />

      {/* Animated Plane Icon */}
      <motion.div 
        className="absolute top-40 right-40 text-blue-600 opacity-20"
        animate={{ 
          x: [0, 20, -20, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Plane size={400} strokeWidth={1} />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center h-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
        >
          {/* Main Headline */}
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            Discover <span className="text-blue-600">Extraordinary</span> Journeys
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600">
            Crafting personalized travel experiences that transform ordinary trips into extraordinary adventures.
          </p>

          {/* Search and Booking Section */}
          <motion.div 
            className="bg-white p-2 rounded-xl shadow-xl flex items-center space-x-2 border border-gray-200"
            variants={searchVariants}
            initial="initial"
            animate={isSearchFocused ? "focused" : "initial"}
          >
            <div className="flex items-center space-x-2 w-full">
              <MapPin className="text-blue-600" />
              <input 
                type="text" 
                placeholder="Where are you heading?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full py-3 px-2 outline-none text-lg text-gray-700"
              />
              <Calendar className="text-blue-600" />
              <Link to="/tours">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
              >
                <span>Explore</span>
                <ArrowRight size={20} />
              </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="flex space-x-8 mt-8">
            {[
              { value: '50+', label: 'Destinations' },
              { value: '2K+', label: 'Happy Travelers' },
              { value: '3+', label: 'Years of Experience' }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;