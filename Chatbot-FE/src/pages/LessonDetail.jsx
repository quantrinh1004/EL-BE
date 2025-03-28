import React from 'react';
import { useParams } from 'react-router-dom';
import LessonDetailContainer from '../containers/LessonDetail/index';

const LessonDetail = () => {
  const { lessonId } = useParams();
  return <LessonDetailContainer lessonId={lessonId} />;
};

export default LessonDetail;
