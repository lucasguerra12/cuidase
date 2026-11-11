import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, X } from 'lucide-react';
import './SeletorOpcao.css';

type Opcao = {
  value: string;
  label: string;
};

type SeletorOpcaoProps = {
  id: string;
  label: string;
  value: string;
  options: Opcao[];
  onChange: (value: string) => void;
  placeholder?: string;
  invalido?: boolean;
};

/**
 * Substitui o menu nativo do <select> por uma janela adaptada a toque.
 * No celular, ela aparece na parte inferior; no desktop, centralizada.
 */
export default function SeletorOpcao({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = 'Selecione uma opção',
  invalido = false,
}: SeletorOpcaoProps) {
  const [aberto, setAberto] = useState(false);
  const tituloId = useId();
  const botaoRef = useRef<HTMLButtonElement>(null);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const opcaoFocoRef = useRef<HTMLButtonElement>(null);

  const selecionada = options.find((opcao) => opcao.value === value);

  useEffect(() => {
    if (!aberto) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    opcaoFocoRef.current?.focus();

    function aoPressionarTecla(evento: KeyboardEvent) {
      if (evento.key === 'Escape') {
        evento.preventDefault();
        setAberto(false);
        return;
      }

      if (evento.key !== 'Tab') return;

      const botoes = dialogoRef.current?.querySelectorAll<HTMLButtonElement>(
        '[data-foco-modal]'
      );
      if (!botoes?.length) return;

      const primeiro = botoes[0];
      const ultimo = botoes[botoes.length - 1];

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }

    document.addEventListener('keydown', aoPressionarTecla);

    return () => {
      document.removeEventListener('keydown', aoPressionarTecla);
      document.body.style.overflow = overflowAnterior;
      botaoRef.current?.focus();
    };
  }, [aberto]);

  function escolher(valor: string) {
    onChange(valor);
    setAberto(false);
  }

  return (
    <div className="seletor-campo">
      <label className="seletor-label" htmlFor={id}>
        {label}
      </label>

      <button
        ref={botaoRef}
        id={id}
        type="button"
        className={`seletor-gatilho${selecionada ? ' seletor-gatilho--preenchido' : ''}`}
        aria-haspopup="dialog"
        aria-expanded={aberto}
        aria-invalid={invalido && !value ? true : undefined}
        aria-required="true"
        onClick={() => setAberto(true)}
      >
        <span>{selecionada?.label ?? placeholder}</span>
        <ChevronDown size={20} aria-hidden="true" />
      </button>

      {aberto && createPortal(
        <div
          className="seletor-sobreposicao"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget) {
              setAberto(false);
            }
          }}
        >
          <div
            className="seletor-dialogo"
            ref={dialogoRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={tituloId}
          >
            <div className="seletor-alca" aria-hidden="true" />

            <div className="seletor-cabecalho">
              <div>
                <p className="seletor-microtitulo">ESCOLHA UMA OPÇÃO</p>
                <h2 id={tituloId}>{label}</h2>
              </div>
              <button
                type="button"
                className="seletor-fechar"
                aria-label="Fechar opções"
                data-foco-modal
                onClick={() => setAberto(false)}
              >
                <X size={21} aria-hidden="true" />
              </button>
            </div>

            <div className="seletor-opcoes" role="group" aria-label={label}>
              {options.map((opcao, indice) => {
                const ativa = opcao.value === value;
                const focoInicial = ativa || (!selecionada && indice === 0);

                return (
                  <button
                    key={opcao.value}
                    ref={focoInicial ? opcaoFocoRef : undefined}
                    type="button"
                    className={`seletor-opcao${ativa ? ' seletor-opcao--ativa' : ''}`}
                    aria-pressed={ativa}
                    data-foco-modal
                    onClick={() => escolher(opcao.value)}
                  >
                    <span className="seletor-opcao-texto">{opcao.label}</span>
                    <span className="seletor-indicador" aria-hidden="true">
                      {ativa && <Check size={16} strokeWidth={2.5} />}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="seletor-ajuda">Toque na opção desejada para continuar.</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
