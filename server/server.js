// // Import necessary dependencies
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');


// // Import routes
// const bookRoutes = require('./api/bookRoutes'); // Adjust this path if needed

// // Initialize express app
// const app = express();

// // Load environment variables
// dotenv.config();

// // Middleware
// app.use(cors());  // Enables CORS for all routes (you can customize this)
// app.use(express.json());  // Parses incoming JSON requests

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Failed to connect to MongoDB:', err));

// // Use routes
// app.use('/api', bookRoutes); // Register the bookRoutes (make sure this is the correct path)

// // Root route (Optional)
// app.get('/', (req, res) => {
//   res.send('Welcome to the Book Reviews API!');
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });