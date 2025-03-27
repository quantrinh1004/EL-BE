const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  numberCards: { type: Number, default: 0 },
});

module.exports = mongoose.model('Lesson', lessonSchema);
