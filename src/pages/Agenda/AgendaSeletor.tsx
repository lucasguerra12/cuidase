import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import './AgendaSeletor.css';

export type OpcaoAgenda = {
  valor: string;
  texto: string;
};

type Props = {
  id: string;
  titulo: string;
  valor: string;
  opcoes: OpcaoAgenda[];
  aoAlterar: (valor: string) => void;
  placeholder?: string;
  permitirBusca?: boolean;
};

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function AgendaSeletor({
  id,
  titulo,
  valor,
  opcoes,
  aoAlterar,
  placeholder = 'Selecione uma opção',
  permitirBusca = false,
}: Props) {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const tituloId = useId();
  const disparadorRef = useRef<HTMLButtonElement>(null);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const buscaRef = useRef<HTMLInputElement>(null);
  const primeiraOpcaoRef = useRef<HTMLButtonElement>(null);

  const opcaoSelecionada = opcoes.find((opcao) => opcao.valor === valor);
  const filtradas = permitirBusca && busca.trim()
    ? opcoes.filter((opcao) => normalizar(opcao.texto).includes(normalizar(busca.trim())))
    : opcoes;

  useEffect(() => {
    if (!aberto) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const animacao = requestAnimationFrame(() => {
      if (permitirBusca) buscaRef.current?.focus();
      else primeiraOpcaoRef.current?.focus();
    });

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === 'Escape') {
        evento.preventDefault();
        setAberto(false);
      }

      if (evento.key !== 'Tab') return;
      const elementos = dialogoRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled])'
      );
      if (!elementos?.length) return;
      const primeiro = elementos[0];
      const ultimo = elementos[elementos.length - 1];

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }

    document.addEventListener('keydown', aoTeclar);
    return () => {
      cancelAnimationFrame(animacao);
      document.removeEventListener('keydown', aoTeclar);
      document.body.style.overflow = overflowAnterior;
      disparadorRef.current?.focus();
    };
  }, [aberto, permitirBusca]);

  function abrir() {
    setBusca('');
    setAberto(true);
  }

  function escolher(proximoValor: string) {
    aoAlterar(proximoValor);
    setAberto(false);
  }

  return (
    <div className="agenda-seletor-campo">
      <label className="agenda-seletor-label" htmlFor={id}>{titulo}</label>
      <button
        id={id}
        ref={disparadorRef}
        type="button"
        className={`agenda-seletor-botao${opcaoSelecionada ? ' agenda-seletor-botao--preenchido' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={aberto}
        onClick={abrir}
      >
        <span>{opcaoSelecionada?.texto ?? placeholder}</span>
        <ChevronDown aria-hidden="true" size={20} />
      </button>

      {aberto && createPortal(
        <div
          className="agenda-seletor-overlay"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) setAberto(false);
          }}
        >
          <div
            className="agenda-seletor-dialogo"
            ref={dialogoRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={tituloId}
          >
            <span className="agenda-seletor-alca" aria-hidden="true" />
            <header className="agenda-seletor-cabecalho">
              <div>
                <span className="agenda-seletor-sobretitulo">ESCOLHA UMA OPÇÃO</span>
                <h2 id={tituloId}>{titulo}</h2>
              </div>
              <button
                className="agenda-seletor-fechar"
                type="button"
                aria-label="Fechar opções"
                onClick={() => setAberto(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            {permitirBusca && (
              <div className="agenda-seletor-busca">
                <Search size={19} aria-hidden="true" />
                <input
                  ref={buscaRef}
                  type="search"
                  value={busca}
                  onChange={(evento) => setBusca(evento.target.value)}
                  placeholder="Buscar unidade pelo nome..."
                  aria-label="Buscar unidade pelo nome"
                />
              </div>
            )}

            <div className="agenda-seletor-lista" aria-label={titulo}>
              {filtradas.length === 0 ? (
                <p className="agenda-seletor-vazio">Nenhuma unidade encontrada. Tente outro nome.</p>
              ) : filtradas.map((opcao, indice) => {
                const selecionada = opcao.valor === valor;
                return (
                  <button
                    key={opcao.valor}
                    ref={indice === 0 ? primeiraOpcaoRef : undefined}
                    type="button"
                    className={`agenda-seletor-opcao${selecionada ? ' agenda-seletor-opcao--ativa' : ''}`}
                    aria-pressed={selecionada}
                    onClick={() => escolher(opcao.valor)}
                  >
                    <span>{opcao.texto}</span>
                    <span className="agenda-seletor-marca" aria-hidden="true">
                      {selecionada && <Check size={16} strokeWidth={2.5} />}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="agenda-seletor-rodape">
              {permitirBusca ? `${filtradas.length} unidade(s) na lista` : 'Toque para selecionar'}
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
