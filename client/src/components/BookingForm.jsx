import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { BookingService } from '../services/BookingService';

const BookingForm = ({ package: pkg, onClose }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const bookingData = {
        ...data,
        package: pkg._id,
        totalPrice: pkg.price * data.numberOfTravelers
      };

      const response = await BookingService.createBooking(bookingData);
      
      // Redirect to invoice or show success modal
      // You would implement this based on your specific requirements
      console.log('Booking successful', response);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Book {pkg.title}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input 
              {...register('customerName', { 
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.customerName.message}
              </p>
            )}
          </div>

          {/* Similar detailed inputs for email, phone, travelers, etc. */}
          
          <div className="flex justify-between space-x-4">
            <motion.button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default BookingForm;