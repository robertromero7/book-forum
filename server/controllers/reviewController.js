const { MongoClient } = require('mongodb');

// MongoDB client setup (use environment variable for production)
const client = new MongoClient(process.env.MONGO_URI);

let database;

// Initialize database connection once
const connectToDatabase = async () => {
  if (!database) {
    await client.connect();
    database = client.db('books'); // Replace 'bookdb' with your database name
  }
};

// Function to get reviews for a specific bookId (_bookId)
const getReviews = async (req, res) => {
  const { id } = req.params; // Get the bookId (Open Library ID) passed in the URL

  try {
    // Ensure database is connected
    await connectToDatabase();
    const reviewsCollection = database.collection('reviews'); // Replace 'reviews' with your collection name

    // Find reviews where _bookId matches the passed bookId
    const reviews = await reviewsCollection.find({ _bookId: id }).toArray();

    // Respond with reviews
    if (reviews.length === 0) {
      console.log(`No reviews found for bookId: ${id}`); // Log when no reviews are found
      return res.status(404).json({ message: 'No reviews found for this book.' });
    }

    console.log(`Reviews found for bookId: ${id}`, reviews); // Log found reviews
    return res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return res.status(500).json({ error: 'Error fetching reviews.' });
  }
};

module.exports = { getReviews };
