import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import './BookDetails.css'

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
        console.error("Error fetching book details:", err);
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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial"}}>
      <h1 style={{textAlign: "center", paddingRight: "5%"}}>{book.title}</h1>
      {coverId && (
        <img
          src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
          alt={book.title}
         
        />
      )}
      <p><strong>Description:</strong> {book.description?.value || "No description available."}</p>
      <p><strong>Subjects:</strong> {book.subjects?.join(", ") || "N/A"}</p>
      <p><strong>Authors:</strong> {book.authors?.map((author) => author.name).join(", ")}</p>
      <br></br>
      <div className="BookReviews"> 
        <h1>BOOK REVIEWS</h1>
      </div>
    </div>
    
  );
};

export default BookDetails;
