import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { MoreVert, Edit, Delete, Add } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  getConversations,
  updateConversation,
  deleteConversation,
  createConversation,
} from '@src/apis/conversation';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';
import AddConversationDialog from '../../containers/Conversation/AddConversationDialog';

// ====== Styled Component ======
const SidebarContainer = styled(Box)`
  width: 300px;
  background: #ffffff;
  border-right: 1px solid #ddd;
  padding: 16px;
  overflow-y: auto;
  position: fixed;
  left: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-top: 100px;
  margin-left: 10px;
`;

const Sidebar = ({ onSelectConversation, activeConversationId }) => {
  const [conversations, setConversations] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [conversationIdCur, setConversationIdCur] =
    useState(activeConversationId);
  const [selectedConv, setSelectedConv] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const fetchConversations = async () => {
    try {
      const response = await getConversations();
      if (response) {
        const conversationsArray = response?.result?.conversations || [];
        conversationsArray.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
        );
        setConversations(conversationsArray);
      } else {
        enqueueSnackbar('Failed to fetch conversations', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Error fetching conversations', { variant: 'error' });
    }
    setConversationIdCur(activeConversationId);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSelectConversation = (conversationId) => {
    setConversationIdCur(conversationId);
    onSelectConversation(conversationId);
    navigate(`/${conversationId}`);
  };

  // Mở menu khi click icon MoreVert
  const handleMenuOpen = (event, conversation) => {
    setAnchorEl(event.currentTarget);
    setSelectedConv(conversation);
  };

  // Đóng menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Mở dialog chỉnh sửa tiêu đề
  const handleEditClick = () => {
    setEditTitle(selectedConv.title);
    setOpenEditDialog(true);
    handleMenuClose();
  };

  // Đóng dialog chỉnh sửa
  const handleEditClose = () => {
    setOpenEditDialog(false);
    setSelectedConv(null);
  };

  // Cập nhật tiêu đề cuộc trò chuyện
  const handleUpdateConversation = async () => {
    try {
      await updateConversation(selectedConv.id, editTitle);
      enqueueSnackbar('Conversation updated successfully', {
        variant: 'success',
      });
      fetchConversations();
    } catch (error) {
      enqueueSnackbar('Failed to update conversation', { variant: 'error' });
    }
    handleEditClose();
  };

  // Tạo cuộc trò chuyện
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title) {
      setOpenCreateDialog(false);
      return;
    }
    const response = await createConversation(title);
    if (response?.status === 0) {
      enqueueSnackbar(response.message, { variant: 'error' });
    }
    fetchConversations();
    const newConversationId = response?.result?.conversation?.id;
    if (newConversationId) {
      navigate(`/${newConversationId}`);
    }
    setTitle('');
    setOpenCreateDialog(false);
  };

  // Xóa cuộc trò chuyện
  const handleDeleteConversation = async () => {
    try {
      await deleteConversation(selectedConv.id);
      enqueueSnackbar('Conversation deleted successfully', {
        variant: 'success',
      });
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Failed to delete conversation', { variant: 'error' });
    }
    handleMenuClose();
  };

  return (
    <SidebarContainer style={{ borderRadius: '12px' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ alignSelf: 'flex-start', margin: '8px' }}
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
      >
        Back
      </Button>
      <Typography variant="h6">Conversations</Typography>
      <Button
        variant="outlined"
        startIcon={<Add />}
        sx={{
          borderColor: 'skyBlue',
          color: 'skyBlue',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '8px auto',
          '&:hover': {
            borderColor: 'primary',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
          },
        }}
        onClick={() => setOpenCreateDialog(true)}
      >
        New Conversation
      </Button>
      <List>
        {conversations.map((conv) => (
          <React.Fragment key={conv.id}>
            <ListItem
              button
              onClick={() => handleSelectConversation(conv.id)}
              sx={{
                backgroundColor:
                  conversationIdCur === conv.id ? 'skyBlue' : 'transparent',
                borderRadius: '8px',
              }}
            >
              <ListItemText primary={conv.title} />
              <IconButton onClick={(e) => handleMenuOpen(e, conv)}>
                <MoreVert />
              </IconButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <Edit fontSize="small" /> Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteConversation}>
          <Delete fontSize="small" /> Delete
        </MenuItem>
      </Menu>

      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Conversation Title</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateConversation}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <AddConversationDialog
        open={openCreateDialog}
        onClose={() => openCreateDialog(false)}
        title={title}
        onTitleChange={(e) => setTitle(e.target.value)}
        onSubmitAdd={handleCreate}
      />
    </SidebarContainer>
  );
};

export default Sidebar;
