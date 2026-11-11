import { useState } from 'react';
import {
  Bell,
  HeartPulse,
  ClipboardCheck,
  Syringe,
  MessageCircleQuestion,
  CalendarDays,
  House,
  MessageCircle,
  BookOpen,
  UserRound,
  ChevronRight,
  X,
} from 'lucide-react';

import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const quickAccess = [
  {
    title: 'Sobre a doença',
    Icon: HeartPulse,
  },
  {
    title: 'Exames e rastreamento',
    Icon: ClipboardCheck,
  },
  {
    title: 'Vacina HPV',
    Icon: Syringe,
  },
  {
    title: 'Tire suas dúvidas',
    Icon: MessageCircleQuestion,
  },
];

const menuItems = [
  { title: 'Início', Icon: House },
  { title: 'Agenda', Icon: CalendarDays },
  { title: 'Chat', Icon: MessageCircle },
  { title: 'Conteúdo', Icon: BookOpen },
  { title: 'Perfil', Icon: UserRound },
];

export default function HomePage() {
  const [modal, setModal] = useState<string | null>(null);
  const nomeCompleto = sessionStorage.getItem('cuidaSe:nome') || '';
  const primeiroNome = nomeCompleto.trim().split(/\s+/)[0] || 'Visitante';
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <div className="home-container">

        {/* Cabeçalho */}
        <header className="home-header">
          <div>
            <h1>
              Olá, {primeiroNome}! <span>💛</span>
            </h1>
            <p>
              Cuidar de você é um passo
              <br />
              para um futuro mais saudável.
            </p>
          </div>

          <button
            className="notification-button"
            aria-label="Notificações"
            onClick={() => setModal('Notificações')}
          >
            <Bell size={24} strokeWidth={1.6} />
          </button>
        </header>

        {/* Banner principal */}
        <section className="home-banner">
          <div className="banner-content">
            <h2>
              PREVENIR
              <br />
              É ESCOLHER
              <br />
              MAIS VIDA
            </h2>

            <button
              className="banner-button"
              onClick={() => navigate('/sobre')}
            >
              Saiba mais
            </button>
          </div>
        </section>

        {/* Acesso rápido */}
        <section className="quick-section">
          <h2>Acesso rápido</h2>

          <div className="quick-grid">
            {quickAccess.map(({ title, Icon }) => (
              <button
                key={title}
                className="quick-card"
                onClick={() => {
                  if (title === 'Sobre a doença') {
                    navigate('/sobre');
                  } else if (title === 'Exames e rastreamento') {
                    navigate('/exames');
                  } else {
                    setModal(title);
                  }
                }}>
                <span className="quick-icon">
                  <Icon size={27} strokeWidth={1.5} />
                </span>

                <span className="quick-label">{title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Acompanhamento */}
        <section className="health-section">
          <button
            className="health-card"
            onClick={() => setModal('Meu acompanhamento')}
          >
            <div className="health-icon">
              <CalendarDays size={32} strokeWidth={1.5} />
            </div>

            <div className="health-content">
              <h3>Sua saúde em dia</h3>
              <p>Acompanhe seus exames, consultas e lembretes.</p>
            </div>

            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </section>
      </div>

      {/* Navegação inferior */}
      <nav className="bottom-navigation" aria-label="Menu principal">
        <div className="bottom-navigation-content">
          {menuItems.map(({ title, Icon }) => (
            <button
              key={title}
              className={`nav-item ${title === 'Início' ? 'active' : ''}`}
              onClick={() => {
                if (title !== 'Início') setModal(title);
              }}
            >
              <Icon size={21} strokeWidth={1.7} />
              <span>{title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Aviso temporário */}
      {modal && (
        <div className="modal-overlay">
          <div
            className="home-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close"
              onClick={() => setModal(null)}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <HeartPulse size={36} color="#b8797b" />

            <h2 id="modal-title">{modal}</h2>
            <p>
              Essa funcionalidade será desenvolvida
              nas próximas etapas do Cuida-se.
            </p>

            <button
              className="modal-button"
              onClick={() => setModal(null)}
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
