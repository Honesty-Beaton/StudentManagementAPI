const express = require('express');
const { verifyUser, verifyToken } = require('../../middleware/authMiddleware.js');
const { GetAllBookings, GetBookingById, BookTicket } = require('../../controller/bookingController');

const router = express.Router();

router.post('/', verifyUser, BookTicket); // Only users can book tickets
router.get('/', verifyToken, GetAllBookings); // Users can only fetch their own bookings
router.get('/:id', verifyToken, GetBookingById);

module.exports = router;
