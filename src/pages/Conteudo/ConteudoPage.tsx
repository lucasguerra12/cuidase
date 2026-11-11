import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  Dna,
  HeartPulse,
  MapPin,
  MessageCircleQuestion,
  Search,
  ShieldCheck,
  Syringe,
  X,
  type LucideIcon,
} from 'lucide-react';

import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import {
  bibliotecaConteudos,
  type CategoriaBiblioteca,
  type IconeBiblioteca,
} from '../../data/bibliotecaConteudos';
import './ConteudoPage.css';

const icones: Record<IconeBiblioteca, LucideIcon> = {
  coracao: HeartPulse,
  exames: ClipboardCheck,
  papanicolau: BookOpen,
  dna: Dna,
  calendario: CalendarDays,
  vacina: Syringe,
  localizacao: MapPin,
  duvidas: MessageCircleQuestion,
};

const categorias: Array<'Todos' | CategoriaBiblioteca> = [
  'Todos',
  'Prevenção',
  'Exames',
  'Vacinação',
  'Atendimento',
  'Dúvidas',
];

function normalizarTexto(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

export default function ConteudoPage() {
  const [pesquisa, setPesquisa] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState<'Todos' | CategoriaBiblioteca>('Todos');

  const resultados = useMemo(() => {
    const termo = normalizarTexto(pesquisa.trim());

    return bibliotecaConteudos.filter((item) => {
      const categoriaCorreta = categoriaAtiva === 'Todos' || item.categoria === categoriaAtiva;
      const texto = normalizarTexto(`${item.titulo} ${item.descricao} ${item.categoria}`);
      return categoriaCorreta && (!termo || texto.includes(termo));
    });
  }, [pesquisa, categoriaAtiva]);

  return (
    <main className="conteudo-page">
      <div className="conteudo-container">
        <header className="conteudo-header">
          <Link className="conteudo-voltar" to="/inicio" aria-label="Voltar ao início">
            <ArrowLeft size={23} />
          </Link>
          <h1>Conteúdo</h1>
          <span aria-hidden="true" />
        </header>

        <section className="conteudo-hero">
          <span className="conteudo-hero-icone" aria-hidden="true"><BookOpen size={30} /></span>
          <div>
            <p className="conteudo-hero-etiqueta">BIBLIOTECA DO CUIDA-SE</p>
            <h2>Conhecimento também é cuidado</h2>
            <p>Explore os materiais do aplicativo em um só lugar, no seu ritmo.</p>
          </div>
        </section>

        <Link className="conteudo-comecar" to="/sobre">
          <span className="conteudo-comecar-icone"><HeartPulse size={26} /></span>
          <span className="conteudo-comecar-texto">
            <small>POR ONDE COMEÇAR?</small>
            <strong>Entenda o câncer do colo do útero</strong>
            <span>Um primeiro passo para conhecer a prevenção.</span>
          </span>
          <ChevronRight size={22} aria-hidden="true" />
        </Link>

        <section className="conteudo-biblioteca" aria-labelledby="conteudo-biblioteca-titulo">
          <div className="conteudo-secao-cabecalho">
            <h2 id="conteudo-biblioteca-titulo">Explore os temas</h2>
            <span>{resultados.length} {resultados.length === 1 ? 'material' : 'materiais'}</span>
          </div>

          <div className="conteudo-busca">
            <Search size={19} aria-hidden="true" />
            <label htmlFor="conteudo-buscar" className="conteudo-sr-only">Buscar conteúdo</label>
            <input
              id="conteudo-buscar"
              type="search"
              placeholder="Buscar HPV, exames, vacina..."
              value={pesquisa}
              onChange={(evento) => setPesquisa(evento.target.value)}
            />
            {pesquisa && (
              <button type="button" onClick={() => setPesquisa('')} aria-label="Limpar busca">
                <X size={18} />
              </button>
            )}
          </div>

          <div className="conteudo-filtros" role="group" aria-label="Filtrar por assunto">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                type="button"
                className={`conteudo-filtro${categoriaAtiva === categoria ? ' conteudo-filtro--ativo' : ''}`}
                aria-pressed={categoriaAtiva === categoria}
                onClick={() => setCategoriaAtiva(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>

          {resultados.length ? (
            <div className="conteudo-grid">
              {resultados.map((item) => {
                const Icone = icones[item.icone];
                return (
                  <Link className="conteudo-card" to={item.rota} key={item.id}>
                    <span className="conteudo-card-icone" aria-hidden="true"><Icone size={25} strokeWidth={1.7} /></span>
                    <span className="conteudo-card-corpo">
                      <small>{item.categoria}</small>
                      <strong>{item.titulo}</strong>
                      <span>{item.descricao}</span>
                    </span>
                    <ChevronRight className="conteudo-card-seta" size={21} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="conteudo-vazio">
              <Search size={29} aria-hidden="true" />
              <h3>Nenhum material encontrado</h3>
              <p>Tente outra palavra ou escolha a categoria Todos.</p>
              <button type="button" onClick={() => { setPesquisa(''); setCategoriaAtiva('Todos'); }}>
                Mostrar todos os conteúdos
              </button>
            </div>
          )}
        </section>

        <aside className="conteudo-aviso">
          <ShieldCheck size={23} aria-hidden="true" />
          <p>Os materiais são educativos. Em caso de sintomas, resultados alterados ou dúvidas pessoais, procure uma equipe de saúde.</p>
        </aside>
      </div>
      <BottomNavigation />
    </main>
  );
}
