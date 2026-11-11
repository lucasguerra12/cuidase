import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '../pages/Login/LoginPage';
import HomePage from '../pages/Home/HomePage';
import SobrePage from '../pages/Sobre/SobrePage';
import ExamesPage from '../pages/Exames/ExamesPage';
import FrequenciaPage from '../pages/Frequencia/FrequenciaPage';
import OndeRealizarPage from '../pages/OndeRealizar/OndeRealizarPage';
import VacinaPage from '../pages/Vacina/VacinaPage';
import DuvidasPage from '../pages/Duvidas/DuvidasPage';
import AgendaPage from '../pages/Agenda/AgendaPage';
import ChatPage from '../pages/Chat/ChatPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inicio" element={<HomePage />} />
      <Route path="/agenda" element={<AgendaPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/chat/:contatoId" element={<ChatPage/>} />
      <Route path="/sobre" element={<SobrePage />} />
      <Route path="/vacina-hpv" element={<VacinaPage />} />
      <Route path="/duvidas" element={<DuvidasPage />} />
      <Route path="/exames" element={<ExamesPage />} />
      <Route path="/exames/frequencia" element={<FrequenciaPage />} />
      <Route path="/exames/onde-realizar" element={<OndeRealizarPage />} />
      <Route path="/exames/:assunto" element={<ExamesPage />} />
    </Routes>
  );
}