import express from 'express';
import {createBooking,getAllBookings , getBooking, updateBookingStatus , deleteBooking} from '../controllers/bookingController.js';
// import { protect, restrictTo } from '../controllers/authController';

const router = express.Router();

// router.use(protect);
router.post('/',createBooking)

router.get('/',getAllBookings)

router.get('/:id',getBooking);

// router
//   .route('/')
//   .post(bookingController.createBooking)
//   .get( bookingController.getAllBookings);
// //   .get(restrictTo('admin', 'lead-guide'), bookingController.getAllBookings);


// router
//   .route('/:id')
//   .get(bookingController.getBooking)
//   .patch( bookingController.updateBookingStatus)
//   .delete(bookingController.deleteBooking);

export default router;