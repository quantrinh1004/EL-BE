import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactMarkdown from 'react-markdown';
import { CssBaseline, Typography, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getChats, createChat } from '@src/apis/chat';
import { useSnackbar } from 'notistack';
import Header from '@src/components/Header';
import Sidebar from '@src/components/Sidebar';
// import { getConversation } from '@src/apis/conversation';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../../configs';
import {
  OuterContainer,
  ChatWrapper,
  ChatContainer,
  UserMessage,
  BotMessage,
  ChatInputContainer,
  InputField,
} from './index.style';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const ChatPage = ({ conversationId }) => {
  const [chats, setChats] = useState([]);
  const [activeConversationId, setActiveConversationId] =
    useState(conversationId);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const fetchChats = async () => {
    setLoading(true);
    const response = await getChats(conversationId);
    if (!response) {
      enqueueSnackbar('Failed to fetch chats', { variant: 'error' });
      setLoading(false);
      return;
    }
    setChats(response.result?.chats || []);
    setLoading(false);
  };

  useEffect(() => {
    if (activeConversationId) {
      fetchChats();
    }
  }, [activeConversationId]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const tempChat = {
      userPrompt: message,
      aiResponse: 'Processing...',
      conversationId,
    };
    setChats((prevChats) => [...prevChats, tempChat]);
    setMessage('');

    try {
      const result = await model.generateContent(message);
      const responseText = result.response.text();

      await createChat({
        userPrompt: message,
        aiResponse: responseText,
        conversationId,
      });
      setChats((prevChats) =>
        prevChats.map((chat, index) =>
          index === prevChats.length - 1
            ? { ...chat, aiResponse: responseText }
            : chat,
        ),
      );
    } catch (error) {
      enqueueSnackbar('Failed to get AI response', { variant: 'error' });
    }
  };

  return (
    <OuterContainer>
      <CssBaseline />
      <Header />
      <Sidebar
        onSelectConversation={setActiveConversationId}
        activeConversationId={activeConversationId}
      />
      {/* <SidebarRight>
        <Typography variant="h6" gutterBottom>
          Chatting
        </Typography>
        {conversation && (
          <Typography variant="body1">
            {' '}
            {conversation ? conversation.title : 'Chat'}
          </Typography>
        )}
      </SidebarRight> */}
      <ChatWrapper>
        <ChatContainer>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            chats.map((chat, index) => (
              <React.Fragment key={chat.id || index}>
                <UserMessage>
                  <Typography variant="body1">{chat.userPrompt}</Typography>
                </UserMessage>
                <BotMessage>
                  <ReactMarkdown>{chat.aiResponse}</ReactMarkdown>
                </BotMessage>
              </React.Fragment>
            ))
          )}
        </ChatContainer>
        <ChatInputContainer>
          <InputField
            variant="outlined"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <IconButton color="primary" onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </ChatInputContainer>
      </ChatWrapper>
    </OuterContainer>
  );
};

export default ChatPage;
