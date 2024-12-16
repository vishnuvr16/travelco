import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Challenging', 'Extreme'],
    default: 'Moderate'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  photos: [{
    type: String,
  }],

  overview: {
    type: String,
    required: true,
    trim: true
  },
  highlights: [{
    type: String,
    trim: true
  }],
  itinerary: [{
    day: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    activities: [{
      type: String,
      trim: true
    }]
  }],
  includedServices: [{
    icon: {
      type: String,
      trim: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    }
  }],
  availableDates: [{
    type: Date,
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'Available dates must be in the future'
    }
  }],
  totalBookings: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexing for performance
TourSchema.index({ destination: 1, price: 1 });
TourSchema.index({ rating: -1 });

// Virtual for formatted price
TourSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`;
});

// Middleware to update timestamp
TourSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Tour = mongoose.model('Tour', TourSchema);

export default Tour;