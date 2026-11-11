import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ExternalLink,
  HeartHandshake,
  HelpCircle,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';

import {
  categoriasDuvidas,
  duvidasFrequentes,
  fontesDuvidas,
  type CategoriaDuvida,
} from '../../data/duvidasFrequentes';

import './DuvidasPage.css';

// Imagem opcional: a página funciona mesmo antes de gerar a arte.
const imagens = import.meta.glob(
  '../../assets/images/duvidas-frequentes-ilustracao.{jpeg,jpg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const imagemDuvidas = Object.values(imagens)[0];

type FiltroCategoria = CategoriaDuvida | 'Todas';

function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

export default function DuvidasPage() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState<FiltroCategoria>('Todas');

  const perguntasFiltradas = useMemo(() => {
    const termo = normalizar(busca);

    return duvidasFrequentes.filter((duvida) => {
      const correspondeCategoria =
        categoria === 'Todas' || duvida.categoria === categoria;

      const correspondeBusca =
        !termo ||
        normalizar(
          `${duvida.pergunta} ${duvida.resposta} ${duvida.categoria}`
        ).includes(termo);

      return correspondeCategoria && correspondeBusca;
    });
  }, [busca, categoria]);

  function limparFiltros() {
    setBusca('');
    setCategoria('Todas');
  }

  return (
    <main className="duvidas-page">
      <div className="duvidas-container">
        <header className="duvidas-header">
          <button
            type="button"
            className="duvidas-back"
            onClick={() => navigate('/inicio')}
            aria-label="Voltar ao início"
          >
            <ArrowLeft size={24} />
          </button>

          <h1>Tire suas dúvidas</h1>
          <span className="duvidas-header-spacer" aria-hidden="true" />
        </header>

        <section className="duvidas-hero" aria-labelledby="duvidas-hero-title">
          <div className="duvidas-hero-texto">
            <span className="duvidas-eyebrow">
              <HelpCircle size={17} />
              Cuidar também é entender
            </span>

            <h2 id="duvidas-hero-title">Respostas para suas perguntas</h2>
            <p>
              Reunimos dúvidas frequentes sobre HPV, exames,
              prevenção, vacinação e atendimento pelo SUS.
            </p>
          </div>

          {imagemDuvidas && (
            <div className="duvidas-hero-imagem">
              <img
                src={imagemDuvidas}
                alt="Ilustração acolhedora sobre informação e saúde preventiva"
              />
            </div>
          )}
        </section>

        <section className="duvidas-pesquisa" aria-label="Pesquisar dúvidas">
          <div className="duvidas-pesquisa-titulo">
            <div>
              <h2>O que você gostaria de saber?</h2>
              <p>Busque uma palavra ou escolha um assunto abaixo.</p>
            </div>
            <BookOpen size={24} aria-hidden="true" />
          </div>

          <div className="duvidas-search">
            <Search size={21} aria-hidden="true" />
            <input
              type="search"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              placeholder="Ex.: vacina, exame, HPV..."
              aria-label="Buscar nas perguntas frequentes"
            />
            {busca && (
              <button
                type="button"
                aria-label="Limpar pesquisa"
                onClick={() => setBusca('')}
              >
                <X size={19} />
              </button>
            )}
          </div>

          <div className="duvidas-filtros" role="group" aria-label="Filtrar por assunto">
            {(['Todas', ...categoriasDuvidas] as FiltroCategoria[]).map(
              (opcao) => (
                <button
                  key={opcao}
                  type="button"
                  className={
                    categoria === opcao
                      ? 'duvidas-filtro duvidas-filtro-ativo'
                      : 'duvidas-filtro'
                  }
                  aria-pressed={categoria === opcao}
                  onClick={() => setCategoria(opcao)}
                >
                  {opcao}
                </button>
              )
            )}
          </div>
        </section>

        <section className="duvidas-resultados" aria-labelledby="duvidas-lista-titulo">
          <div className="duvidas-lista-cabecalho">
            <h2 id="duvidas-lista-titulo">Perguntas frequentes</h2>
            <span aria-live="polite">
              {perguntasFiltradas.length} de {duvidasFrequentes.length}
            </span>
          </div>

          {perguntasFiltradas.length > 0 ? (
            <div className="duvidas-lista">
              {perguntasFiltradas.map((duvida) => (
                <details key={duvida.id} className="duvidas-item">
                  <summary>
                    <span className="duvidas-pergunta-conteudo">
                      <span className="duvidas-categoria">{duvida.categoria}</span>
                      <strong>{duvida.pergunta}</strong>
                    </span>
                    <ChevronDown
                      className="duvidas-chevron"
                      size={21}
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="duvidas-resposta">
                    <p>{duvida.resposta}</p>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <div className="duvidas-vazio">
              <HelpCircle size={34} aria-hidden="true" />
              <h3>Nenhuma pergunta encontrada</h3>
              <p>Tente outra palavra ou remova os filtros.</p>
              <button type="button" onClick={limparFiltros}>
                Mostrar todas as perguntas
              </button>
            </div>
          )}
        </section>

        <aside className="duvidas-aviso">
          <ShieldCheck size={25} aria-hidden="true" />
          <p>
            Este conteúdo é educativo e não substitui uma consulta.
            Se você tem sintomas, recebeu um resultado alterado ou precisa
            de orientação para seu caso, procure uma equipe de saúde.
          </p>
        </aside>

        <section className="duvidas-links" aria-labelledby="duvidas-links-titulo">
          <div className="duvidas-links-titulo">
            <HeartHandshake size={24} aria-hidden="true" />
            <h2 id="duvidas-links-titulo">Continue se informando</h2>
          </div>
          <div className="duvidas-links-grid">
            <Link to="/exames">Exames e rastreamento</Link>
            <Link to="/vacina-hpv">Vacina HPV</Link>
            <Link to="/exames/onde-realizar">Onde realizar?</Link>
          </div>
        </section>

        <footer className="duvidas-footer">
          <p>Informações gerais. Verifique sempre as orientações atuais do SUS.</p>
          <h3>Fontes oficiais</h3>
          <div className="duvidas-fontes">
            {fontesDuvidas.map((fonte) => (
              <a
                key={fonte.url}
                href={fonte.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {fonte.nome}
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
