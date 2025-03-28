import React from 'react';
import CelebrationIcon from '@mui/icons-material/Celebration';
import {
  StyledFinishTypography,
  StyledFinishDialog,
  StyledTitleDialog,
  StyledFinishDialogActions,
  StyledFinishButton,
} from './index.style';

const NotifyFinishDialog = ({ open, onClose, onReturn }) => (
  <StyledFinishDialog open={open} onClose={onClose}>
    <StyledTitleDialog className="title">Complete Lesson</StyledTitleDialog>
    <StyledFinishTypography className="customTypo">
      Congratulations, you have completed this lesson! <CelebrationIcon />
    </StyledFinishTypography>
    <StyledFinishDialogActions>
      <StyledFinishButton onClick={onClose}>Learn again</StyledFinishButton>
      <StyledFinishButton onClick={onReturn} className="containedButton">
        Back Lesson
      </StyledFinishButton>
    </StyledFinishDialogActions>
  </StyledFinishDialog>
);

export default NotifyFinishDialog;
