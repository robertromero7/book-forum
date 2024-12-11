const express = require('express');
const { getReviews } = require('../controllers/reviewController'); // Import the review controller
const router = express.Router();

// Route to fetch reviews for a book by _bookId
router.get('/books/:id/reviews', getReviews);  // `id` here refers to the Open Library book ID passed in URL

module.exports = router;
