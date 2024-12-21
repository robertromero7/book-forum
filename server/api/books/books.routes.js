const express = require('express');
const router = express.Router();
const { getReviews, postReview } = require('./books.controller'); // Ensure this path is correct

// GET /api/books/:bookId/reviews
router.get('/:bookId/reviews', getReviews);

// POST /api/books/:bookId/reviews
router.post('/:bookId/reviews', postReview);

module.exports = router;
