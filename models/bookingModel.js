const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  telephone: String,
  country: String,
  members: Number,
  address: String,
  countryCode: String,
  confirmed: { type: Boolean, default: false }, // Confirmation status
  date: { type: Date, default: Date.now }, // Sorting by date
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
