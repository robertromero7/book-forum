const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection setup
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = 'books';
let database; // Shared database instance

// Function to connect to the database and reuse the connection
const connectToDatabase = async () => {
  if (!database) {
    await client.connect();
    database = client.db(dbName); // Set the database instance
    console.log('Connected to MongoDB');
  }
};

// Route: Health check
app.get('/', (req, res) => {
  res.send('Server is running correctly!');
});

// Route: Fetch all books
app.get('/books', async (req, res) => {
  try {
    await connectToDatabase(); // Ensure database is connected
    const books = await database.collection('books').find({}).toArray();
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send('Error fetching data');
  }
});

// Review routes (import from reviewController)
const { addReview, getReviews } = require('./reviewController'); // Adjust path if needed
app.post('/books/:id/reviews', addReview); // Add a review
app.get('/books/:id/reviews', getReviews); // Fetch reviews for a book

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
