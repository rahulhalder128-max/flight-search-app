// =============================================================================
// Flight Search Routes
// =============================================================================
// API routes for flight search functionality
// =============================================================================

const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// @route   GET /api/v1/flights/search
// @desc    Search for flights
// @access  Public
router.get('/search', flightController.searchFlights);

// @route   GET /api/v1/flights/price-alerts/:alertId
// @desc    Get price alert status
// @access  Private
router.get('/price-alerts/:alertId', flightController.getAlertStatus);

// @route   POST /api/v1/flights/price-alerts
// @desc    Create price alert
// @access  Private
router.post('/price-alerts', flightController.createAlert);

// @route   GET /api/v1/flights/fare-calendar
// @desc    Get fare calendar for cheapest dates
// @access  Public
router.get('/fare-calendar', flightController.getFareCalendar);

// @route   GET /api/v1/flights/:flightId
// @desc    Get flight details by ID
// @access  Public
router.get('/:flightId', flightController.getFlightDetails);

module.exports = router;