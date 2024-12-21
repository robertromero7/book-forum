require('dotenv').config(); // This will load environment variables from the .env file
console.log('Mongo URI:', process.env.MONGO_URI); // Add this line to verify the URI
console.log('Environment Variables:', process.env);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware
const booksRoutes = require('./api/books/books.routes'); // Your routes file

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all origins (you can restrict it if needed)

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds if server is not found
});

// Event listeners to log connection status
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Routes
app.use('/api/books', booksRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
