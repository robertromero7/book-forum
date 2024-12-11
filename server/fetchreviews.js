// Example route to fetch reviews for a book
app.get('/books/:id/reviews', async (req, res) => {
    try {
      const bookId = req.params.id; // Get Open Library book ID
      const reviews = await db.collection('reviews').find({ bookId }).toArray(); // Fetch reviews by bookId
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });
  