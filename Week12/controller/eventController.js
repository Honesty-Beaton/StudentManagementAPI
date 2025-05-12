const Event = require("../model/event");
const Booking = require("../model/bookings");

// Get all events
const GetAllEvents = async (req, res) => {
    try {
        const { category, date } = req.query;

        let filter = {};

        // Apply category filter if provided
        if (category) {
            filter.category = category;
        }

        // Apply date filter if provided (ensures correct date format)
        if (date) {
            filter.date = new Date(date);
        }

        // Fetch events with filters
        const events = await Event.find(filter);

        res.status(200).json({ message: "Filtered events retrieved successfully!", events });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

// Get a single event
// Get One Student
const GetEvent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Event ID is required!" });
  }
  try {
    const event = await Event.findById(id).exec();
    if (!event) {
      return res.status(404).json({ message: `No event matches ID ${id}` });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a new event
const RegisterNewEvent = async (req, res) => {
    try {
        const { title, description, category, venue, date, time, seatCapacity, price } = req.body;

        // Validate required fields
        if (!title || !date || !venue || !seatCapacity || !price) {
            return res.status(400).json({ message: "Title, date, venue, seat capacity, and price are required." });
        }

        // Create the event object
        const newEvent = new Event({
            title,
            description,
            category,
            venue,
            date,
            time,
            seatCapacity,
            price
        });

        // Save the event to the database
        await newEvent.save();

        res.status(201).json({ success: `New event '${title}' created successfully!`, event: newEvent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Event
const UpdateEvent = async (req, res) => {
  const {title, desc, category, venue, date, time, seatCapacity, bookedSeats, price } = req.body;

  const {id} = req.params;
  if (!id) {
    return res.status(400).json({ message: "Event ID is required!" });
  }
  try {
    const event = await Event.findById(id).exec();
    if (!event) {
      return res.status(404).json({ message: `No event matches ID ${id}` });
    }
    if (title) event.title = title;
    if(desc) event.description = desc;
    if(category) event.category = category;
    if(venue) event.venue = venue;
    if(date) event.date = date;
    if(time) event.time = time;
    if(seatCapacity) event.seatCapacity = seatCapacity;
    if(bookedSeats) event.bookedSeats = bookedSeats;
    if(price) event.price = price;

    const result = await event.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Event
const DeleteEvent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Event ID is required!" });
  }
  try {
    const event = await Event.findById(id).exec();
    if (!event) {
      return res.status(404).json({ message: `No event matches ID ${id}` });
    }
    
    // Delete associated bookings before deleting the event
    await Booking.deleteMany({ event: id });

    const result = await Event.deleteOne({ _id: id });
    res.json({ message: "Event and associated bookings deleted", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
module.exports ={GetAllEvents, GetEvent, RegisterNewEvent, UpdateEvent, DeleteEvent};