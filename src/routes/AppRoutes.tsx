import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/Login/LoginPage';
import HomePage from '../pages/Home/HomePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inicio" element={<HomePage />} />
    </Routes>
  );
}