const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

// Fetch reviews
router.get('/:bookId/reviews', async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ _bookId: bookId });
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this book.' });
    }
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews.' });
  }
});

// Post a new review
router.post('/:bookId/reviews', async (req, res) => {
  try {
    const { bookId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Review content is required.' });
    }

    const newReview = new Review({
      _bookId: bookId,
      _review: content,
    });

    const savedReview = await newReview.save();
    res.status(201).json({ review: savedReview });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Error submitting review.' });
  }
});

module.exports = router;
