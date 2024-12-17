import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, Heart } from 'lucide-react';
import summaryApi from '../common';
import { Link } from 'react-router-dom';

const FeaturedTours = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading,setLoading] = useState(false)

  const [tourPackages,setTourPackages] = useState([]);

  useEffect(() => {
    const getpackages = async () => {
      try {
        setLoading(true)
        const response = await fetch(summaryApi.getAllTours.url, {
          method: summaryApi.getAllTours.method,
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }

        const allPackages = await response.json();
        setTourPackages(allPackages.Tours);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    getpackages();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.03,
      transition: { duration: 0.2 }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Featured Tour Packages
        </motion.h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated tours that promise unforgettable experiences and memories that last a lifetime.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-3 gap-8"
      >
        {tourPackages.map((tour) => (
          <motion.div
            key={tour.id}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
          >
            {/* Tour Image */}
            <div className="relative">
              <img 
                src={`assets/${tour.photos[0]}.jpg`} 
                alt={tour.title} 
                className="w-full h-64 object-cover"
              />
              
            </div>

            {/* Tour Details */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-bold text-gray-900">{tour.title}</h3>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{tour.overview}</p>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-600" size={20} />
                  <span className="text-gray-700">{tour.destination}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-blue-600" size={20} />
                  <span className="text-gray-700">{tour.duration}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">${tour.price}</div>
                    <Link to={`/tours/${tour._id}`}>
                    <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </motion.button>
                    </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedTours;