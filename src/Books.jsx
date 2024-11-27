import React, { useState } from "react";
import axios from "axios";
import App from './App.jsx'


const BookSearch = () => {
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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter book title"
        style={{ padding: "8px", width: "300px" }}
      />
      <button onClick={searchBooks} style={{ padding: "8px 16px", marginLeft: "10px" }}>
        Search
      </button>
      {loading && <p>...</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {books.map((book) => (
          <li key={book.key} style={{ margin: "10px 0" }}>
            <div>
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  style={{ width: "100px", marginTop: "10px" }}
                />
              </div>
            <strong>{book.title}</strong> by {book.author_name?.join(", ") || "Unknown"}
            <br />
            <small>First published: {book.first_publish_year || "N/A"}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;


// function Books() {

//     return (
//         <>
//             <h1>BooOoOoOOOks</h1>
//         </>

//   )}
  
//   export default Books
  