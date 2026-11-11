import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, CalendarDays, ChevronLeft, ChevronRight,
  Clock3, MapPin, Plus, Pencil, Trash2,
  Syringe, ClipboardCheck, Stethoscope, CheckCircle2, Info,
} from 'lucide-react';
import { locaisAtendimento } from '../../data/locaisAtendimento';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import AgendaSeletor, { type OpcaoAgenda } from './AgendaSeletor';
import './AgendaPage.css';

type TipoCompromisso = 'vacina' | 'exame' | 'consulta';

type Compromisso = {
  id: string;
  data: string; // AAAA-MM-DD, em horário local
  tipo: TipoCompromisso;
  titulo: string;
  horario: string; // HH:mm
  unidadeId: string;
};

const CHAVE_AGENDA = 'cuidaSe:agenda:v1';
const semana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const tipos: OpcaoAgenda[] = [
  { valor: 'vacina', texto: 'Vacina' },
  { valor: 'exame', texto: 'Exame' },
  { valor: 'consulta', texto: 'Consulta' },
];

// Utiliza a mesma lista da tela "Onde realizar?", sem duplicar dados.
const unidades: OpcaoAgenda[] = [...locaisAtendimento]
  .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
  .map((local) => ({ valor: local.id, texto: local.nome }));

function dataISO(data: Date) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function dataLegivel(iso: string) {
  const [ano, mes, dia] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(ano, mes - 1, dia));
}

function dataValida(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const [ano, mes, dia] = iso.split('-').map(Number);
  const data = new Date(ano, mes - 1, dia);
  return data.getFullYear() === ano && data.getMonth() === mes - 1 && data.getDate() === dia;
}

function horarioValido(horario: string) {
  if (!/^\d{2}:\d{2}$/.test(horario)) return false;
  const [hora, minuto] = horario.split(':').map(Number);
  return hora >= 0 && hora <= 23 && minuto >= 0 && minuto <= 59;
}

function tipoValido(valor: unknown): valor is TipoCompromisso {
  return valor === 'vacina' || valor === 'exame' || valor === 'consulta';
}

function lerCompromissos(): Compromisso[] {
  try {
    const texto = localStorage.getItem(CHAVE_AGENDA);
    if (!texto) return [];
    const dados: unknown = JSON.parse(texto);
    if (!Array.isArray(dados)) return [];

    return dados.filter((item): item is Compromisso => {
      if (!item || typeof item !== 'object') return false;
      const registro = item as Partial<Compromisso>;
      return typeof registro.id === 'string'
        && typeof registro.data === 'string' && dataValida(registro.data)
        && typeof registro.titulo === 'string' && registro.titulo.trim().length >= 2
        && typeof registro.horario === 'string' && horarioValido(registro.horario)
        && tipoValido(registro.tipo)
        && typeof registro.unidadeId === 'string';
    });
  } catch {
    return [];
  }
}

function criarId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function iconeDoTipo(tipo: TipoCompromisso) {
  if (tipo === 'vacina') return Syringe;
  if (tipo === 'exame') return ClipboardCheck;
  return Stethoscope;
}

