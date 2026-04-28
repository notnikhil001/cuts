const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  duration: { type: Number, required: true, min: 1 },
  category: {
    type: String,
    required: true,
    enum: ['Hair', 'Beard', 'Facial'],
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
