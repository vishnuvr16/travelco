import React, { useState } from 'react';
import { X, Printer } from 'lucide-react';

const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const calculateTotalTravelers = () => {
    return booking.additionalTravelers.length + 1; // +1 for primary customer
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-900">Booking Details</h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrint}
              className="text-blue-600 hover:bg-blue-100 p-2 rounded"
            >
              <Printer size={20} />
            </button>
            <button 
              onClick={onClose}
              className="text-red-600 hover:bg-red-100 p-2 rounded"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Booking Details Content */}
        <div className="p-6">
          {/* Booking Summary */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500">Booking ID</p>
              <h3 className="text-xl font-semibold">#{booking.id}</h3>
            </div>
            <div>
              <p className="text-gray-500">Booking Date</p>
              <h3 className="text-xl font-semibold">{formatDate(booking.createdAt)}</h3>
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-bold mb-4 text-blue-900">Customer Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-semibold">{booking.primaryCustomer.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-semibold">{booking.primaryCustomer.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-semibold">{booking.primaryCustomer.email}</p>
              </div>
            </div>
          </div>

          {/* Tour Package Details */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-bold mb-4 text-blue-900">Tour Package Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Package Name</p>
                <p className="font-semibold">{booking.tour.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Destination</p>
                <p className="font-semibold">{booking.tour.destination}</p>
              </div>
              <div>
                <p className="text-gray-500">Tour Date</p>
                <p className="font-semibold">{formatDate(booking.tourDate)}</p>
              </div>
              <div>
                <p className="text-gray-500">Duration</p>
                <p className="font-semibold">{booking.tour.duration}</p>
              </div>
            </div>
          </div>

          {/* Travelers Details */}
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-4 text-blue-900">Travelers</h4>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">{booking.primaryCustomer.name}</td>
                  <td className="p-3">Primary Traveler</td>
                </tr>
                {booking.additionalTravelers.map((traveler, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{traveler.name}</td>
                    <td className="p-3">Additional Traveler</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing Details */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-lg font-bold mb-4 text-blue-900">Pricing Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Total Travelers</p>
                <p className="font-semibold">{calculateTotalTravelers()}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Price</p>
                <p className="font-semibold text-green-700">₹{booking.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;