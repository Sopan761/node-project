const express = require('express');
const router = express.Router();
const ContactRequest = require('../models/ContactRequest');

// POST - Save contact enquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, contactNumber, productsInterested, message } = req.body;

    const newRequest = new ContactRequest({
      name,
      email,
      contactNumber,
      productsInterested,
      message
    });

    await newRequest.save();
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (err) {
    console.error('Error saving contact request:', err);
    res.status(500).json({ error: 'Failed to submit enquiry' });
  }
});

// GET - Get all contact enquiries (admin)
router.get('/', async (req, res) => {
  try {
    const enquiries = await ContactRequest.find().sort({ submittedAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contact requests' });
  }
});

// DELETE - Remove an enquiry by ID (admin)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ContactRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Request not found' });
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete enquiry' });
  }
});

module.exports = router;
