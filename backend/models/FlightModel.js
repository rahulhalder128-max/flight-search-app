// =============================================================================
// Flight Model
// =============================================================================
// Mongoose model for flight data storage
// =============================================================================

const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightId: {
    type: String,
    required: [true, 'Flight ID is required'],
    unique: true
  },
  airline: {
    type: String,
    required: true
  },
  flightNo: {
    type: String
  },
  origin: {
    city: {
      type: String,
      required: true
    },
    airport: {
      type: String,
      required: true
    },
    iata: {
      type: String
    }
  },
  destination: {
    city: {
      type: String,
      required: true
    },
    airport: {
      type: String,
      required: true
    },
    iata: {
      type: String
    }
  },
  departure: {
    at: {
      type: String, // ISO date string
      required: true
    },
    airport: {
      type: String,
      required: true
    },
    iata: {
      type: String
    }
  },
  arrival: {
    at: {
      type: String,
      required: true
    },
    airport: {
      type: String,
      required: true
    },
    iata: {
      type: String
    }
  },
  price: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  duration: {
    departure: {
      type: String
    },
    arrival: {
      type: String
    }
  },
  stops: {
    type: Number,
    default: 0
  },
  baggage: {
    type: String
  },
  deepLink: {
    type: String
  },
  searchedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for common search queries
FlightSchema.index({ originAirport: 1, destinationAirport: 1, departureDate: 1 });
FlightSchema.index({ 'price.amount': 1, 'stops': 1 });

module.exports = mongoose.model('Flight', FlightSchema);