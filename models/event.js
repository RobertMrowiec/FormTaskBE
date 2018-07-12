const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Events = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Events', Events);
