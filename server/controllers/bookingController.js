import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';

export const createBooking = async (req, res) => {
  const { 
    tourId, 
    date, 
    primaryCustomer, 
    additionalTravelers, 
    totalTravelers, 
    totalPrice 
  } = req.body;

  // Validate tour existence
  const tour = await Tour.findById(tourId);
  if (!tour) {
    throw new Error('Tour not found')
    }

  // Check tour availability
  const existingBookings = await Booking.countDocuments({
    tour: tourId,
    tourDate: new Date(date),
    status: { $ne: 'cancelled' }
  });

  // Assuming tour has a maximum capacity
  if (existingBookings + totalTravelers > tour.maxGroupSize) {
    throw new Error('Tour is fully booked for selected date')
  }

  // Create booking
  const newBooking = await Booking.create({
    tour: tourId,
    primaryCustomer,
    additionalTravelers,
    tourDate: new Date(date),
    price: totalPrice,
    totalParticipants: totalTravelers,
    status: 'pending'
  });

  res.status(201).json({
    status: 'success',
    data: {
      booking: newBooking
    }
  });
};

export const getBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    throw new Error('No booking found with that ID')
  }

  res.status(200).json({
    status: 'success',
    data: {
      booking
    }
  });
};

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .sort({ createdAt: -1 })
    .limit(req.query.limit || 50);

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    bookings
  });
};
