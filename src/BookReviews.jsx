import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookReviews.css'; // Import your CSS file

const BookReviews = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState(''); // State for review content
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}/reviews`);
        console.log('Fetched reviews:', response.data); // Debugging log to check data format
        setReviews(response.data); // Set reviews if found
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setReviews([]); // No reviews found
        } else {
          console.error('Error fetching reviews:', err);
          setError('Error fetching reviews.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookId]); // Re-run effect if `bookId` changes

  // Handle form submission for adding a new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewContent) return; // Don't submit if no review content

    try {
      const response = await axios.post(`http://localhost:5000/api/books/${bookId}/reviews`, {
        content: reviewContent, // Send review content
      });

      // Update reviews list with the new review
      setReviews([...reviews, response.data.review]);
      setReviewContent(''); // Clear the input field
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Error submitting review.');
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {reviews.length > 0 ? (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review._id} className="review-item">
              <p>{review._review}</p>
              <small>Posted on: {new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available for this book.</p>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          placeholder="Write your review here"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default BookReviews;
