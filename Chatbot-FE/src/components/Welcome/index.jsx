import React, { useContext } from 'react';
import { AuthContext } from '@src/checkAdminContext';
import { StyledBox, StyledTypography, StyledButton } from './index.style';

const Welcome = ({ onAddLesson }) => {
  const isAdmin = useContext(AuthContext);

  return (
    <StyledBox>
      <StyledTypography className="titleTypo">
        Welcome to the lessons!
      </StyledTypography>
      <StyledTypography className="customTypo">
        Please select a lesson to study.
      </StyledTypography>
      {isAdmin && (
        <StyledButton onClick={onAddLesson}>Create Lesson</StyledButton>
      )}
      <StyledTypography className="lessonTypo">LESSON LIST</StyledTypography>
    </StyledBox>
  );
};

export default Welcome;
