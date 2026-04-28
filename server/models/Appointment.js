const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  customer_name: { type: String, required: true, trim: true },
  customer_phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: 'Phone number must be a 10-digit number.',
    },
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  stylist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stylist',
    required: true,
  },
  appointment_date: { type: Date, required: true },
  appointment_time: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
