import mongoose from "mongoose";

const ParticipantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Participant name is required']
  },
  age: {
    type: Number,
    required: [true, 'Participant age is required'],
    min: [1, 'Age must be at least 1'],
    max: [100, 'Age cannot exceed 100']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required']
  }
});

const BookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a tour']
  },
  primaryCustomer: {
    name: {
      type: String,
      required: [true, 'Primary customer name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    aadharNumber: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
  },
  additionalTravelers: [ParticipantSchema],
  price: {
    type: Number,
    required: [true, 'Booking must have a price']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tourDate: {
    type: Date,
    required: [true, 'Booking must have a tour date']
  },
  totalParticipants: {
    type: Number,
    required: [true, 'Total participants must be specified']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  bookingId: {
    type: String,
    unique: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate unique booking ID
BookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    // Generate a unique booking ID (e.g., TOUR-YYYYMMDD-RANDOMNUMBER)
    const today = new Date();
    const dateString = today.toISOString().slice(0,10).replace(/-/g,'');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.bookingId = `TOUR-${dateString}-${randomNum}`;
  }
  next();
});

// Middleware for populating references
BookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tour',
    select: 'name duration price'
  });
  next();
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;