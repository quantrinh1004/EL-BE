const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const conversationController = require('../controllers/conversation');
const { requireAdmin } = require('../middlewares/verifyAdmin');

/* eslint-disable prettier/prettier */
router.post('/conversations', requireAdmin, asyncMiddleware(conversationController.createConversation));
router.get('/conversations', asyncMiddleware(conversationController.getConversationsByUserId));
router.get('/conversation/:id', asyncMiddleware(conversationController.getConversation));
router.put('/conversation/:id', requireAdmin, asyncMiddleware(conversationController.updateConversation));
router.delete('/conversation/:id', requireAdmin, asyncMiddleware(conversationController.deleteConversation));
/* eslint-enable prettier/prettier */

module.exports = router;
