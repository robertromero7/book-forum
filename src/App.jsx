import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Books from './Books.jsx'

function App() {


  return (
    <>
    
    <div class = "main">
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
          <Books />
          </section>
      </div>
      </>
  )
}

export default App
