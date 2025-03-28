import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@src/checkAdminContext';
import {
  StyledCard,
  StyledButton,
  StyledCardActions,
  StyledTypography,
  StyledCardMedia,
  StyledCardContent,
} from './index.style';

const ConversationItem = ({
  conversation,
  onEditConversation,
  onDeleteConversation,
}) => {
  const isAdmin = useContext(AuthContext);
  const navigate = useNavigate();
  const handleViewConversation = () => navigate(`/${conversation.id}`);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <StyledCard>
        <StyledCardMedia
          image={conversation.imageUrl}
          onClick={handleViewConversation}
        />
        <StyledCardContent>
          <StyledTypography
            className="itemTitle"
            onClick={handleViewConversation}
          >
            {conversation.title}
          </StyledTypography>
          <StyledTypography className="itemDesc">
            This is a beginner&apos;s English conversation about{' '}
            {conversation.title}.
          </StyledTypography>
          <hr />
        </StyledCardContent>
        <StyledCardActions>
          {!isAdmin && (
            <StyledButton className="ViewBtn" onClick={handleViewConversation}>
              View
            </StyledButton>
          )}
          {isAdmin && (
            <>
              <StyledButton onClick={handleViewConversation}>View</StyledButton>
              <StyledButton onClick={() => onEditConversation(conversation)}>
                Edit
              </StyledButton>
              <StyledButton onClick={() => onDeleteConversation(conversation)}>
                Delete
              </StyledButton>
            </>
          )}
        </StyledCardActions>
      </StyledCard>
    </Grid>
  );
};

export default ConversationItem;
