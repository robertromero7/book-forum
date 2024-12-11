import { useState, useEffect } from 'react';
import axios from 'axios';

const BookReviews = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Make API request to your backend to get reviews based on bookId
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        setError('Error fetching reviews.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookId]); // Re-fetch reviews if bookId changes

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id}>
            <p>
              "{review._review}" - <strong>Anonymous</strong>
            </p>
          </div>
        ))
      ) : (
        <p>No reviews available for this book.</p>
      )}
    </div>
  );
};

export default BookReviews;
