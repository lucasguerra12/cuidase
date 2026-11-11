
import { useNavigate, useParams, Link } from 'react-router-dom';

import {
  ArrowLeft,
  ChevronRight,
  ClipboardCheck,
  Dna,
  CalendarDays,
  MapPin,
  ShieldCheck,
  BookOpen,
  ExternalLink,
} from 'lucide-react';

import {
  exames,
  conteudosExames,
} from '../../data/examesConteudo';

import bannerExames from '../../assets/images/exames-banner.jpeg';

import './ExamesPage.css';

const icones = [
  ClipboardCheck,
  Dna,
  CalendarDays,
  MapPin,
];

export default function ExamesPage() {
  const navigate = useNavigate();
  const { assunto } = useParams<{ assunto: string }>();

  const conteudo = assunto
    ? conteudosExames[assunto]
    : undefined;

  const exameSelecionado = exames.find(
    (exame) => exame.slug === assunto
  );

  return (
    <main className="exames-page">
      <div className="exames-container">

        {/* Cabeçalho */}
        <header className="exames-header">
          <button
            type="button"
            className="exames-back"
            onClick={() =>
              navigate(assunto ? '/exames' : '/inicio')
            }
            aria-label="Voltar"
          >
            <ArrowLeft size={24} />
          </button>

          <h1>
            {assunto && exameSelecionado
              ? exameSelecionado.titulo
              : 'Exames e rastreamento'}
          </h1>

          <span className="exames-header-spacer" />
        </header>

        {/* Menu de exames */}
        {!assunto && (
          <>
            <section className="exames-banner">
              <img
                src={bannerExames}
                alt="Mulher segurando uma flor rosa"
              />
            </section>

            <div className="exames-description">
              <h2>Conhecer é cuidar de você</h2>
              <p>
                Entenda os exames preventivos e saiba
                como buscar atendimento.
              </p>
            </div>

            <section
              className="exames-list"
              aria-label="Opções de exames e rastreamento"
            >
              {exames.map((exame, index) => {
                const Icon = icones[index];

                return (
                  <Link
                    key={exame.slug}
                    to={`/exames/${exame.slug}`}
                    className="exames-option"
                  >
                    <span className="exames-option-icon">
                      <Icon size={30} strokeWidth={1.5} />
                    </span>

                    <span className="exames-option-info">
                      <strong>{exame.titulo}</strong>
                      <small>{exame.subtitulo}</small>
                      <span>{exame.descricao}</span>
                    </span>

                    <ChevronRight
                      className="exames-chevron"
                      size={23}
                    />
                  </Link>
                );
              })}
            </section>
          </>
        )}

        {/* Conteúdo educativo disponível */}
        {assunto && conteudo && (
          <article className="exames-content-card">
            <div className="exames-content-heading">
              <BookOpen size={27} />
              <h2>{conteudo.titulo}</h2>
            </div>

            <p className="exames-intro">
              {conteudo.introducao}
            </p>

            <div className="exames-sections">
              {conteudo.secoes.map((secao) => (
                <section
                  className="exames-info-section"
                  key={secao.titulo}
                >
                  <h3>{secao.titulo}</h3>
                  <p>{secao.texto}</p>
                </section>
              ))}
            </div>

            <aside className="exames-highlight">
              <ShieldCheck size={25} />
              <p>{conteudo.destaque}</p>
            </aside>

            <footer className="exames-footer">
              <p>
                Conteúdo educativo. Não substitui
                orientação de profissionais da saúde.
              </p>

              <h3>Fontes consultadas</h3>

              {conteudo.fontes.map((fonte) => (
                <a
                  key={fonte.url}
                  href={fonte.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {fonte.nome}
                  <ExternalLink size={16} />
                </a>
              ))}
            </footer>
          </article>
        )}

        {/* Conteúdos que faremos depois */}
        {assunto && !conteudo && (
          <section className="exames-content-card exames-pendente">
            <BookOpen size={48} strokeWidth={1.4} />

            <h2>
              {exameSelecionado?.titulo ??
                'Conteúdo não encontrado'}
            </h2>

            <p>
              Estamos preparando este conteúdo
              educativo para o Cuida-se.
            </p>

            <Link to="/exames" className="exames-return">
              Voltar aos exames
            </Link>
          </section>
        )}

      </div>
    </main>
  );
}
    