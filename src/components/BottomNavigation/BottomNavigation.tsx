import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen, CalendarDays, House, MessageCircle,
  UserRound, X, HeartPulse,
} from 'lucide-react';
import './BottomNavigation.css';

const itens = [
  { titulo: 'Início', rota: '/inicio', Icone: House },
  { titulo: 'Agenda', rota: '/agenda', Icone: CalendarDays },
  { titulo: 'Chat', rota: '/chat', Icone: MessageCircle },
  { titulo: 'Conteúdo', rota: '', Icone: BookOpen },
  { titulo: 'Perfil', rota: '', Icone: UserRound },
];

export default function BottomNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [pendente, setPendente] = useState<string | null>(null);

  return (
    <>
      <nav className="app-bottom-navigation" aria-label="Menu principal">
        <div className="app-bottom-navigation-content">
          {itens.map(({ titulo, rota, Icone }) => {
            const ativo = rota !== '' && (pathname === rota || pathname.startsWith(`${rota}/`));
            return (
              <button
                key={titulo}
                type="button"
                className={`app-nav-item${ativo ? ' app-nav-item--ativo' : ''}`}
                aria-current={ativo ? 'page' : undefined}
                onClick={() => rota ? navigate(rota) : setPendente(titulo)}
              >
                <Icone size={21} strokeWidth={1.7} aria-hidden="true" />
                <span>{titulo}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {pendente && (
        <div className="app-nav-modal-overlay" onMouseDown={(evento) => {
          if (evento.target === evento.currentTarget) setPendente(null);
        }}>
          <div className="app-nav-modal" role="dialog" aria-modal="true" aria-labelledby="app-nav-modal-titulo">
            <button type="button" className="app-nav-modal-fechar" aria-label="Fechar" onClick={() => setPendente(null)}>
              <X size={20} />
            </button>
            <HeartPulse size={36} color="#b8797b" aria-hidden="true" />
            <h2 id="app-nav-modal-titulo">{pendente}</h2>
            <p>Essa funcionalidade será desenvolvida nas próximas etapas do Cuida-se.</p>
            <button type="button" className="app-nav-modal-ok" onClick={() => setPendente(null)}>Entendi</button>
          </div>
        </div>
      )}
    </>
  );
}
