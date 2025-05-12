const express = require('express');
const { verifyAdmin } = require('../../middleware/authMiddleware');
const { RegisterNewEvent, DeleteEvent, GetAllEvents, GetEvent, UpdateEvent } = require('../../controller/eventController');

const router = express.Router();

router.get('/', GetAllEvents); // get all events
router.get('/:id', GetEvent); // Get a single event by ID
router.post('/', verifyAdmin, RegisterNewEvent); // Only admins can create events
router.put('/:id', verifyAdmin, UpdateEvent); // Admin-only update
router.delete('/:id', verifyAdmin, DeleteEvent); // Admin-only delete
module.exports = router;
