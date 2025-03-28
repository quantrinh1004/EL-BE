const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const chatController = require('../controllers/chat');
const { requireAdmin } = require('../middlewares/verifyAdmin');

/* eslint-disable prettier/prettier */
router.post('/chats', requireAdmin, asyncMiddleware(chatController.createChat));
router.get('/chats', asyncMiddleware(chatController.getChats));
router.get('/chats/:id', asyncMiddleware(chatController.getChat));
router.put('/chats/:id', requireAdmin, asyncMiddleware(chatController.updateChat));
router.delete('/chats/:id', requireAdmin, asyncMiddleware(chatController.deleteChat));
/* eslint-enable prettier/prettier */

module.exports = router;
