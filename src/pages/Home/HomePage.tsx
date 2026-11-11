import { useState } from 'react';
import {
  Bell,
  HeartPulse,
  ClipboardCheck,
  Syringe,
  MessageCircleQuestion,
  CalendarDays,
  ChevronRight,
  X,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import './HomePage.css';

const quickAccess = [
  { title: 'Sobre a doença', Icon: HeartPulse },
  { title: 'Exames e rastreamento', Icon: ClipboardCheck },
  { title: 'Vacina HPV', Icon: Syringe },
  { title: 'Tire suas dúvidas', Icon: MessageCircleQuestion },
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
            type="button"
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
              type="button"
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
                type="button"
                key={title}
                className="quick-card"
                onClick={() => {
                  if (title === 'Sobre a doença') {
                    navigate('/sobre');
                  } else if (title === 'Exames e rastreamento') {
                    navigate('/exames');
                  } else if (title === 'Vacina HPV') {
                    navigate('/vacina-hpv');
                  } else if (title === 'Tire suas dúvidas') {
                    navigate('/duvidas');
                  } else {
                    setModal(title);
                  }
                }}
              >
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
            type="button"
            className="health-card"
            onClick={() => navigate('/agenda')}
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

      {/* Menu compartilhado entre Início e Agenda */}
      <BottomNavigation />

      {/* Aviso temporário para funcionalidades futuras */}
      {modal && (
        <div className="modal-overlay">
          <div
            className="home-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              type="button"
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
              type="button"
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
