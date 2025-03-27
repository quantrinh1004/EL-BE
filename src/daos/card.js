const { ObjectId } = require('mongoose').Types;
const Card = require('../models/cards');

const createCard = async ({ name, imageURL, desc, lessonId }) => {
  const card = await Card.create({ name, imageURL, desc, lessonId });
  return card;
};

const getCards = async (condition) => {
  const cards = await Card.find(condition).lean();
  return cards;
};

const getCard = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const card = await Card.findById(condition);
    return card;
  }
  if (typeof condition === 'object' && condition !== null) {
    const card = await Card.findOne(condition);
    return card;
  }
  return null;
};

const updateCard = async (id, updateFields) => {
  const card = await Card.findByIdAndUpdate(id, updateFields, { new: true });
  return card;
};

const deleteCard = async (id) => {
  const card = await Card.findByIdAndDelete(id);
  return card;
};

module.exports = { createCard, getCards, getCard, updateCard, deleteCard };
