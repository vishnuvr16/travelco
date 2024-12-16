import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, DollarSign } from 'lucide-react';

const PackageCard = ({ package: pkg, onBookNow }) => {
  return (
    <motion.div 
      className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative">
        <img 
          src={pkg.imageUrl} 
          alt={pkg.title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">{pkg.title}</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>Max {pkg.maxGroupSize}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {pkg.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-green-600">
            <DollarSign className="w-5 h-5" />
            <span className="text-xl font-bold">{pkg.price}</span>
          </div>
          
          <motion.button 
            onClick={() => onBookNow(pkg)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;