const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  desc: { type: String, required: true },
  lessonId: { type: ObjectId, ref: 'Lesson', required: true },
});

module.exports = mongoose.model('Card', cardSchema);
