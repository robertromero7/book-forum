const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);
let database;

const connectToDatabase = async () => {
  if (!database) {
    await client.connect();
    database = client.db('books'); // Replace with your database name
  }
};

const getReviews = async (req, res) => {
  const { id } = req.params;

  try {
    await connectToDatabase();
    const book = await database.collection('books').findOne({ _id: id });

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    return res.status(200).json(book.reviews || []);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return res.status(500).json({ error: 'An error occurred while fetching reviews.' });
  }
};

const addReview = async (req, res) => {
  const { id } = req.params; // `_bookId` passed in the URL as `id`
  const { _review } = req.body; // `_review` content from the request body

  if (!_review) {
    return res.status(400).json({ error: 'Review content (_review) is required.' });
  }

  try {
    // Ensure database connection
    await connectToDatabase();

    const newReview = {
      _bookId: id,
      _review,
      createdAt: new Date()
    };

    // Push the new review to the book's reviews array
    const result = await database
      .collection('books')
      .updateOne(
        { _id: id }, // Match the book by `_id`
        { $push: { reviews: newReview } } // Add the new review to the `reviews` array
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Book not found.' });
    }

    return res.status(201).json({ message: 'Review added successfully.', review: newReview });
  } catch (err) {
    console.error('Error adding review:', err);
    return res.status(500).json({ error: 'An error occurred while adding the review.' });
  }
};

module.exports = { getReviews, addReview };
