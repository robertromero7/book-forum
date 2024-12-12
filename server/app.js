app.get('/', (req, res) => {
    res.send('Server is running correctly!');
  });

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());

const client = new MongoClient('your_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'books';



app.get('/books', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const books = await db.collection('books').find({}).toArray();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  } finally {
    await client.close();
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






