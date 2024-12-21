const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  _bookId: { type: String, required: true }, // Use String instead of ObjectId
  _review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
