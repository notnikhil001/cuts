const mongoose = require('mongoose');

const StylistSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  specialization: { type: String, required: true, trim: true },
  photo_url: { type: String, trim: true },
  availability_status: {
    type: String,
    required: true,
    enum: ['Available', 'Busy', 'Offline'],
    default: 'Available',
  },
});

module.exports = mongoose.model('Stylist', StylistSchema);
