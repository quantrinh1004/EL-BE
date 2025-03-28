const chatDao = require('../daos/chat');

const createChat = async (req, res) => {
  const { userPrompt, aiResponse, conversationId } = req.body;
  const chat = await chatDao.createChat({ userPrompt, aiResponse, conversationId });
  return res.send({ chat });
};

const getChatsByConversationId = async (req, res) => {
  const conversationId = req.query.conversationId;
  if (!conversationId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const chats = await chatDao.getChatsByConversationId(conversationId);
  return res.send({ chats });
};

const getChat = async (req, res) => {
  const { id } = req.params;
  const chat = await chatDao.getChat(id);
  return res.send({ chat });
};

const updateChat = async (req, res) => {
  const { id } = req.params;
  const updateInfo = req.body;
  const chat = await chatDao.updateChat(id, updateInfo);
  return res.send({ chat });
};

const deleteChat = async (req, res) => {
  const { id } = req.params;
  await chatDao.deleteChat(id);
  return res.send({});
};

module.exports = { createChat, getChatsByConversationId, getChat, updateChat, deleteChat };
