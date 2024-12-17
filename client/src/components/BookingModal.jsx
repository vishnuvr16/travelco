import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Phone, 
  IdCard, 
  Calendar, 
  Venus, 
  Mars, 
  CheckCircle2 
} from 'lucide-react';
import summaryApi from '../common';

const BookingModal = ({ 
  isOpen, 
  onClose, 
  tourPackage, 
  selectedDate, 
  selectedTravelers 
}) => {
  const [bookingDetails, setBookingDetails] = useState({
    primaryCustomer: {
      name: '',
      age: '',
      gender: '',
      email: '',
      phone: '',
      aadharNumber: ''
    },
    additionalTravelers: []
  });

  // Initialize additional travelers when modal opens
  useEffect(() => {
    if (isOpen) {
      const travelers = Array.from({ length: selectedTravelers - 1 }, () => ({
        name: '',
        age: '',
        gender: ''
      }));
      setBookingDetails(prev => ({
        ...prev,
        additionalTravelers: travelers
      }));
    }
  }, [isOpen, selectedTravelers]);

  const handlePrimaryCustomerChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({
      ...prev,
      primaryCustomer: {
        ...prev.primaryCustomer,
        [name]: value
      }
    }));
  };

  const handleAdditionalTravelerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTravelers = [...bookingDetails.additionalTravelers];
    updatedTravelers[index] = {
      ...updatedTravelers[index],
      [name]: value
    };
    setBookingDetails(prev => ({
      ...prev,
      additionalTravelers: updatedTravelers
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!bookingDetails.primaryCustomer.name || 
        !bookingDetails.primaryCustomer.age || 
        !bookingDetails.primaryCustomer.gender ||
        !bookingDetails.primaryCustomer.phone ||
        !bookingDetails.primaryCustomer.email) {
      alert('Please fill in all primary customer details');
      return;
    }

    // Additional travelers validation
    const isAdditionalTravelersValid = bookingDetails.additionalTravelers.every(
      traveler => traveler.name && traveler.age && traveler.gender
    );

    if (!isAdditionalTravelersValid) {
      alert('Please fill in details for all additional travelers');
      return;
    }

    try {
      const bookingPayload = {
        tourId: tourPackage._id,
        date: selectedDate,
        primaryCustomer: bookingDetails.primaryCustomer,
        additionalTravelers: bookingDetails.additionalTravelers,
        totalTravelers: selectedTravelers,
        totalPrice: tourPackage.price * selectedTravelers
      };

      const response = await fetch(`${summaryApi.defaultUrl}/bookings`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingPayload)
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const bookingConfirmation = await response.json();
      
      // Show success modal or redirect to confirmation page
      alert(`Booking Confirmed! Booking ID: ${bookingConfirmation.bookingId}`);
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to complete booking. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Your Booking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Primary Customer Section */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <User className="mr-2 text-blue-600" />
              Primary Customer Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={bookingDetails.primaryCustomer.name}
                  onChange={handlePrimaryCustomerChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={bookingDetails.primaryCustomer.email}
                  onChange={handlePrimaryCustomerChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={bookingDetails.primaryCustomer.phone}
                  onChange={handlePrimaryCustomerChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Aadhar Number</label>
                <input 
                  type="text" 
                  name="aadharNumber"
                  value={bookingDetails.primaryCustomer.aadharNumber}
                  onChange={handlePrimaryCustomerChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter Aadhar number"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Age</label>
                <input 
                  type="number" 
                  name="age"
                  value={bookingDetails.primaryCustomer.age}
                  onChange={handlePrimaryCustomerChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter age"
                  min="18"
                  max="100"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Gender</label>
                <select 
                  name="gender"
                  value={bookingDetails.primaryCustomer.gender}
                  onChange={handlePrimaryCustomerChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Travelers Section */}
          {bookingDetails.additionalTravelers.map((traveler, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-4 rounded-lg"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="mr-2 text-gray-600" />
                Traveler {index + 2} Details
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={traveler.name}
                    onChange={(e) => handleAdditionalTravelerChange(index, e)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter traveler name"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Age</label>
                  <input 
                    type="number" 
                    name="age"
                    value={traveler.age}
                    onChange={(e) => handleAdditionalTravelerChange(index, e)}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter age"
                    min="1"
                    max="100"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2">Gender</label>
                  <select 
                    name="gender"
                    value={traveler.gender}
                    onChange={(e) => handleAdditionalTravelerChange(index, e)}
                    className="w-full border rounded px-3 py-2"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {/* Booking Summary */}
          <div className="bg-green-50 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Total Booking Price</h3>
              <p className="text-2xl font-bold text-green-600">
                ${tourPackage.price * selectedTravelers}
              </p>
            </div>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <CheckCircle2 className="mr-2" />
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;