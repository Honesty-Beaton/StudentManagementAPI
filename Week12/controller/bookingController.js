const Booking = require('../model/bookings');
const Event = require('../model/event');

// Get all Bookings
const GetAllBookings = async (req, res) => {
  try {
    const userID = req.user.id;

    const bookings = await Booking.find({user: userID}).populate('event');

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No Bookings found!" });
    }

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetBookingById = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user's ID
    const bookingId = req.params.id; // Get booking ID from request params

    const booking = await Booking.findOne({ _id: bookingId, user: userId }).populate('event');

    if (!booking) {
      return res.status(404).json({ message: "No booking found or unauthorized access!" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const BookTicket = async (req, res) => {
    try {
        const { eventId, quantity } = req.body;

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found!" });

        // Debugging before checking availability
        console.log("Event Capacity:", event.seatCapacity);
        console.log("Event Booked Seats:", event.bookedSeats);
        console.log("Requested Quantity:", quantity);

        if (event.bookedSeats + quantity > event.seatCapacity) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        const newBooking = new Booking({
            user: req.user.id, // Ensure user's ID is attached
            event: eventId,
            quantity
        });

        await newBooking.save();

        // Update bookedSeats in event
        event.bookedSeats += quantity;
        await event.save();

        res.status(201).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
        console.error("Server error:", error); // Log full error message
        res.status(500).json({ message: "Server error", error });
    }
};




module.exports = {GetAllBookings, GetBookingById, BookTicket };
