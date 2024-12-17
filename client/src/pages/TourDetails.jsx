import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Plane,
  Hotel,
  Car,
  Mountain
} from 'lucide-react';
import summaryApi from '../common';
import { useParams } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { useSelector } from 'react-redux';

const TourDetails = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTravelers, setSelectedTravelers] = useState(1);
  const photoContainerRef = useRef(null);
  const {id} = useParams()
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
//   const {user,isAuthenticated} = useSelector(state => state.auth);


  const [tourPackage,setTourpackage] = useState();

  useEffect(()=>{
    const getPackage = async () =>{
      try {
        const response = await fetch(`${summaryApi.defaultUrl}/tours/${id}`,{
          method: "get",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(!response.ok){
          throw new Error(`Failed to fetch tour details: ${response.statusText}`)
        }

        const tour = await response.json();
        console.log(tour)
        setTourpackage(tour);
      } catch (error) {
        console.log(error)
      }
    }
    getPackage();
  },[id])

  const handlePhotoNavigation = (direction) => {
    const container = photoContainerRef.current;
    const photoWidth = container.children[0].offsetWidth;
    
    if (direction === 'next') {
      setCurrentPhotoIndex((prev) => 
        prev < tourPackage.photos.length - 1 ? prev + 1 : 0
      );
    } else {
      setCurrentPhotoIndex((prev) => 
        prev > 0 ? prev - 1 : tourPackage.photos.length - 1
      );
    }
  };

  const handleBookNow = () => {
    if (selectedDate) {
      setIsBookingModalOpen(true);
    } else {
      alert('Please select a departure date first.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-14">
      {/* Tour Header */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Photo Gallery */}
        <div className="relative">
          <motion.div 
            ref={photoContainerRef}
            className="overflow-hidden rounded-lg shadow-lg"
          >
            <motion.img 
              key={currentPhotoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={`/assets/${tourPackage?.photos[currentPhotoIndex]}.jpg`}
              alt={`Tour Photo ${currentPhotoIndex + 1}`}
              className="w-full h-96 object-cover"
            />
          </motion.div>

          {/* Photo Navigation */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button 
              onClick={() => handlePhotoNavigation('prev')}
              className="bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
            >
              <ArrowLeft />
            </button>
            <button 
              onClick={() => handlePhotoNavigation('next')}
              className="bg-white/50 rounded-full p-2 hover:bg-white/75 transition"
            >
              <ArrowRight />
            </button>
          </div>

          {/* Photo Thumbnails */}
          <div className="flex space-x-2 mt-4 justify-center">
            {tourPackage?.photos?.map((photo, index) => (
              <button 
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden ${
                  index === currentPhotoIndex 
                    ? 'border-2 border-blue-500' 
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                <img 
                  src={`/assets/${photo}.jpg`}
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Tour Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{tourPackage?.name}</h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-blue-600" />
              <span>{tourPackage?.destination}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-600" />
              <span>{tourPackage?.duration}</span>
            </div>
          </div>

          {/* <div className="flex items-center space-x-2 mb-4">
            <Star className="text-yellow-500" />
            <span>{tourPackage?.rating} ({tourPackage?.totalReviews} reviews)</span>
          </div> */}

          <p className="text-gray-600 mb-4">{tourPackage?.overview}</p>

          {/* Highlights */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Tour Highlights</h3>
            <ul className="space-y-2">
              {tourPackage?.highlights?.map((highlight, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Check className="text-green-500" size={20} />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking Section */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-blue-600">
                ${tourPackage?.price}
                <span className="text-sm text-gray-500"> / person</span>
              </span>
              <div className="flex items-center space-x-2">
                <Users />
                <select 
                  value={selectedTravelers}
                  onChange={(e) => setSelectedTravelers(Number(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num} Traveler{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Select Date</label>
              <select 
                value={selectedDate || ''}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Choose a departure date</option>
                {tourPackage?.availableDates?.map(date => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleBookNow}
              disabled={!selectedDate}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                selectedDate 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Included Services */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">What's Included</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {tourPackage?.includedServices?.map((service, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md"
            >
              <div className="text-blue-600">{service.icon}</div>
              <span>{service.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Itinerary */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Detailed Itinerary</h2>
        <div className="space-y-4">
          {tourPackage?.itinerary?.map((day) => (
            <div 
              key={day.day} 
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center space-x-4 mb-2">
                <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded">
                  Day {day.day}
                </div>
                <h3 className="font-semibold">{day.title}</h3>
              </div>
              <p className="text-gray-600 mb-2">{day.description}</p>
              <div>
                <h4 className="font-medium mb-1">Activities:</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {day.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tourPackage={tourPackage}
        selectedDate={selectedDate}
        selectedTravelers={selectedTravelers}
      />
    </div>
  );
};

export default TourDetails;