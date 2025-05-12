const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const bookingSchema = new Schema({
      user : [{type: Schema.Types.ObjectId, ref: "User"}],
      event: [{type: Schema.Types.ObjectId, ref: "Event"}],
      quantity: {type: Number, required: true},
      bookingDate: {type: Date, default: Date.now},
      qrCode: {type: String, require: false}
});
 
module.exports = mongoose.model('Booking', bookingSchema);