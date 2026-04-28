const express = require('express');
const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const Stylist = require('../models/Stylist');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();
  res.status(201).json(appointment);
});

router.get('/', authMiddleware, async (req, res) => {
  const appointments = await Appointment.find()
    .populate('service_id')
    .populate('stylist_id')
    .sort({ appointment_date: 1, appointment_time: 1 });
  res.json(appointments);
});

router.get('/today', authMiddleware, async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const appointments = await Appointment.find({
    appointment_date: { $gte: start, $lte: end },
  })
    .populate('service_id')
    .populate('stylist_id')
    .sort({ appointment_time: 1 });

  res.json(appointments);
});

router.put('/:id/status', authMiddleware, async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!appointment) return res.status(404).json({ error: 'Appointment not found.' });
  res.json(appointment);
});

module.exports = router;
