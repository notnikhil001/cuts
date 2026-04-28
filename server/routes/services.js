const express = require('express');
const Service = require('../models/Service');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const services = await Service.find().sort({ category: 1, name: 1 });
  res.json(services);
});

router.post('/', authMiddleware, async (req, res) => {
  const { name, price, duration, category } = req.body;
  const service = new Service({ name, price, duration, category });
  await service.save();
  res.status(201).json(service);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const service = await Service.findByIdAndUpdate(id, req.body, { new: true });
  if (!service) return res.status(404).json({ error: 'Service not found.' });
  res.json(service);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const service = await Service.findByIdAndDelete(id);
  if (!service) return res.status(404).json({ error: 'Service not found.' });
  res.json({ message: 'Service deleted.' });
});

module.exports = router;
