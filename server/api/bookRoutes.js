const express = require('express');
const { getReviews, addReview } = require('../controllers/reviewController');

const router = express.Router();

router.get('/:id/reviews', getReviews);
router.post('/:id/reviews', addReview);

module.exports = router;
