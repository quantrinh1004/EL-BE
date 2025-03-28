import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import LessonPage from '../pages/Conversation';
import LessonDetailPage from '../pages/LessonDetail';
import AccountPage from '../pages/Account';
import UserManagementPage from '../pages/UserManagement';
import ProtectedRoute from './ProtectedRoute';
import { getToken } from '../utils/localStorage';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <LessonPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={getToken() ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={getToken() ? <Navigate to="/" /> : <RegisterPage />}
      />
      <Route
        path="/:lessonId"
        element={
          <ProtectedRoute>
            <LessonDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-management"
        element={
          <ProtectedRoute>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;
