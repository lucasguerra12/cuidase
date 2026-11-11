import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/Login/LoginPage';
import HomePage from '../pages/Home/HomePage';
import SobrePage from '../pages/Sobre/SobrePage';
import ExamesPage from '../pages/Exames/ExamesPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inicio" element={<HomePage />} />
      <Route path="/sobre" element={<SobrePage />} />
      <Route path="/exames" element={<ExamesPage />} />
      <Route path="/exames/:assunto" element={<ExamesPage />} />
    </Routes>
  );
}