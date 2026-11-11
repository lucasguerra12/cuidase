import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarCheck2,
  ChevronRight,
  ClipboardList,
  HeartHandshake,
  Info,
  ShieldCheck,
} from 'lucide-react';
import './FrequenciaPage.css';
import SeletorOpcao from './SeletorOpcao';

// A imagem é opcional: o projeto funciona mesmo antes de você gerá-la.
const imagens = import.meta.glob(
  '../../assets/images/frequencia-exames.{jpeg,jpg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;
const imagemFrequencia = Object.values(imagens)[0];

type Resposta = '' | 'sim' | 'nao' | 'naosei';
type UltimoExame =
  | ''
  | 'dna-negativo'
  | 'papa-dois-normais'
  | 'papa-um-normal'
  | 'alterado'
  | 'nunca'
  | 'naosei';

type Resultado = {
  categoria: 'rotina' | 'atencao' | 'orientacao';
  titulo: string;
  texto: string;
  proximoPasso: string;
};

type Respostas = {
  idade: number;
  coloUtero: Resposta;
  atividadeSexual: Resposta;
  ultimoExame: UltimoExame;
  sintomas: boolean;
  historicoAlteracoes: boolean;
  imunossupressao: boolean;
  condicaoEspecial: boolean;
};

function avaliarRespostas(dados: Respostas): Resultado {
  const orientacao = (
    titulo: string,
    texto: string,
    proximoPasso: string
  ): Resultado => ({ categoria: 'orientacao', titulo, texto, proximoPasso });

  const atencao = (
    titulo: string,
    texto: string,
    proximoPasso: string
  ): Resultado => ({ categoria: 'atencao', titulo, texto, proximoPasso });

  if (dados.sintomas) {
    return atencao(
      'Procure uma avaliação de saúde',
      'Sintomas como sangramento vaginal fora do habitual precisam ser avaliados. O rastreamento é destinado principalmente a pessoas sem sintomas; não é adequado aguardar o próximo exame de rotina.',
      'Procure uma Unidade Básica de Saúde (UBS) ou outro serviço de saúde para avaliação.'
    );
  }

  if (
    dados.historicoAlteracoes ||
    dados.imunossupressao ||
    dados.condicaoEspecial ||
    dados.ultimoExame === 'alterado'
  ) {
    return atencao(
      'Seu acompanhamento pode precisar ser diferente',
      'Resultados alterados ou HPV positivo, imunossupressão, gravidez e cirurgias ou tratamentos anteriores podem modificar os exames indicados e seus intervalos. Não é seguro calcular uma frequência apenas com estas respostas.',
      'Leve seus exames anteriores à equipe de saúde para receber orientação individualizada.'
    );
  }

  if (dados.coloUtero !== 'sim') {
    return orientacao(
      'Confirme a necessidade de rastreamento',
      dados.coloUtero === 'nao'
        ? 'Após a retirada do colo do útero, a necessidade de acompanhamento depende do motivo da cirurgia e de possíveis lesões anteriores.'
        : 'Para orientar o rastreamento, é importante confirmar se você possui colo do útero e conhecer seu histórico clínico.',
      'Uma equipe de saúde poderá verificar se o rastreamento é indicado no seu caso.'
    );
  }

  if (dados.atividadeSexual !== 'sim') {
    return orientacao(
      'A recomendação depende do seu histórico',
      dados.atividadeSexual === 'nao'
        ? 'Pessoas que nunca tiveram atividade sexual geralmente não são incluídas no rastreamento de rotina do câncer do colo do útero.'
        : 'O histórico de atividade sexual faz parte dos critérios usados para oferecer o rastreamento de rotina.',
      'Converse com a equipe da UBS se tiver dúvidas ou alguma situação particular.'
    );
  }

  if (dados.idade < 25) {
    return orientacao(
      'Rastreamento de rotina geralmente não indicado nesta idade',
      'Para pessoas de risco habitual, o rastreamento do câncer do colo do útero no SUS geralmente começa aos 25 anos. Isso não impede uma avaliação clínica quando houver indicação.',
      'Mantenha os cuidados preventivos e converse com a UBS sobre vacinação contra HPV e outras orientações.'
    );
  }

  if (dados.idade >= 60) {
    return orientacao(
      'É importante avaliar o histórico de exames',
      dados.idade <= 64
        ? 'Entre 60 e 64 anos, a continuidade ou o encerramento do rastreamento depende dos exames anteriores. Em algumas situações, um teste DNA-HPV negativo após os 60 anos permite encerrar o rastreamento.'
        : 'Após os 64 anos, não é adequado decidir apenas pela idade. Pessoas sem rastreamento prévio adequado ou com histórico de alterações podem precisar de avaliação específica.',
      'Apresente seus resultados anteriores na UBS para decidir, com a equipe, se é necessário continuar.'
    );
  }

  if (dados.ultimoExame === 'dna-negativo') {
    return {
      categoria: 'rotina',
      titulo: 'Intervalo habitual: 5 anos',
      texto: 'Para pessoas de risco habitual, com teste DNA-HPV oncogênico negativo, a recomendação geral é repetir o rastreamento em cinco anos.',
      proximoPasso: 'O intervalo é contado a partir do exame realizado. Confirme a orientação e a disponibilidade do teste com a UBS.',
    };
  }

  if (dados.ultimoExame === 'papa-dois-normais') {
    return {
      categoria: 'rotina',
      titulo: 'Intervalo habitual: 3 anos',
      texto: 'Nos locais onde o Papanicolau ainda é utilizado, dois exames normais consecutivos, realizados com intervalo de um ano, permitem em geral repetir o rastreamento a cada três anos.',
      proximoPasso: 'Confirme o intervalo com a UBS, especialmente se o serviço já tiver adotado o teste DNA-HPV.',
    };
  }

  if (dados.ultimoExame === 'papa-um-normal') {
    return {
      categoria: 'rotina',
      titulo: 'Em geral, repetir em 1 ano',
      texto: 'Quando se utiliza Papanicolau e houve apenas um primeiro exame normal, recomenda-se um segundo exame após um ano. Se ambos forem normais, o intervalo habitual passa a ser de três anos.',
      proximoPasso: 'Confirme com a UBS se o próximo exame será Papanicolau ou DNA-HPV.',
    };
  }

  return orientacao(
    'Procure a UBS para organizar seu rastreamento',
    'Sem um resultado anterior conhecido, não é possível indicar um intervalo de repetição. O serviço pode orientar qual método de rastreamento está disponível e quando realizá-lo.',
    'Se tiver exames antigos, leve-os ao atendimento. Você não precisa esperar ter sintomas para conversar sobre rastreamento.'
  );
}

export default function FrequenciaPage() {
  const [idade, setIdade] = useState('');
  const [coloUtero, setColoUtero] = useState<Resposta>('');
  const [atividadeSexual, setAtividadeSexual] = useState<Resposta>('');
  const [ultimoExame, setUltimoExame] = useState<UltimoExame>('');
  const [sintomas, setSintomas] = useState(false);
  const [historicoAlteracoes, setHistoricoAlteracoes] = useState(false);
  const [imunossupressao, setImunossupressao] = useState(false);
  const [condicaoEspecial, setCondicaoEspecial] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState('');

  function limparResultado() {
    setResultado(null);
    setErro('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const idadeNumero = Number(idade);

    if (
      !idade.trim() || !Number.isInteger(idadeNumero) ||
      idadeNumero < 0 || idadeNumero > 120 ||
      !coloUtero || !atividadeSexual || !ultimoExame
    ) {
      setErro('Confira a idade e preencha as três perguntas obrigatórias.');
      setResultado(null);
      return;
    }

    setErro('');
    setResultado(avaliarRespostas({
      idade: idadeNumero,
      coloUtero,
      atividadeSexual,
      ultimoExame,
      sintomas,
      historicoAlteracoes,
      imunossupressao,
      condicaoEspecial,
    }));
  }

  return (
    <main className="frequencia-page">
      <div className="frequencia-container">
        <header className="frequencia-header">
          <Link to="/exames" className="frequencia-back" aria-label="Voltar aos exames">
            <ArrowLeft size={23} />
          </Link>
          <h1>Com que frequência fazer?</h1>
          <span aria-hidden="true" />
        </header>

        <section className={`frequencia-hero${imagemFrequencia ? ' frequencia-hero--imagem' : ''}`}>
          <div className="frequencia-hero-content">
            <span className="frequencia-eyebrow">EXAMES E RASTREAMENTO</span>
            <h2>O cuidado certo, no momento certo.</h2>
            <p>Entenda os intervalos recomendados e veja uma orientação educativa baseada no seu histórico.</p>
          </div>
          {imagemFrequencia && (
            <img
              src={imagemFrequencia}
              alt="Agenda de cuidados preventivos com calendário e flor rosa"
            />
          )}
        </section>

        <section className="frequencia-resumo" aria-labelledby="frequencia-resumo-titulo">
          <div className="frequencia-section-title">
            <CalendarCheck2 aria-hidden="true" size={24} />
            <h2 id="frequencia-resumo-titulo">Entenda os intervalos</h2>
          </div>
          <p className="frequencia-explicacao">
            Para pessoas de risco habitual, com colo do útero, histórico de atividade sexual e sem sintomas,
            o rastreamento de rotina costuma ser oferecido entre 25 e 64 anos.
          </p>
          <div className="frequencia-resumo-grid">
            <article className="frequencia-resumo-card">
              <span>DNA-HPV negativo</span>
              <strong>5 anos</strong>
              <p>Intervalo habitual após resultado negativo.</p>
            </article>
            <article className="frequencia-resumo-card">
              <span>Papanicolau</span>
              <strong>3 anos</strong>
              <p>Após dois exames normais com intervalo de um ano.</p>
            </article>
          </div>
          <p className="frequencia-resumo-nota">
            <Info size={18} aria-hidden="true" />
            Após os 60 anos, o encerramento do rastreamento depende do histórico e dos resultados anteriores.
          </p>
        </section>

        <section className="frequencia-form-card" aria-labelledby="frequencia-form-titulo">
          <div className="frequencia-section-title">
            <ClipboardList size={24} aria-hidden="true" />
            <h2 id="frequencia-form-titulo">Veja uma orientação para seu caso</h2>
          </div>
          <p className="frequencia-explicacao">
            Responda às perguntas abaixo. As respostas não são armazenadas nem enviadas a um servidor.
          </p>

          <form className="frequencia-form" onSubmit={handleSubmit}>
            <div className="frequencia-fields-grid">
              <div className="frequencia-field">
                <label htmlFor="frequencia-idade">Qual é sua idade?</label>
                <input
                  id="frequencia-idade"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="120"
                  step="1"
                  placeholder="Ex.: 32"
                  required
                  value={idade}
                  onChange={(event) => { setIdade(event.target.value); limparResultado(); }}
                />
              </div>

              <SeletorOpcao
                id="frequencia-colo"
                label="Você possui colo do útero?"
                value={coloUtero}
                options={[
                  { value: 'sim', label: 'Sim' },
                  { value: 'nao', label: 'Não' },
                  { value: 'naosei', label: 'Não sei' },
                ]}
                invalido={Boolean(erro)}
                onChange={(valor) => {
                  setColoUtero(valor as Resposta);
                  limparResultado();
                }}
              />

              <SeletorOpcao
                id="frequencia-atividade"
                label="Já teve atividade sexual?"
                value={atividadeSexual}
                options={[
                  { value: 'sim', label: 'Sim' },
                  { value: 'nao', label: 'Não' },
                  { value: 'naosei', label: 'Prefiro não informar / não sei' },
                ]}
                invalido={Boolean(erro)}
                onChange={(valor) => {
                  setAtividadeSexual(valor as Resposta);
                  limparResultado();
                }}
              />

              <SeletorOpcao
                id="frequencia-ultimo"
                label="Qual situação descreve seu último exame?"
                value={ultimoExame}
                options={[
                  { value: 'dna-negativo', label: 'DNA-HPV com resultado negativo' },
                  { value: 'papa-dois-normais', label: 'Dois Papanicolau normais, com 1 ano entre eles' },
                  { value: 'papa-um-normal', label: 'Um primeiro Papanicolau normal' },
                  { value: 'alterado', label: 'HPV positivo ou algum exame alterado' },
                  { value: 'nunca', label: 'Nunca fiz exame de rastreamento' },
                  { value: 'naosei', label: 'Não lembro / não sei informar' },
                ]}
                invalido={Boolean(erro)}
                onChange={(valor) => {
                  setUltimoExame(valor as UltimoExame);
                  limparResultado();
                }}
              />
            </div>

            <fieldset className="frequencia-situacoes">
              <legend>Alguma destas situações se aplica a você?</legend>
              <p>Marque todas as opções pertinentes. Se não tiver certeza sobre alguma condição, prefira conversar com um profissional antes de seguir um intervalo de rotina.</p>

              <label className="frequencia-check">
                <input type="checkbox" checked={sintomas} onChange={(e) => { setSintomas(e.target.checked); limparResultado(); }} />
                <span>Tenho sintomas, como sangramento vaginal fora do habitual.</span>
              </label>
              <label className="frequencia-check">
                <input type="checkbox" checked={historicoAlteracoes} onChange={(e) => { setHistoricoAlteracoes(e.target.checked); limparResultado(); }} />
                <span>Já tive HPV positivo, lesões ou alterações que exigiram acompanhamento.</span>
              </label>
              <label className="frequencia-check">
                <input type="checkbox" checked={imunossupressao} onChange={(e) => { setImunossupressao(e.target.checked); limparResultado(); }} />
                <span>Tenho alguma condição ou tratamento que reduz a imunidade.</span>
              </label>
              <label className="frequencia-check">
                <input type="checkbox" checked={condicaoEspecial} onChange={(e) => { setCondicaoEspecial(e.target.checked); limparResultado(); }} />
                <span>Estou grávida ou já passei por cirurgia/tratamento do colo do útero.</span>
              </label>
            </fieldset>

            {erro && <p className="frequencia-erro" role="alert">{erro}</p>}

            <button className="frequencia-submit" type="submit">
              Ver orientação <ChevronRight size={20} aria-hidden="true" />
            </button>
          </form>

          {resultado && (
            <section
              className={`frequencia-resultado frequencia-resultado--${resultado.categoria}`}
              aria-live="polite"
              aria-labelledby="frequencia-resultado-titulo"
            >
              <div className="frequencia-resultado-title">
                {resultado.categoria === 'rotina' ? <ShieldCheck size={25} /> : <HeartHandshake size={25} />}
                <h3 id="frequencia-resultado-titulo">{resultado.titulo}</h3>
              </div>
              <p>{resultado.texto}</p>
              <p><strong>Próximo passo:</strong> {resultado.proximoPasso}</p>
              <small>Esta orientação é educativa, não calcula uma data de exame nem substitui avaliação clínica.</small>
            </section>
          )}
        </section>

        <footer className="frequencia-footer">
          <p>Informações baseadas nas diretrizes brasileiras de rastreamento. A disponibilidade do teste DNA-HPV varia entre os serviços do SUS.</p>
          <h3>Fontes oficiais</h3>
          <a href="https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-do-colo-do-utero/acoes/deteccao-precoce" target="_blank" rel="noopener noreferrer">INCA — Detecção precoce</a>
          <a href="https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/colo-do-utero/versao-para-profissionais-de-saude" target="_blank" rel="noopener noreferrer">INCA — Recomendações para profissionais</a>
          <a href="https://www.gov.br/saude/pt-br/assuntos/pcdt/c/cancer-de-colo-do-utero-parte-II/view" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Diretrizes Parte II (2026)</a>
        </footer>
      </div>
    </main>
  );
}
