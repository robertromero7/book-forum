const { MongoClient } = require('mongodb');

// MongoDB client setup (use environment variable for production)
const client = new MongoClient(process.env.MONGO_URI);

let database;

// Initialize database connection once
const connectToDatabase = async () => {
  if (!database) {
    await client.connect();
    database = client.db('books'); // Replace 'books' with your database name
  }
};

// Function to get reviews for a specific bookId (_bookId)
const getReviews = async (req, res) => {
    const { id } = req.params; // Get the bookId from the URL
  
    try {
      // Ensure database is connected
      await connectToDatabase();
      const reviewsCollection = database.collection('reviews'); // Replace with your collection name
  
      // Find reviews where _bookId matches the passed bookId
      const reviews = await reviewsCollection.find({ _bookId: id }).toArray();
  
      if (reviews.length === 0) {
        // No reviews found, send a proper response
        return res.status(200).json({ message: 'No reviews found for this book.' });
      }
  
      // Return the reviews if found
      return res.status(200).json(reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: 'An error occurred while fetching reviews.' });
    }
  };
  

// Function to add a new review
const addReview = async (req, res) => {
    const { id } = req.params; // Book ID from the URL
    const { content } = req.body; // Review content from the request body
  
    if (!content) {
      return res.status(400).json({ message: 'Review content is required.' });
    }
  
    try {
      await connectToDatabase(); // Ensure the database connection is established
      const reviewsCollection = database.collection('reviews');
  
      // Create a new review object
      const newReview = {
        _bookId: id, // Associate the review with the book ID
        _review: content,
        createdAt: new Date(),
      };
  
      // Insert the review into the database
      const result = await reviewsCollection.insertOne(newReview);
  
      // Respond with success and the newly added review
      res.status(201).json({ message: 'Review added successfully.', review: result.ops[0] });
    } catch (err) {
      console.error('Error adding review:', err);
      res.status(500).json({ error: 'An error occurred while adding the review.' });
    }
  };
  