import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { CssBaseline } from '@mui/material';
import { getChats, deleteChat } from '@src/apis/chat';
import { removeToken, removeUserId } from '@src/utils/localStorage';
import { AuthContext } from '@src/checkAdminContext';
import Header from '@src/components/Header';
import Footer from '@src/components/Footer';
import CardItem from './CardItem';
import CardButtons from './CardButtons';
import AddCardDialog from './AddCardDialog';
import EditCardDialog from './EditCardDialog';
import DeleteCardDialog from './DeleteCardDialog';
import NotifyFinishDialog from './NotifyFinishDialog';
import {
  StyledGrid,
  StyledBox,
  StyledStack,
  StyledTypography,
  StyledButton,
  StyledStarIcon,
} from './index.style';

const LessonDetail = ({ lessonId }) => {
  const isAdmin = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openFinishLesson, setOpenFinishLesson] = useState(false);
  const [completedCards, setCompletedCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleReturn = () => navigate('/');

  const fetchCards = async () => {
    setLoading(true);
    const response = await getChats(lessonId);
    if (!response) {
      enqueueSnackbar('Failed to fetch cards', { variant: 'error' });
      setLoading(false);
      return;
    }
    const cardsArray = response?.result?.cards || [];
    setCards(cardsArray);
    setLoading(false);
  };
  const handleLogout = () => {
    removeToken();
    removeUserId();
  };

  const handleNextCard = () => {
    if (currentIndex === cards.length - 1) {
      setOpenFinishLesson(true);
      return;
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevCard = () => setCurrentIndex((prevIndex) => prevIndex - 1);

  const handleFinish = () => setOpenFinishLesson(true);

  const handleCloseFinish = () => {
    setCurrentIndex(0);
    setOpenFinishLesson(false);
  };

  const handleOpenCreate = () => setOpenCreate(true);

  const handleCloseCreate = () => setOpenCreate(false);

  const handleOpenEdit = (card) => {
    setSelectedCard(card);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setSelectedCard(null);
    setOpenEdit(false);
  };

  const handleOpenDelete = (card) => {
    setSelectedCard(card);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setSelectedCard(null);
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    const response = await deleteChat(selectedCard.id);
    if (response?.status === 0) {
      enqueueSnackbar(response.message, { variant: 'error' });
    }
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    fetchCards(lessonId);
    handleCloseDelete();
  };

  const handleMarkCompleted = (cardId) => {
    if (completedCards.includes(cardId)) {
      setCompletedCards((prevCompleted) =>
        prevCompleted.filter((id) => id !== cardId),
      );
      return;
    }
    setCompletedCards((prevCompleted) => [...prevCompleted, cardId]);
  };

  useEffect(() => {
    fetchCards(lessonId);
  }, []);

  useEffect(() => {
    if (currentIndex === cards.length - 1 && !cards.length === 1) {
      setOpenFinishLesson(true);
    }
  }, [currentIndex, cards]);

  return (
    <>
      <CssBaseline />
      <Header onLogout={handleLogout} />
      <StyledBox className="customBox">
        <StyledTypography className="titleTypo">
          Welcome to the cards!
        </StyledTypography>
        <StyledStack className="customStack">
          <StyledTypography className="paraTypo">Keep going!</StyledTypography>
          {isAdmin && (
            <StyledButton className="createCard" onClick={handleOpenCreate}>
              Create Card
            </StyledButton>
          )}
          <StyledTypography className="paraTypo">
            {`${currentIndex + 1} / ${cards.length}`}
          </StyledTypography>
        </StyledStack>
        <StyledStarIcon
          onClick={() => handleMarkCompleted(cards[currentIndex]?.id)}
          className={`${
            completedCards.includes(cards[currentIndex]?.id) ? 'completed' : ''
          }`}
        />
      </StyledBox>
      <StyledGrid>
        {loading && <StyledTypography>Loading...</StyledTypography>}
        {!loading && cards[currentIndex] && (
          <CardItem
            card={cards[currentIndex]}
            key={cards[currentIndex].id}
            onPrevCard={handlePrevCard}
            onNextCard={handleNextCard}
            currentIndex={currentIndex}
          />
        )}
      </StyledGrid>
      <CardButtons
        card={cards[currentIndex]}
        onEditCard={handleOpenEdit}
        onDeleteCard={handleOpenDelete}
        onReturn={handleReturn}
        onFinish={handleFinish}
      />
      <AddCardDialog
        open={openCreate}
        onClose={handleCloseCreate}
        lessonId={lessonId}
        fetchCards={fetchCards}
      />
      <EditCardDialog
        open={openEdit}
        onClose={handleCloseEdit}
        selectedCard={selectedCard}
        lessonId={lessonId}
        fetchCards={fetchCards}
      />

      <DeleteCardDialog
        open={openDelete}
        onClose={handleCloseDelete}
        selectedCard={selectedCard}
        onDelete={handleDelete}
      />
      <NotifyFinishDialog
        open={openFinishLesson}
        onClose={handleCloseFinish}
        onReturn={handleReturn}
      />
      <Footer />
    </>
  );
};

export default LessonDetail;
