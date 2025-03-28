const { ObjectId } = require('mongoose').Types;
const Chat = require('../models/chats');

const createChat = async ({ userPrompt, aiResponse, conversationId }) => {
  const chat = await Chat.create({ userPrompt, aiResponse, conversationId });
  return chat;
};

const getChatsByConversationId = async (conversationId) => {
  const chats = await Chat.find({ conversationId }).lean();
  return chats;
};

const getChat = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const chat = await Chat.findById(condition);
    return chat;
  }
  if (typeof condition === 'object' && condition !== null) {
    const chat = await Chat.findOne(condition);
    return chat;
  }
  return null;
};

const updateChat = async (id, updateFields) => {
  const chat = await Chat.findByIdAndUpdate(id, updateFields, { new: true });
  return chat;
};

const deleteChat = async (id) => {
  const chat = await Chat.findByIdAndDelete(id);
  return chat;
};

module.exports = { createChat, getChatsByConversationId, getChat, updateChat, deleteChat };