export default function AgendaPage() {
  const hoje = useMemo(() => dataISO(new Date()), []);
  const [mesVisivel, setMesVisivel] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [dataSelecionada, setDataSelecionada] = useState(hoje);
  const [compromissos, setCompromissos] = useState<Compromisso[]>(lerCompromissos);
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [edicaoId, setEdicaoId] = useState<string | null>(null);
  const [tipo, setTipo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [horario, setHorario] = useState('');
  const [unidadeId, setUnidadeId] = useState('');
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [avisoArmazenamento, setAvisoArmazenamento] = useState('');
  const [excluindoId, setExcluindoId] = useState<string | null>(null);
  const formularioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_AGENDA, JSON.stringify(compromissos));
      setAvisoArmazenamento('');
    } catch {
      setAvisoArmazenamento('Não foi possível salvar no navegador. Os dados podem desaparecer ao sair da página.');
    }
  }, [compromissos]);

  const compromissosDoDia = useMemo(
    () => compromissos.filter((item) => item.data === dataSelecionada)
      .sort((a, b) => a.horario.localeCompare(b.horario)),
    [compromissos, dataSelecionada]
  );

  const marcacoes = useMemo(() => {
    const quantidades = new Map<string, number>();
    for (const item of compromissos) {
      quantidades.set(item.data, (quantidades.get(item.data) ?? 0) + 1);
    }
    return quantidades;
  }, [compromissos]);

  const proximos = useMemo(() => {
    const agora = new Date();
    const limite = `${dataISO(agora)}T${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
    return compromissos
    .filter((item) => `${item.data}T${item.horario}` >= limite)
    .sort((a, b) => `${a.data}T${a.horario}`.localeCompare(`${b.data}T${b.horario}`))
    .slice(0, 3);
  }, [compromissos]);

  const ano = mesVisivel.getFullYear();
  const mes = mesVisivel.getMonth();
  const primeiroDiaSemana = (new Date(ano, mes, 1).getDay() + 6) % 7;
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const quantidadeCelulas = Math.ceil((primeiroDiaSemana + totalDias) / 7) * 7;
  const celulas = Array.from({ length: quantidadeCelulas }, (_, indice) => {
    const numero = indice - primeiroDiaSemana + 1;
    return numero >= 1 && numero <= totalDias ? numero : null;
  });

  const mesPorExtenso = new Intl.DateTimeFormat('pt-BR', {
    month: 'long', year: 'numeric',
  }).format(mesVisivel);

  function mostrarFormulario() {
    requestAnimationFrame(() => {
      formularioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function limparFormulario() {
    setEdicaoId(null);
    setTipo('');
    setTitulo('');
    setHorario('');
    setUnidadeId('');
    setErro('');
  }

  function selecionarDia(data: string) {
    setDataSelecionada(data);
    setMensagem('');
    setExcluindoId(null);
    limparFormulario();
    setFormularioAberto(true);
    mostrarFormulario();
  }

  function trocarMes(diferenca: number) {
    const proximo = new Date(ano, mes + diferenca, 1);
    setMesVisivel(proximo);
    setDataSelecionada(dataISO(proximo));
    setFormularioAberto(false);
    setMensagem('');
    setExcluindoId(null);
    limparFormulario();
  }

  function irParaHoje() {
    const agora = new Date();
    setMesVisivel(new Date(agora.getFullYear(), agora.getMonth(), 1));
    setDataSelecionada(dataISO(agora));
    setFormularioAberto(false);
    setMensagem('');
    limparFormulario();
  }

  function novoCompromisso() {
    limparFormulario();
    setFormularioAberto(true);
    setMensagem('');
    mostrarFormulario();
  }

  function editarCompromisso(item: Compromisso) {
    setDataSelecionada(item.data);
    setEdicaoId(item.id);
    setTipo(item.tipo);
    setTitulo(item.titulo);
    setHorario(item.horario);
    setUnidadeId(item.unidadeId);
    setErro('');
    setMensagem('');
    setFormularioAberto(true);
    mostrarFormulario();
  }

  function salvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const tituloLimpo = titulo.trim();

    if (!tipoValido(tipo) || tituloLimpo.length < 2 || tituloLimpo.length > 80
      || !horarioValido(horario) || !unidades.some((local) => local.valor === unidadeId)) {
      setErro('Preencha o tipo, um título de 2 a 80 caracteres, o horário e uma UBS.');
      return;
    }

    const novo: Compromisso = {
      id: edicaoId ?? criarId(),
      data: dataSelecionada,
      tipo,
      titulo: tituloLimpo,
      horario,
      unidadeId,
    };

    setCompromissos((anteriores) => edicaoId
      ? anteriores.map((item) => item.id === edicaoId ? novo : item)
      : [...anteriores, novo]
    );
    setMensagem(edicaoId ? 'Compromisso atualizado!' : 'Compromisso salvo no navegador!');
    setFormularioAberto(false);
    limparFormulario();
  }

  function excluir(id: string) {
    setCompromissos((anteriores) => anteriores.filter((item) => item.id !== id));
    setExcluindoId(null);
    if (edicaoId === id) {
      setFormularioAberto(false);
      limparFormulario();
    }
    setMensagem('Compromisso excluído.');
  }

  return (
    <main className="agenda-page">
      <div className="agenda-container">
        <header className="agenda-header">
          <Link to="/inicio" className="agenda-voltar" aria-label="Voltar ao início">
            <ArrowLeft size={23} aria-hidden="true" />
          </Link>
          <h1>Minha agenda</h1>
          <span aria-hidden="true" />
        </header>

        <section className="agenda-introducao">
          <div className="agenda-introducao-icon"><CalendarDays size={28} aria-hidden="true" /></div>
          <div>
            <span className="agenda-sobretitulo">SEU CUIDADO EM DIA</span>
            <h2>Planeje seus cuidados com carinho.</h2>
            <p>Escolha uma data no calendário e organize suas vacinas, exames e consultas.</p>
          </div>
        </section>

        <div className="agenda-layout">
          <section className="agenda-calendario-card" aria-labelledby="agenda-titulo-calendario">
            <div className="agenda-calendario-topo">
              <div>
                <span className="agenda-sobretitulo">CALENDÁRIO</span>
                <h2 id="agenda-titulo-calendario">{mesPorExtenso}</h2>
              </div>
              <div className="agenda-calendario-controles">
                <button type="button" onClick={() => trocarMes(-1)} aria-label="Mês anterior"><ChevronLeft size={22} /></button>
                <button type="button" onClick={() => trocarMes(1)} aria-label="Próximo mês"><ChevronRight size={22} /></button>
              </div>
            </div>

            <div className="agenda-calendario-grade" role="group" aria-label={`Dias de ${mesPorExtenso}`}>
              {semana.map((dia) => <span key={dia} className="agenda-dia-semana">{dia}</span>)}
              {celulas.map((dia, indice) => {
                if (dia === null) {
                  return <span className="agenda-dia-vazio" key={`vazio-${indice}`} aria-hidden="true" />;
                }
                const data = dataISO(new Date(ano, mes, dia));
                const selecionado = data === dataSelecionada;
                const atual = data === hoje;
                const quantidade = marcacoes.get(data) ?? 0;
                return (
                  <button
                    key={data}
                    type="button"
                    className={`agenda-dia${selecionado ? ' agenda-dia--selecionado' : ''}${atual ? ' agenda-dia--hoje' : ''}`}
                    aria-pressed={selecionado}
                    aria-label={`${dataLegivel(data)}${quantidade ? `, ${quantidade} compromisso(s)` : ''}`}
                    onClick={() => selecionarDia(data)}
                  >
                    <span>{dia}</span>
                    {quantidade > 0 && <span className="agenda-dia-ponto" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>

            <div className="agenda-legenda">
              <span><i className="agenda-legenda-ponto" /> Dia com compromisso</span>
              <button type="button" onClick={irParaHoje}>Ir para hoje</button>
            </div>
          </section>

          <div className="agenda-painel-lateral">
            <section className="agenda-dia-card" aria-labelledby="agenda-dia-titulo">
              <div className="agenda-dia-cabecalho">
                <div>
                  <span className="agenda-sobretitulo">DATA SELECIONADA</span>
                  <h2 id="agenda-dia-titulo">{dataLegivel(dataSelecionada)}</h2>
                </div>
                <button type="button" className="agenda-adicionar" onClick={novoCompromisso}>
                  <Plus size={18} aria-hidden="true" /> Novo
                </button>
              </div>

              {mensagem && <p className="agenda-mensagem" role="status"><CheckCircle2 size={18} />{mensagem}</p>}
              {avisoArmazenamento && <p className="agenda-aviso" role="alert">{avisoArmazenamento}</p>}

              {compromissosDoDia.length === 0 ? (
                <div className="agenda-sem-compromissos">
                  <CalendarDays size={30} aria-hidden="true" />
                  <p>Nenhum compromisso neste dia.</p>
                  <span>Toque em uma data ou em “Novo” para cadastrar.</span>
                </div>
              ) : (
                <ul className="agenda-lista-compromissos">
                  {compromissosDoDia.map((item) => {
                    const Icone = iconeDoTipo(item.tipo);
                    const unidade = locaisAtendimento.find((local) => local.id === item.unidadeId);
                    return (
                      <li key={item.id} className="agenda-compromisso">
                        <div className="agenda-compromisso-icon"><Icone size={22} aria-hidden="true" /></div>
                        <div className="agenda-compromisso-info">
                          <span className="agenda-compromisso-tipo">{item.tipo}</span>
                          <h3>{item.titulo}</h3>
                          <p><Clock3 size={15} aria-hidden="true" /> {item.horario}</p>
                          <p><MapPin size={15} aria-hidden="true" /> {unidade?.nome ?? 'Unidade não encontrada'}</p>
                        </div>
                        <div className="agenda-compromisso-acoes">
                          <button type="button" aria-label={`Editar ${item.titulo}`} onClick={() => editarCompromisso(item)}><Pencil size={17} /></button>
                          <button type="button" aria-label={`Excluir ${item.titulo}`} onClick={() => setExcluindoId(item.id)}><Trash2 size={17} /></button>
                        </div>
                        {excluindoId === item.id && (
                          <div className="agenda-confirmacao">
                            <span>Excluir este compromisso?</span>
                            <div>
                              <button type="button" onClick={() => setExcluindoId(null)}>Cancelar</button>
                              <button type="button" className="agenda-confirmar-exclusao" onClick={() => excluir(item.id)}>Excluir</button>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {formularioAberto && (
              <section className="agenda-form-card" ref={formularioRef} aria-labelledby="agenda-form-titulo">
                <div className="agenda-form-cabecalho">
                  <div>
                    <span className="agenda-sobretitulo">ORGANIZAÇÃO PESSOAL</span>
                    <h2 id="agenda-form-titulo">{edicaoId ? 'Editar compromisso' : 'Novo compromisso'}</h2>
                  </div>
                  <button type="button" onClick={() => { setFormularioAberto(false); limparFormulario(); }} className="agenda-fechar-form">Cancelar</button>
                </div>
                <p className="agenda-form-data">{dataLegivel(dataSelecionada)}</p>

                <form className="agenda-formulario" onSubmit={salvar}>
                  <AgendaSeletor
                    id="agenda-tipo"
                    titulo="Tipo de compromisso"
                    valor={tipo}
                    opcoes={tipos}
                    aoAlterar={setTipo}
                    placeholder="Vacina, exame ou consulta"
                  />

                  <div className="agenda-form-campo">
                    <label htmlFor="agenda-titulo">Título</label>
                    <input
                      id="agenda-titulo"
                      type="text"
                      maxLength={80}
                      minLength={2}
                      required
                      placeholder="Ex.: Papanicolau anual"
                      value={titulo}
                      onChange={(evento) => setTitulo(evento.target.value)}
                    />
                  </div>

                  <div className="agenda-form-campo">
                    <label htmlFor="agenda-horario">Horário</label>
                    <input
                      id="agenda-horario"
                      type="time"
                      required
                      value={horario}
                      onChange={(evento) => setHorario(evento.target.value)}
                    />
                  </div>

                  <AgendaSeletor
                    id="agenda-ubs"
                    titulo="Unidade de saúde (UBS)"
                    valor={unidadeId}
                    opcoes={unidades}
                    aoAlterar={setUnidadeId}
                    placeholder="Escolha uma UBS"
                    permitirBusca
                  />

                  {erro && <p className="agenda-form-erro" role="alert">{erro}</p>}
                  <button type="submit" className="agenda-salvar"><CheckCircle2 size={19} />{edicaoId ? 'Salvar alterações' : 'Salvar compromisso'}</button>
                </form>
              </section>
            )}
          </div>
        </div>

        <section className="agenda-proximos" aria-labelledby="agenda-proximos-titulo">
          <div className="agenda-proximos-topo">
            <h2 id="agenda-proximos-titulo">Próximos cuidados</h2>
            <span>{compromissos.length} compromisso(s) cadastrado(s)</span>
          </div>
          {proximos.length === 0 ? (
            <p>Seus próximos compromissos aparecerão aqui.</p>
          ) : (
            <ul>
              {proximos.map((item) => (
                <li key={item.id}>
                  <span>{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(
                    new Date(Number(item.data.slice(0, 4)), Number(item.data.slice(5, 7)) - 1, Number(item.data.slice(8, 10)))
                  )}</span>
                  <strong>{item.titulo}</strong>
                  <small>{item.horario}</small>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="agenda-nota">
          <Info size={20} aria-hidden="true" />
          <p>
            Esta é uma agenda pessoal, não um agendamento na rede de saúde.
            Confirme data, horário e atendimento com a UBS. Os registros ficam
            salvos apenas neste navegador; evite incluir informações sensíveis em dispositivos compartilhados.
          </p>
        </aside>
      </div>
      <BottomNavigation />
    </main>
  );
}
