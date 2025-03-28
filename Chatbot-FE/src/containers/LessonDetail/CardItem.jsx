import React, { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  StyledBox,
  StyledCard,
  StyledItemTypography,
  StyledCardMedia,
  StyledCardButton,
} from './index.style';

const CardItem = ({ card, onPrevCard, onNextCard, currentIndex }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => setIsFlipped(!isFlipped);

  return (
    <StyledBox className="cardBox">
      <StyledCardButton
        className="customButton"
        disabled={currentIndex === 0}
        onClick={onPrevCard}
      >
        <ChevronLeftIcon />
      </StyledCardButton>
      <StyledCard
        className={`customCard ${isFlipped ? 'flipped' : ''}`}
        onClick={handleCardClick}
      >
        {!isFlipped && (
          <>
            <StyledItemTypography className="titleTypo">
              {card.name}
            </StyledItemTypography>
            <StyledCardMedia image={card.imageUrl} />
          </>
        )}
        {isFlipped && (
          <StyledItemTypography className="descTypo">
            {card.desc}
          </StyledItemTypography>
        )}
      </StyledCard>
      <StyledCardButton className="customButton" onClick={onNextCard}>
        <ChevronRightIcon />
      </StyledCardButton>
    </StyledBox>
  );
};

export default CardItem;
