import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Books from './Books.jsx'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookDetails from './bookDetails.jsx';

function App() {

  // fetch('http://localhost:3000/api/data')
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error('Error:Yeahhh not found', error));

  return (
    <>
    
    <div className = "main">
      <header>
        
          <a href="/" id = "header">BOOK LIBRARY</a>
          <form id = "search">
              <input type = "search"></input>
              <button id = "searchButton"> Search </button>
          </form>
      </header>
          <section id = "sidenav">
            <h1>Search By:</h1>
            <a href="/">Highest Rated</a>
            <br></br>
            <a href="/">Popularity</a>
            <br></br>
            <a href="/">Page Count</a>
            <br></br>
            <a href="/">Cost</a>
            <br></br>
           
          </section>

          
        <section id = "books">
          
          </section>
      </div>
      <Router>
      <Routes>
        <Route path="/" element={<Books />} /> {/* Updated to Books */}
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="*" element={<p>404: Page not found</p>} />
      </Routes>
    </Router>
      </>
  )
}

export default App
