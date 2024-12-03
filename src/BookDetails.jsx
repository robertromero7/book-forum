import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>{book.title}</h1>
      <p><strong>Description:</strong> {book.description?.value || "No description available."}</p>
      <p><strong>Authors:</strong> {book.authors?.map((author) => author.name).join(", ")}</p>
      <p><strong>Subjects:</strong> {book.subjects?.join(", ") || "N/A"}</p>
    </div>
  );
};

export default BookDetails;
