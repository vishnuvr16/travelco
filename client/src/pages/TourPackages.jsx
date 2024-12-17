import React, { useState, useMemo, useEffect } from 'react';
import { Filter, MapPin, Clock, Users, Star } from 'lucide-react';
import summaryApi from '../common';
import {Link} from "react-router-dom"

const TourPackages = () => {
  const [filters, setFilters] = useState({
    continent: '',
    duration: '',
    budget: '',
    travelers: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading,setLoading] = useState(false);
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

  const filteredPackages = useMemo(() => {
    return tourPackages?.filter(pkg => {
      const matchesSearch = searchQuery === '' || 
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesSearch &&
        (filters.continent === '' || pkg.continent === filters.continent) &&
        (!filters.duration || pkg.duration === filters.duration) &&
        (!filters.budget || pkg.price <= parseInt(filters.budget))
      );
    });
  }, [filters, tourPackages, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Explore Our Tour Packages
        </h1>

        {/* Search and Filters */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-6 mb-8">
  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input 
        type="text" 
        placeholder="Search destinations, tour names..." 
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div className="w-full">
      <select 
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        value={filters.continent}
        onChange={(e) => setFilters({...filters, continent: e.target.value})}
      >
        <option value="" className="text-gray-500">All Continents</option>
        <option value="Asia" className="text-gray-800">Asia</option>
        <option value="Europe" className="text-gray-800">Europe</option>
        <option value="Africa" className="text-gray-800">Africa</option>
      </select>
    </div>

    <div className="w-full">
      <select 
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        value={filters.duration}
        onChange={(e) => setFilters({...filters, duration: e.target.value})}
      >
        <option value="" className="text-gray-500">All Durations</option>
        <option value="7 Days" className="text-gray-800">7 Days</option>
        <option value="14 Days" className="text-gray-800">14 Days</option>
      </select>
    </div>
  </div>
</div>

        {/* Package Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {filteredPackages?.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="relative">
                <img 
                  src={`/assets/${pkg.photos[0]}.jpg`}
                  alt={pkg.name} 
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-blue-800">
                  {pkg.name}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {pkg.overview}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 text-blue-500"/> {pkg.destination}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="mr-2 text-blue-500"/> {pkg.duration}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-blue-700">
                    ${pkg.price}
                  </div>
                  <Link to={`${pkg._id}`} className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourPackages;