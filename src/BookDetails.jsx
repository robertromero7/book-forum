import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import './BookDetails.css';
import BookReviews from "./bookReviews.jsx";

const BookDetails = () => {
  const { id } = useParams(); // Get book ID from the URL
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Extract coverId from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const coverId = queryParams.get("coverId");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
        setBook(response.data);
      } catch (err) {
        console.error("Error fetching book details:", err.response?.data || err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>Failed to load book details. Please try again later.</p>;
  if (!book) return <p>No details available for this book.</p>;

  // Ensure book properties are safely accessed
  const description =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "No description available.";
  const subjects = book.subjects?.join(", ") || "N/A";
  const authors =
    book.authors?.map((author) => author.name || "Unknown Author").join(", ") || "N/A";

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center", paddingRight: "5%" }}>{book.title}</h1>
      {coverId && (
        <img
          src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
          alt={book.title}
        />
      )}
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Subjects:</strong> {subjects}
      </p>
      <p>
        <strong>Authors:</strong> {authors}
      </p>
      <br />
      <div className="BookReviews">
        <h1>BOOK REVIEWS</h1>
        {/* Pass the Open Library `id` as the _bookId to the reviews component */}
        <BookReviews bookId={id} />
      </div>
    </div>
  );
};

export default BookDetails;
