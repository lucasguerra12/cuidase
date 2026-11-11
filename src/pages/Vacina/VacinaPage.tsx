import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Syringe,
} from 'lucide-react';

import './VacinaPage.css';

// A página funciona mesmo antes de adicionar a ilustração.
// Salve a arte como vacina-hpv-ilustracao.jpeg (ou jpg/png/webp).
const imagens = import.meta.glob(
  '../../assets/images/vacina-hpv-ilustracao.{jpeg,jpg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;
const imagemVacina = Object.values(imagens)[0];

const informacoes = [
  {
    titulo: 'O que é a vacina contra o HPV?',
    texto:
      'É uma vacina que ajuda a prevenir novas infecções por tipos do papilomavírus humano (HPV). A vacina quadrivalente oferecida pelo SUS protege contra os tipos 6, 11, 16 e 18, associados a verrugas anogenitais e a alguns tipos de câncer.',
  },
  {
    titulo: 'Por que é importante se vacinar?',
    texto:
      'A vacinação reduz o risco de infecções pelos tipos de HPV incluídos na vacina. Ela é especialmente importante antes da exposição ao vírus, mas a equipe de saúde também avalia indicações para outras faixas etárias e situações específicas.',
  },
  {
    titulo: 'Quem pode receber a vacina pelo SUS?',
    texto:
      'A vacinação de rotina é indicada para meninas e meninos de 9 a 14 anos, em dose única. Em 2026, há uma estratégia de resgate para jovens não vacinados de 15 a 19 anos, prevista até 31 de dezembro. Pessoas de grupos específicos podem ter outras indicações e esquemas.',
  },
  {
    titulo: 'Existem esquemas com mais doses?',
    texto:
      'Sim. Pessoas imunodeprimidas, como pessoas vivendo com HIV, transplantadas ou em tratamento oncológico, podem receber três doses, conforme os critérios do SUS. Também existem recomendações específicas para usuários de PrEP, pessoas com papilomatose respiratória recorrente e vítimas de violência sexual. Nesses casos, procure a equipe de vacinação.',
  },
  {
    titulo: 'A vacina é segura?',
    texto:
      'A vacina é considerada segura. Pode causar reações como dor no local da aplicação e outros sintomas leves e passageiros. Reações graves são raras. Em caso de dúvida sobre contraindicações ou reações, converse com um profissional de saúde.',
  },
  {
    titulo: 'A vacina substitui o Papanicolau ou o teste DNA-HPV?',
    texto:
      'Não. A vacina não cobre todos os tipos de HPV e não trata infecções já existentes. Pessoas elegíveis devem continuar seguindo as orientações de rastreamento do câncer do colo do útero.',
  },
  {
    titulo: 'E durante a gravidez?',
    texto:
      'A vacina contra o HPV não é indicada durante a gestação. Se uma dose for recebida antes de saber da gravidez, não é necessário iniciar uma intervenção específica por causa da vacina; a situação deve ser informada à equipe do pré-natal.',
  },
];

const fontes = [
  {
    nome: 'Ministério da Saúde — Calendário Nacional de Vacinação',
    url: 'https://www.gov.br/saude/pt-br/vacinacao/calendario',
  },
  {
    nome: 'Ministério da Saúde — HPV e prevenção',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/h/hpv/hpv',
  },
  {
    nome: 'Ministério da Saúde — Resgate de jovens em 2026',
    url: 'https://www.gov.br/saude/pt-br/assuntos/noticias/2026/julho/jovens-de-15-a-19-anos-podem-se-vacinar-contra-o-hpv-ate-dezembro/',
  },
];

export default function VacinaPage() {
  const navigate = useNavigate();

  return (
    <main className="vacina-page">
      <div className="vacina-container">
        <header className="vacina-header">
          <button
            className="vacina-back"
            type="button"
            onClick={() => navigate('/inicio')}
            aria-label="Voltar ao início"
          >
            <ArrowLeft size={23} />
          </button>
          <h1>Vacina HPV</h1>
          <span aria-hidden="true" />
        </header>

        <section className="vacina-hero" aria-labelledby="vacina-titulo">
          <div className="vacina-hero-heading">
            <span className="vacina-hero-icon" aria-hidden="true">
              <Syringe size={27} />
            </span>
            <div>
              <p className="vacina-eyebrow">PREVENÇÃO E CUIDADO</p>
              <h2 id="vacina-titulo">Vacinar é proteger o futuro</h2>
            </div>
          </div>
          <p className="vacina-hero-description">
            Entenda como a vacina contra o HPV ajuda a prevenir infecções
            e doenças relacionadas ao vírus.
          </p>
          {imagemVacina && (
            <figure className="vacina-ilustracao">
              <img
                src={imagemVacina}
                alt="Ilustração educativa delicada de uma vacinação contra o HPV"
              />
            </figure>
          )}
        </section>

        <section className="vacina-resumo" aria-label="Vacinação de rotina no SUS">
          <div className="vacina-dado">
            <span>Faixa etária de rotina</span>
            <strong>9 a 14 anos</strong>
            <p>Meninas e meninos</p>
          </div>
          <div className="vacina-dado">
            <span>Esquema de rotina</span>
            <strong>1 dose</strong>
            <p>Conforme histórico vacinal</p>
          </div>
        </section>

        <aside className="vacina-atencao">
          <ShieldCheck size={24} aria-hidden="true" />
          <p>
            <strong>Resgate em 2026:</strong> jovens de 15 a 19 anos sem
            vacinação anterior podem procurar o SUS até 31 de dezembro de 2026.
            Verifique as orientações vigentes na unidade de saúde.
          </p>
        </aside>

        <section className="vacina-conteudo" aria-labelledby="vacina-duvidas">
          <div className="vacina-secao-titulo">
            <BookOpen size={22} aria-hidden="true" />
            <h2 id="vacina-duvidas">Entenda a vacinação</h2>
          </div>
          <div className="vacina-info-lista">
            {informacoes.map((item) => (
              <article className="vacina-info" key={item.titulo}>
                <h3>{item.titulo}</h3>
                <p>{item.texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="vacina-orientacao" aria-labelledby="vacina-onde">
          <div className="vacina-secao-titulo">
            <MapPin size={22} aria-hidden="true" />
            <h2 id="vacina-onde">Onde buscar a vacina?</h2>
          </div>
          <p>
            A vacinação é oferecida gratuitamente no SUS. Procure uma Unidade
            Básica de Saúde (UBS) ou ponto de vacinação e confirme a
            disponibilidade e os documentos necessários antes de ir.
          </p>
          <Link className="vacina-link-interno" to="/exames/onde-realizar">
            Consultar unidades de saúde <MapPin size={18} />
          </Link>
          <small>
            A lista de unidades do Cuida-se é informativa e não confirma
            estoque ou aplicação da vacina em cada local.
          </small>
        </section>

        <aside className="vacina-lembrete">
          <HeartHandshake size={24} aria-hidden="true" />
          <p>
            <strong>Lembre-se:</strong> a vacina ajuda a prevenir novas infecções,
            mas não substitui o rastreamento recomendado nem a avaliação de sintomas.
          </p>
        </aside>

        <footer className="vacina-footer">
          <p>Conteúdo educativo. Não substitui avaliação ou orientação profissional.</p>
          <h2>Fontes oficiais</h2>
          {fontes.map((fonte) => (
            <a key={fonte.url} href={fonte.url} target="_blank" rel="noopener noreferrer">
              {fonte.nome} <ExternalLink size={15} aria-hidden="true" />
            </a>
          ))}
          <p className="vacina-atualizacao">Informações consultadas em novembro de 2026.</p>
        </footer>
      </div>
    </main>
  );
}
