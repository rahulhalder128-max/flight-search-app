// =============================================================================
// Flight Controller
// =============================================================================
// Controllers for flight search functionality
// Integrates with Skypicker Aviation API
// =============================================================================

const axios = require('axios');
const Flight = require('../models/FlightModel');

// =============================================================================
// @desc    Search for flights
// @route   GET /api/v1/flights/search
// @access  Public
// =============================================================================
exports.searchFlights = async (req, res) => {
  try {
    const { 
      origin, 
      destination, 
      departureDate, 
      returnDate,
      passengers = 1,
      cabinClass = 'economy',
      maxPrice,
      flexibleDates 
    } = req.query;

    // Validate required parameters
    if (!origin || !destination || !departureDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing required parameters: origin, destination, departureDate'
      });
    }

    // Skypicker Aviation API endpoint
    const apiKey = process.env.SKYPICKER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        status: 'error',
        message: 'Skypicker API key not configured'
      });
    }

    // Build Skypicker API URL
    const baseUrl = 'https://api.skypicker.com/flights';
    
    let url = `${baseUrl}?`;
    url += `flyFrom=${origin}`;
    url += `&to=${destination}`;
    url += `&date=${departureDate}`;
    url += `& passengers=${passengers}`;
    url += `& cabinClass=${cabinClass}`;
    url += `&limit=20`; // Max results per page
    url += `&sort=price`;
    
    if (returnDate) {
      url += `&returnDate=${returnDate}`;
    }

    if (flexibleDates) {
      url += `&dateFrom=${flexibleDates.from}&dateTo=${flexibleDates.to}`;
    }

    // Make API request
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Process and format results
    const flights = response.data.data?.map(flight => ({
      id: flight.flight_id,
      airline: flight.airline,
      flightNo: flight.flight_no,
      origin: {
        city: flight.cityFrom,
        airport: flight.flyFrom,
        name: flight.airportFrom
      },
      destination: {
        city: flight.cityTo,
        airport: flight.flyTo,
        name: flight.airportTo
      },
      departure: {
        time: flight.departure.arrival.at.split('T')[0], // Simplified
        airport: flight.departure.airport,
        iata: flight.departure.iata
      },
      arrival: {
        time: flight.arrival.at.split('T')[0],
        airport: flight.arrival.airport,
        iata: flight.arrival.iata
      },
      price: {
        amount: flight.price,
        currency: flight.currency
      },
      duration: {
        departure: flight.duration.departure,
        arrival: flight.duration.arrival
      },
      stops: flight.stops,
      link: flight.deep_link
    })) || [];

    res.status(200).json({
      status: 'success',
      results: flights.length,
      data: flights
    });

  } catch (error) {
    console.error('Flight search error:', error.message);
    
    if (error.response) {
      // API returned an error
      res.status(error.response.status).json({
        status: 'error',
        message: error.response.data?.message || 'API Error'
      });
    } else {
      // Network or other error
      res.status(500).json({
        status: 'error',
        message: 'Failed to search flights. Please try again.'
      });
    }
  }
};

// =============================================================================
// @desc    Get fare calendar
// @route   GET /api/v1/flights/fare-calendar
// @access  Public
// =============================================================================
exports.getFareCalendar = async (req, res) => {
  try {
    const { origin, destination, months = 3 } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing required parameters: origin, destination'
      });
    }

    const apiKey = process.env.SKYPICKER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        status: 'error',
        message: 'Skypicker API key not configured'
      });
    }

    const baseUrl = 'https://api.skypicker.com/flights';
    const url = `${baseUrl}?flyFrom=${origin}&to=${destination}&calendarType=prices&months=${months}&limit=10`;

    const response = await axios.get(url, {
      headers: { 'Accept': 'application/json' }
    });

    // Organize calendar data by month
    const calendar = response.data.data?.reduce((acc, flight) => {
      const date = new Date(flight.departure);
      const monthKey = date.toLocaleString('default', { month: 'long' });
      if (!acc[monthKey]) acc[monthKey] = [];
      acc[monthKey].push({
        date: flight.departure,
        price: flight.price,
        airline: flight.airline,
        destination: flight.cityTo
      });
      return acc;
    }, {});

    res.status(200).json({
      status: 'success',
      data: calendar
    });

  } catch (error) {
    console.error('Fare calendar error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch fare calendar'
    });
  }
};

// =============================================================================
// @desc    Get flight details
// @route   GET /api/v1/flights/:flightId
// @access  Public
// =============================================================================
exports.getFlightDetails = async (req, res) => {
  try {
    const { flightId } = req.params;

    const apiKey = process.env.SKYPICKER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        status: 'error',
        message: 'Skypicker API key not configured'
      });
    }

    const url = `https://api.skypicker.com/flight_id=${flightId}`;

    const response = await axios.get(url, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.data.data || response.data.data.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Flight not found'
      });
    }

    const flight = response.data.data[0];

    res.status(200).json({
      status: 'success',
      data: {
        id: flight.flight_id,
        airline: flight.airline,
        flight_no: flight.flight_no,
        aircraft: flight.aircraft,
        duration: flight.duration,
        departure: flight.departure,
        arrival: flight.arrival,
        price: flight.price,
        stops: flight.stops,
        baggage: flight.baggage,
        link: flight.deep_link
      }
    });

  } catch (error) {
    console.error('Flight details error:', error.message);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch flight details'
    });
  }
};

module.exports = { searchFlights, getFareCalendar, getFlightDetails };