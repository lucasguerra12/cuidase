import { useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CalendarDays,
  House,
  MessageCircle,
  UserRound,
} from 'lucide-react';

import './BottomNavigation.css';

const itens = [
  { titulo: 'Início', rota: '/inicio', Icone: House },
  { titulo: 'Agenda', rota: '/agenda', Icone: CalendarDays },
  { titulo: 'Chat', rota: '/chat', Icone: MessageCircle },
  { titulo: 'Conteúdo', rota: '/conteudo', Icone: BookOpen },
  { titulo: 'Perfil', rota: '/perfil', Icone: UserRound },
];

export default function BottomNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="app-bottom-navigation" aria-label="Menu principal">
      <div className="app-bottom-navigation-content">
        {itens.map(({ titulo, rota, Icone }) => {
          const ativo = pathname === rota || pathname.startsWith(`${rota}/`);
          return (
            <button
              key={titulo}
              type="button"
              className={`app-nav-item${ativo ? ' app-nav-item--ativo' : ''}`}
              aria-current={ativo ? 'page' : undefined}
              onClick={() => navigate(rota)}
            >
              <Icone size={21} strokeWidth={1.7} aria-hidden="true" />
              <span>{titulo}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
