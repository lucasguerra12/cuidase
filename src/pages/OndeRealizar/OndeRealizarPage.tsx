import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock3,
  ExternalLink,
  Hospital,
  Info,
  MapPin,
  Phone,
  Search,
} from 'lucide-react';

import {
  cidadeReferencia,
  locaisAtendimento,
  type Regiao,
} from '../../data/locaisAtendimento';

import './OndeRealizarPage.css';

type FiltroRegiao = 'Todas' | Regiao;

const REGIOES: FiltroRegiao[] = [
  'Todas', 'Centro', 'Leste', 'Norte', 'Oeste', 'Sudeste', 'Sul', 'Avançadas',
];

// Tira acentos para buscas como "sao jose" ou "vila".
function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

function urlGoogleMaps(nome: string, endereco: string): string {
  const destino = [
    nome,
    endereco,
    cidadeReferencia.nome,
    cidadeReferencia.estado,
    cidadeReferencia.pais,
  ].join(', ');

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destino)}`;
}

const banners = import.meta.glob(
  '../../assets/images/onde-realizar-banner.{jpeg,jpg,png,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
) as Record<string, string>;

const imagemBanner = Object.values(banners)[0];

export default function OndeRealizarPage() {
  const [busca, setBusca] = useState('');
  const [regiao, setRegiao] = useState<FiltroRegiao>('Todas');

  const locaisFiltrados = useMemo(() => {
    const termo = normalizar(busca.trim());

    return locaisAtendimento.filter((local) => {
      const correspondeRegiao =
        regiao === 'Todas' || local.regiao === regiao;

      const texto = normalizar(
        `${local.nome} ${local.endereco} ${local.bairro} ${local.regiao}`,
      );

      return correspondeRegiao && texto.includes(termo);
    });
  }, [busca, regiao]);

  return (
    <main className="locais-page">
      <div className="locais-container">
        <header className="locais-header">
          <Link to="/exames" className="locais-voltar" aria-label="Voltar aos exames">
            <ArrowLeft size={23} />
          </Link>
          <h1>Onde realizar?</h1>
          <span aria-hidden="true" className="locais-header-espaco" />
        </header>

        <section className="locais-cidade" aria-label="Cidade de referência">
          <div className="locais-cidade-icone">
            <MapPin size={27} strokeWidth={1.8} />
          </div>
          <div className="locais-cidade-texto">
            <span>LOCALIZAÇÃO DE REFERÊNCIA</span>
            <strong>{cidadeReferencia.nome}, {cidadeReferencia.estado}</strong>
            <small>Localização fixa para esta demonstração</small>
          </div>
        </section>

        {imagemBanner && (
          <figure className="locais-banner">
            <img
              src={imagemBanner}
              alt="Ilustração acolhedora de uma unidade de saúde"
            />
          </figure>
        )}

        <section className="locais-introducao">
          <h2>Encontre uma unidade de saúde</h2>
          <p>
            As Unidades Básicas de Saúde (UBS) são um ponto de partida
            para orientações sobre prevenção e rastreamento do câncer
            do colo do útero. Escolha uma unidade e confirme como é o atendimento.
          </p>
        </section>

        <div className="locais-aviso" role="note">
          <Info size={20} aria-hidden="true" />
          <p>
            Lista demonstrativa, sem consulta em tempo real. Estar nesta lista
            não garante coleta de Papanicolau ou teste DNA-HPV na unidade.
            Confirme disponibilidade e agendamento antes de ir.
          </p>
        </div>

        <section className="locais-busca" aria-label="Pesquisar locais de atendimento">
          <label htmlFor="locais-pesquisa">Buscar pelo nome, bairro ou endereço</label>
          <div className="locais-campo-busca">
            <Search size={20} aria-hidden="true" />
            <input
              id="locais-pesquisa"
              type="search"
              placeholder="Ex.: Centro ou Vista Verde"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />
          </div>

          <p className="locais-filtro-titulo">Filtrar por região</p>
          <div className="locais-filtros" role="group" aria-label="Região">
            {REGIOES.map((item) => (
              <button
                key={item}
                type="button"
                className={regiao === item ? 'locais-chip ativo' : 'locais-chip'}
                aria-pressed={regiao === item}
                onClick={() => setRegiao(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="locais-resultados" aria-label="Unidades cadastradas">
          <div className="locais-resultados-topo">
            <h2>Unidades cadastradas</h2>
            <span>{locaisFiltrados.length} {locaisFiltrados.length === 1 ? 'local' : 'locais'}</span>
          </div>

          {locaisFiltrados.length === 0 ? (
            <div className="locais-vazio">
              <Hospital size={34} aria-hidden="true" />
              <h3>Nenhuma unidade encontrada</h3>
              <p>
                {locaisAtendimento.length === 0
                  ? 'A lista de locais ainda será preenchida.'
                  : 'Tente outro nome, bairro ou região.'}
              </p>
              {locaisAtendimento.length > 0 && (
                <button type="button" onClick={() => { setBusca(''); setRegiao('Todas'); }}>
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="locais-lista">
              {locaisFiltrados.map((local) => (
                <article className="locais-card" key={local.id}>
                  <div className="locais-card-topo">
                    <div className="locais-card-icone">
                      <Hospital size={25} strokeWidth={1.7} />
                    </div>
                    <div className="locais-card-titulo">
                      <h3>{local.nome}</h3>
                      <span>{local.regiao === 'Avançadas' ? 'Unidade Avançada' : `UBS · Região ${local.regiao}`}</span>
                    </div>
                  </div>

                  <div className="locais-card-dados">
                    <p><MapPin size={18} /> <span>{local.endereco}, {local.bairro} — {cidadeReferencia.nome}/{cidadeReferencia.estado}</span></p>
                    {local.horario && <p><Clock3 size={18} /> <span>{local.horario}</span></p>}
                    {local.telefone && <p><Phone size={18} /> <span>{local.telefone}</span></p>}
                  </div>

                  {local.observacao && <p className="locais-card-obs">{local.observacao}</p>}

                  <a
                    className="locais-mapa-link"
                    href={urlGoogleMaps(local.nome, local.endereco)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver ${local.nome} no Google Maps`}
                  >
                    Ver no Google Maps
                    <ExternalLink size={17} />
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="locais-rodape">
          <p>As informações podem mudar. Confirme diretamente com a unidade.</p>
          <a
            href="https://www.sjc.sp.gov.br/servicos/saude/unidades-basicas-de-saude-ubs/unidades-basicas-de-saude/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar lista oficial de UBSs da Prefeitura <ExternalLink size={15} />
          </a>
        </footer>
      </div>
    </main>
  );
}
