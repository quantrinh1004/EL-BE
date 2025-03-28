import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { getConversations } from '@src/apis/conversation';
import { getChats } from '@src/apis/chat';
import { getUserId } from '../../utils/localStorage';

// ✅ Custom Hook (useUserPromptPreloader)
const useUserPromptPreloader = () => {
  const [promptPreloaderValue, setPromptPreloaderValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(
      () => setPromptPreloaderValue('Loading prompt...'),
      1000,
    );
    return () => clearTimeout(timeout);
  }, []);

  return { promptPreloaderValue };
};

// ✅ PageTitle Component
const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

// ✅ UserPrompt Component
const UserPrompt = ({ text }) => (
  <Box sx={{ padding: 1 }}>
    <Typography variant="body1" color="text.primary">
      {text}
    </Typography>
  </Box>
);

// ✅ AiResponse Component
const AiResponse = ({ aiResponse }) => (
  <Box sx={{ padding: 1, backgroundColor: '#f1f1f1', borderRadius: 2 }}>
    <Typography variant="body2" color="text.secondary">
      {aiResponse}
    </Typography>
  </Box>
);

// ✅ PromptPreloader Component
const PromptPreloader = ({ promptValue }) => (
  <Box display="flex" alignItems="center" gap={1} mt={2}>
    <CircularProgress size={20} />
    <Typography variant="body2" color="text.secondary">
      {promptValue}
    </Typography>
  </Box>
);

// ✅ Conversation Component
const Conversation = () => {
  const [title, setTitle] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Lấy giá trị từ custom hook
  const { promptPreloaderValue } = useUserPromptPreloader();

  useEffect(() => {
    // 👉 Gọi API để lấy thông tin cuộc hội thoại
    const fetchConversationData = async () => {
      const userId = getUserId();
      try {
        setLoading(true);
        const conversation = await getConversations(userId); // 🟢 Gọi API conversation
        setTitle(conversation?.result?.conversations?.[0]?.title || '');
        const conversationId =
          conversation?.result?.conversations?.[0]?.id || '';
        if (conversationId) {
          const chatData = await getChats(conversationId);
          const chatArray = chatData?.result?.chats;
          console.log(chatArray);
          setChats(chatArray || []);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load conversation data');
      } finally {
        setLoading(false);
      }
    };

    fetchConversationData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <>
      {/* Meta Title */}
      <PageTitle title={`${title || 'Conversation'} | Phoenix`} />

      <Box
        sx={{
          maxWidth: '700px',
          margin: 'auto',
          transition: 'opacity 0.2s ease-out',
          opacity: 1,
        }}
      >
        {chats.map((chat, index) => (
          <div key={chat?.id || index}>
            {/* Số thứ tự */}
            <Typography variant="caption" color="text.secondary">
              {index + 1}.
            </Typography>

            {/* User Prompt */}
            <UserPrompt text={chat.user_prompt} />

            {/* AI Response */}
            <AiResponse aiResponse={chat.ai_response} />
          </div>
        ))}
      </Box>

      {/* Preloader */}
      {promptPreloaderValue && (
        <>
          <PromptPreloader promptValue={promptPreloaderValue} />
        </>
      )}
    </>
  );
};

export default Conversation;
