import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  return (
    <>
    
    <div class = "main">
      <header>
        
          <a href="/">BOOK LIBRARY</a>
          <form id = "search">
              <input type = "search"></input>
          </form>
      </header>
          <section id = "sidenav">
            <h1>Search By:</h1>
            <span>Highest Rated</span>
            <br></br>
            <span>Popularity</span>
            <br></br>
            <span>Page Count</span>
            <br></br>
            <span>Cost</span>
            <br></br>
           
          </section>

        <section id = "books">
          <h1>Booksss</h1>
            <img src="https://th.bing.com/th/id/OIP.zrAI1U-8xQqTUWkQ0_lY2AHaLH?w=194&h=291&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
            <img src="https://th.bing.com/th/id/OIP.zrAI1U-8xQqTUWkQ0_lY2AHaLH?w=194&h=291&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
            <img src="https://th.bing.com/th/id/OIP.zrAI1U-8xQqTUWkQ0_lY2AHaLH?w=194&h=291&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
            <img src="https://th.bing.com/th/id/OIP.zrAI1U-8xQqTUWkQ0_lY2AHaLH?w=194&h=291&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
            <img src="https://th.bing.com/th/id/OIP.zrAI1U-8xQqTUWkQ0_lY2AHaLH?w=194&h=291&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
            <img src="https://th.bing.com/th/id/OIP.zrAI1U-8xQqTUWkQ0_lY2AHaLH?w=194&h=291&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
            <img src="https://th.bing.com/th/id/OIP.zrAI1U-8xQqTUWkQ0_lY2AHaLH?w=194&h=291&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
            <img src="https://th.bing.com/th/id/OIP.zrAI1U-8xQqTUWkQ0_lY2AHaLH?w=194&h=291&c=7&r=0&o=5&dpr=1.5&pid=1.7"></img>
          </section>
      </div>
      </>
  )
}

export default App
