
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

import {
  abas,
  conteudos,
  type Aba,
} from '../../data/sobreDoenca';

import ilustracaoUtero from '../../assets/images/utero-educativo.jpeg';

import './SobrePage.css';

export default function SobrePage() {
  const navigate = useNavigate();

  const [abaAtiva, setAbaAtiva] = useState<Aba>('oque');
  const [erroImagem, setErroImagem] = useState(false);

  const conteudo = conteudos[abaAtiva];

  return (
    <main className="sobre-page">
      <div className="sobre-container">

        <header className="sobre-header">
          <button
            type="button"
            className="sobre-back"
            onClick={() => navigate('/inicio')}
            aria-label="Voltar ao início"
          >
            <ArrowLeft size={24} />
          </button>

          <h1>Sobre a doença</h1>
        </header>

        <nav
          className="sobre-tabs"
          aria-label="Temas sobre a doença"
        >
          {abas.map((aba) => (
            <button
              key={aba.id}
              type="button"
              aria-pressed={abaAtiva === aba.id}
              className={
                abaAtiva === aba.id
                  ? 'sobre-tab ativa'
                  : 'sobre-tab'
              }
              onClick={() => setAbaAtiva(aba.id)}
            >
              {aba.nome}
            </button>
          ))}
        </nav>

        <section
          className="sobre-illustration"
          aria-label="Ilustração anatômica educativa"
        >
          {erroImagem ? (
            <p className="sobre-image-error" role="alert">
              Não foi possível carregar a ilustração.
              Verifique o arquivo utero-educativo.jpeg.
            </p>
          ) : (
            <img
              src={ilustracaoUtero}
              alt="Ilustração educativa do útero, colo do útero e ovários"
              onError={() => setErroImagem(true)}
            />
          )}
        </section>

        <article className="sobre-card">
          <h2>{conteudo.titulo}</h2>

          <div className="sobre-texto">
            {conteudo.introducao.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>

          <ul className="sobre-lista">
            {conteudo.pontos.map((ponto) => (
              <li key={ponto}>{ponto}</li>
            ))}
          </ul>

          <aside className="sobre-highlight">
            <ShieldCheck size={23} />
            <p>{conteudo.destaque}</p>
          </aside>
        </article>

        <footer className="sobre-footer">
          <p>
            Conteúdo educativo. Não substitui
            consultas, exames ou avaliação profissional.
          </p>

          <div className="sobre-fontes">
            <h3>Fontes consultadas</h3>

            {conteudo.fontes.map((fonte) => (
              <a
                key={fonte.url}
                href={fonte.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {fonte.nome}
                <ExternalLink size={15} />
              </a>
            ))}
          </div>
        </footer>

      </div>
    </main>
  );
}
