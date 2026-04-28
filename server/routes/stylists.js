const express = require('express');
const Stylist = require('../models/Stylist');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const stylists = await Stylist.find().sort({ name: 1 });
  res.json(stylists);
});

router.post('/', authMiddleware, async (req, res) => {
  const { name, specialization, photo_url, availability_status } = req.body;
  const stylist = new Stylist({ name, specialization, photo_url, availability_status });
  await stylist.save();
  res.status(201).json(stylist);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const stylist = await Stylist.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!stylist) return res.status(404).json({ error: 'Stylist not found.' });
  res.json(stylist);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const stylist = await Stylist.findByIdAndDelete(req.params.id);
  if (!stylist) return res.status(404).json({ error: 'Stylist not found.' });
  res.json({ message: 'Stylist removed.' });
});

module.exports = router;
