import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Copy,
  Heart,
  Info,
  MessageCircle,
  Search,
  Send,
  UserRound,
} from 'lucide-react';

import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import {
  contatosChat,
  mensagensProntas,
  normalizarWhatsapp,
  obterFotoContato,
  whatsappProjeto,
  type ContatoChat,
} from '../../data/contatosChat';
import './ChatPage.css';

function normalizarBusca(valor: string) {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  const primeiro = partes[0]?.[0] ?? '';
  const ultimo = partes.length > 1 ? partes[partes.length - 1]?.[0] ?? '' : partes[0]?.[1] ?? '';
  return `${primeiro}${ultimo}`.toUpperCase();
}

function Avatar({ contato, grande = false }: { contato: ContatoChat; grande?: boolean }) {
  const [falhou, setFalhou] = useState(false);
  const foto = obterFotoContato(contato.fotoArquivo);

  useEffect(() => setFalhou(false), [foto]);

  return (
    <span className={`chat-avatar${grande ? ' chat-avatar--grande' : ''}`} aria-hidden="true">
      {foto && !falhou ? (
        <img src={foto} alt="" onError={() => setFalhou(true)} />
      ) : (
        <span>{iniciais(contato.nome)}</span>
      )}
    </span>
  );
}

export default function ChatPage() {
  const { contatoId } = useParams<{ contatoId: string }>();
  const [busca, setBusca] = useState('');
  const [mensagemId, setMensagemId] = useState<string | null>(null);
  const [avisoCopia, setAvisoCopia] = useState('');

  const contatoSelecionado = contatosChat.find((contato) => contato.id === contatoId);
  const contatoInvalido = Boolean(contatoId && !contatoSelecionado);

  const contatosFiltrados = useMemo(() => {
    const termo = normalizarBusca(busca.trim());
    if (!termo) return contatosChat;
    return contatosChat.filter((contato) =>
      normalizarBusca(`${contato.nome} ${contato.funcao} ${contato.tema}`).includes(termo)
    );
  }, [busca]);

  useEffect(() => {
    setMensagemId(null);
    setAvisoCopia('');
  }, [contatoId]);

  const mensagemSelecionada = mensagensProntas.find((mensagem) => mensagem.id === mensagemId);
  const textoPronto = contatoSelecionado && mensagemSelecionada
    ? `Olá, ${contatoSelecionado.nome}! ${mensagemSelecionada.texto}`
    : '';

  const numeroDestino = contatoSelecionado
    ? normalizarWhatsapp(contatoSelecionado.whatsapp?.trim() || whatsappProjeto.trim())
    : null;

  const urlWhatsapp = numeroDestino && textoPronto
    ? `https://wa.me/${numeroDestino}?text=${encodeURIComponent(textoPronto)}`
    : null;

  async function copiarMensagem() {
    if (!textoPronto) return;
    try {
      await navigator.clipboard.writeText(textoPronto);
      setAvisoCopia('Mensagem copiada!');
    } catch {
      setAvisoCopia('Não foi possível copiar neste navegador.');
    }
  }

  return (
    <main className={`chat-page${contatoId ? ' chat-page--conversa' : ''}`}>
      <div className="chat-container">
        <header className="chat-page-header">
          <Link to="/inicio" className="chat-voltar-inicio" aria-label="Voltar ao início">
            <ArrowLeft size={22} />
          </Link>
          <div className="chat-page-titulos">
            <span className="chat-sobretitulo">CUIDA-SE · CONTATO</span>
            <h1>Conversas</h1>
            <p>Escolha uma integrante do projeto para preparar sua mensagem.</p>
          </div>
        </header>

        <div className="chat-layout">
          <section
            className={`chat-lista-painel${contatoId ? ' chat-lista-painel--oculto-mobile' : ''}`}
            aria-labelledby="chat-titulo-contatos"
          >
            <div className="chat-lista-topo">
              <div>
                <h2 id="chat-titulo-contatos">Equipe do projeto</h2>
                <p>Selecione um contato</p>
              </div>
              <span className="chat-total">{contatosChat.length}</span>
            </div>

            <label className="chat-busca">
              <Search size={19} aria-hidden="true" />
              <span className="chat-sr-only">Buscar contato pelo nome ou assunto</span>
              <input
                type="search"
                value={busca}
                onChange={(evento) => setBusca(evento.target.value)}
                placeholder="Buscar nome ou assunto..."
              />
            </label>

            <div className="chat-contatos">
              {contatosFiltrados.length ? contatosFiltrados.map((contato) => (
                <Link
                  key={contato.id}
                  to={`/chat/${contato.id}`}
                  className={`chat-contato-card${contatoSelecionado?.id === contato.id ? ' chat-contato-card--ativo' : ''}`}
                  aria-current={contatoSelecionado?.id === contato.id ? 'page' : undefined}
                >
                  <Avatar contato={contato} />
                  <div className="chat-contato-dados">
                    <h3>{contato.nome}</h3>
                    <span className="chat-funcao">{contato.funcao}</span>
                    <p>{contato.tema}</p>
                  </div>
                  <span className="chat-contato-acao">
                    <span>Conversar</span>
                    <ChevronRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              )) : (
                <p className="chat-vazio-busca">Nenhum contato encontrado.</p>
              )}
            </div>
            <p className="chat-lista-aviso">
              <Info size={15} aria-hidden="true" />
              Contatos educativos do projeto. Não substituem atendimento profissional.
            </p>
          </section>

          <section
            className={`chat-detalhe-painel${!contatoId ? ' chat-detalhe-painel--oculto-mobile' : ''}`}
            aria-label="Conversa com mensagens prontas"
          >
            {contatoSelecionado ? (
              <>
                <header className="chat-detalhe-cabecalho">
                  <Link to="/chat" className="chat-detalhe-voltar" aria-label="Voltar aos contatos">
                    <ArrowLeft size={22} />
                  </Link>
                  <Avatar contato={contatoSelecionado} grande />
                  <div className="chat-detalhe-identificacao">
                    <h2>{contatoSelecionado.nome}</h2>
                    <p>{contatoSelecionado.funcao}</p>
                  </div>
                  <span className="chat-cabecalho-simbolo" aria-hidden="true">
                    <Heart size={18} />
                  </span>
                </header>

                <div className="chat-conversa-corpo" aria-live="polite">
                  <span className="chat-dia">Mensagem para WhatsApp</span>

                  <div className="chat-bolha-aplicativo">
                    <span className="chat-avatar-app" aria-hidden="true"><Heart size={16} /></span>
                    <div className="chat-mensagem-app">
                      <span className="chat-origem">Cuida-se</span>
                      <p>Olá! 💛 Escolha uma mensagem pronta abaixo para entrar em contato pelo WhatsApp.</p>
                    </div>
                  </div>

                  {mensagemSelecionada && (
                    <div className="chat-bolha-usuario">
                      <p>{textoPronto}</p>
                      <small>Prévia · não enviada <Check size={13} aria-hidden="true" /></small>
                    </div>
                  )}
                </div>

                <div className="chat-compositor">
                  <p className="chat-compositor-titulo">Mensagens rápidas</p>
                  <div className="chat-rapidas" role="group" aria-label="Escolha uma dúvida pronta">
                    {mensagensProntas.map((mensagem) => (
                      <button
                        type="button"
                        key={mensagem.id}
                        className={`chat-chip${mensagem.id === mensagemId ? ' chat-chip--ativa' : ''}`}
                        aria-pressed={mensagem.id === mensagemId}
                        onClick={() => {
                          setMensagemId(mensagem.id);
                          setAvisoCopia('');
                        }}
                      >
                        {mensagem.titulo}
                      </button>
                    ))}
                  </div>

                  <div className="chat-envio-barra">
                    <button
                      type="button"
                      className="chat-copiar"
                      onClick={copiarMensagem}
                      disabled={!mensagemSelecionada}
                      aria-label="Copiar mensagem escolhida"
                      title="Copiar mensagem"
                    >
                      <Copy size={19} />
                    </button>

                    <span className="chat-envio-texto">
                      {mensagemSelecionada ? mensagemSelecionada.titulo : 'Escolha uma dúvida acima...'}
                    </span>

                    {urlWhatsapp ? (
                      <a
                        href={urlWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chat-enviar"
                        aria-label="Abrir mensagem no WhatsApp"
                        title="Abrir WhatsApp"
                      >
                        <Send size={19} />
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="chat-enviar chat-enviar--inativo"
                        disabled
                        title={!mensagemSelecionada ? 'Escolha uma dúvida primeiro' : 'Cadastre o WhatsApp do projeto'}
                        aria-label="Envio indisponível"
                      >
                        <Send size={19} />
                      </button>
                    )}
                  </div>

                  {mensagemSelecionada && (
                    <p className="chat-aviso-envio" role="status">
                      {avisoCopia || (!numeroDestino
                        ? 'WhatsApp ainda não configurado. Você pode copiar a mensagem.'
                        : 'Ao abrir o WhatsApp, confirme o envio por lá.')}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="chat-nenhum-selecionado">
                <UserRound size={34} aria-hidden="true" />
                <h2>{contatoInvalido ? 'Contato não encontrado' : 'Selecione um contato'}</h2>
                <p>{contatoInvalido
                  ? 'Volte à lista para escolher outro contato.'
                  : 'Escolha alguém da equipe para visualizar as mensagens rápidas.'}</p>
                {contatoInvalido && <Link to="/chat">Voltar aos contatos</Link>}
              </div>
            )}
          </section>
        </div>
      </div>
      {!contatoId && <BottomNavigation />}
    </main>
  );
}
