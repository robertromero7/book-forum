const Review = require('../../models/Review'); // Ensure this path is correct

// Controller to get reviews
const getReviews = async (req, res) => {
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
};

// Controller to post a review
const postReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { content } = req.body;

    const newReview = new Review({
      _bookId: bookId,
      _review: content,
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully.', review: newReview });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Error adding review.' });
  }
};

module.exports = { getReviews, postReview };
