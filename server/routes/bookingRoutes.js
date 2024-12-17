import express from 'express';
import {createBooking,getAllBookings , getBooking} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/',createBooking)

router.get('/',getAllBookings)

router.get('/:id',getBooking);

export default router;