import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${query}`
      );
      setBooks(response.data.docs.slice(0, 10)); // Limit to 10 books
    } catch (error) {
      console.error("Error fetching data from Open Library API:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://openlibrary.org/search.json?q=the"
      );
      const defaultBooks = response.data.docs.slice(0, 12); // Pick the first 12 books
      setBooks(defaultBooks);
    } catch (error) {
      console.error("Error fetching books from Open Library API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <button onClick={searchBooks} style={{ padding: "10px 20px" ,float:"right",borderRadius:"10px",borderColor:"black"}}>
          Search
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter book title"
          style={{ padding: "10px", width: "300px", marginRight: "10px",float:"right",borderRadius:"10px",color:"white"}}
        />
        <br></br>
      </div>

      {loading && <p>Loading...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "20px",
          padding: "10px",
        }}
      >
        {books.map((book) => (
          <div
            key={book.key}
            style={{
              border: "1px 2px 5px rgb(0, 0, 0)",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 5px rgb(255, 255, 255)",
            }}
          >
            <Link to={`/book/${book.key.split("/").pop()}?coverId=${book.cover_i}`}>
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                style={{ width: "100px", height: "150px", objectFit: "cover", marginBottom: "10px" }}
              />
            </Link>
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{book.title}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>
              {book.author_name?.join(", ") || "Unknown"}
            </p>
            <p style={{ fontSize: "12px", color: "#999" }}>
              First published: {book.first_publish_year || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
