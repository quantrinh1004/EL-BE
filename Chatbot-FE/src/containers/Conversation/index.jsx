import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Grid, CssBaseline, Typography } from '@mui/material';
import {
  getConversations,
  createConversation,
  updateConversation,
  deleteConversation,
} from '@src/apis/conversation';
import { removeToken, removeUserId } from '@src/utils/localStorage';
import Header from '@src/components/Header';
import Footer from '@src/components/Footer';
import Welcome from '@src/components/Welcome';
import ConversationItem from './ConversationItem';
import AddConversationDialog from './AddConversationDialog';
import EditConversationDialog from './EditConversationDialog';
import DeleteConversationDialog from './DeleteConversationDialog';
import { StyledContainer } from './index.style';

const ConversationContainer = () => {
  const [conversations, setConversations] = useState([]);
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editImageURL, setEditImageURL] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const fetchConversations = async () => {
    setLoading(true);
    const response = await getConversations();
    if (!response) {
      enqueueSnackbar('Get conversations failed', { variant: 'error' });
      setLoading(false);
      return;
    }
    const conversationsArray = response?.result?.conversations || [];
    setConversations(conversationsArray);
    setLoading(false);
  };

  const handleLogout = () => {
    removeToken();
    removeUserId();
  };

  const handleOpenCreate = () => setOpenCreate(true);

  const handleCloseCreate = () => setOpenCreate(false);

  const handleAddConversation = () => handleOpenCreate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title && !imageURL) {
      handleCloseCreate();
      return;
    }
    const response = await createConversation(title, imageURL);
    if (response?.status === 0) {
      enqueueSnackbar(response.message, { variant: 'error' });
    }
    setTitle('');
    setImageURL('');
    fetchConversations();
    handleCloseCreate();
  };

  const handleOpenEdit = () => setOpenEdit(true);

  const handleCloseEdit = () => setOpenEdit(false);

  const handleEditConversation = (conversation) => {
    setSelectedConversation(conversation);
    setEditTitle(conversation.title);
    setEditImageURL(conversation.imageUrl);
    handleOpenEdit();
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editTitle && !editImageURL) {
      handleCloseEdit();
      return;
    }
    const response = await updateConversation(
      selectedConversation.id,
      editTitle,
      editImageURL,
    );
    if (response?.status === 0) {
      enqueueSnackbar(response.message, { variant: 'error' });
    }
    setEditTitle('');
    setEditImageURL('');
    fetchConversations();
    handleCloseEdit();
  };

  const handleOpenDelete = (conversation) => {
    setSelectedConversation(conversation);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setSelectedConversation(null);
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    const response = await deleteConversation(selectedConversation.id);
    if (response?.status === 0) {
      enqueueSnackbar(response.message, { variant: 'error' });
    }
    fetchConversations();
    handleCloseDelete();
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <>
      <CssBaseline />
      <Header onLogout={handleLogout} />
      <Welcome onAddConversation={handleAddConversation} />
      <StyledContainer>
        {loading && <Typography>Loading...</Typography>}
        {!loading && (
          <Grid container spacing={4}>
            {conversations &&
              conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  onEditConversation={handleEditConversation}
                  onDeleteConversation={handleOpenDelete}
                />
              ))}
          </Grid>
        )}
      </StyledContainer>
      <Footer />
      <>
        <AddConversationDialog
          open={openCreate}
          onClose={handleCloseCreate}
          title={title}
          imageURL={imageURL}
          onTitleChange={(e) => setTitle(e.target.value)}
          onImageURLChange={(e) => setImageURL(e.target.value)}
          onSubmitAdd={handleCreate}
        />
        <EditConversationDialog
          open={openEdit}
          onClose={handleCloseEdit}
          title={editTitle}
          imageURL={editImageURL}
          onTitleChange={(e) => setEditTitle(e.target.value)}
          onImageURLChange={(e) => setEditImageURL(e.target.value)}
          onSubmitEdit={handleEdit}
        />
        <DeleteConversationDialog
          open={openDelete}
          onClose={handleCloseDelete}
          selectedItem={selectedConversation}
          onDelete={handleDelete}
        />
      </>
    </>
  );
};

export default ConversationContainer;
