
export type Exame = {
  slug: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
};

export type SecaoEducativa = {
  titulo: string;
  texto: string;
};

export type ConteudoExame = {
  titulo: string;
  introducao: string;
  secoes: SecaoEducativa[];
  destaque: string;
  fontes: {
    nome: string;
    url: string;
  }[];
};

export const exames: Exame[] = [
  {
    slug: 'papanicolau',
    titulo: 'Papanicolau',
    subtitulo: 'Exame citopatológico',
    descricao:
      'Entenda como é feito, para que serve e sua importância.',
  },
  {
    slug: 'dna-hpv',
    titulo: 'Teste de DNA-HPV',
    subtitulo: 'Rastreamento molecular',
    descricao:
      'Conheça o teste utilizado para detectar HPV de alto risco.',
  },
  {
    slug: 'frequencia',
    titulo: 'Com que frequência fazer?',
    subtitulo: 'Periodicidade dos exames',
    descricao:
      'Entenda os intervalos de rastreamento recomendados.',
  },
  {
    slug: 'onde-realizar',
    titulo: 'Onde realizar?',
    subtitulo: 'Serviços públicos de saúde',
    descricao:
      'Saiba como procurar atendimento pelo SUS.',
  },
];

export const conteudosExames: Record<
  string,
  ConteudoExame
> = {
  papanicolau: {
    titulo: 'Conheça o exame Papanicolau',

    introducao:
      'O Papanicolau, também chamado de exame citopatológico do colo do útero, é utilizado para identificar alterações nas células que podem indicar lesões precursoras do câncer.',

    secoes: [
      {
        titulo: 'Para que serve?',
        texto:
          'O exame permite identificar alterações celulares no colo do útero. Quando são encontradas alterações, a equipe de saúde avalia a necessidade de investigação ou acompanhamento.',
      },
      {
        titulo: 'Como é realizado?',
        texto:
          'Durante a coleta, o profissional de saúde utiliza um espéculo para visualizar o colo do útero. Em seguida, recolhe células com instrumentos apropriados. O material é encaminhado ao laboratório para análise.',
      },
      {
        titulo: 'O exame dói?',
        texto:
          'A coleta costuma ser rápida. Algumas pessoas podem sentir desconforto. É importante comunicar qualquer dor ao profissional e esclarecer dúvidas antes do procedimento.',
      },
      {
        titulo: 'Como se preparar?',
        texto:
          'Informe à equipe de saúde se estiver menstruada ou se utilizou medicamentos, cremes ou produtos vaginais recentemente. Essas situações podem interferir na coleta, e a unidade orientará sobre o melhor momento para realizar o exame.',
      },
      {
        titulo: 'E depois do exame?',
        texto:
          'É importante buscar o resultado na data indicada e receber orientação profissional. Um resultado alterado não significa necessariamente câncer, mas pode exigir investigação e acompanhamento.',
      },
      {
        titulo: 'O Papanicolau ainda é utilizado?',
        texto:
          'Sim. O SUS está adotando progressivamente o teste molecular DNA-HPV como método primário de rastreamento. O Papanicolau continua sendo utilizado nos locais onde essa tecnologia ainda não foi implantada e em situações previstas nos protocolos.',
      },
    ],

    destaque:
      'O exame de rastreamento adequado depende das recomendações atuais e da disponibilidade do serviço. Procure uma UBS para receber orientação.',

    fontes: [
      {
        nome: 'INCA — Detecção precoce',
        url: 'https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-do-colo-do-utero/acoes/deteccao-precoce',
      },
      {
        nome: 'Ministério da Saúde — Como é feita a coleta',
        url: 'https://linhasdecuidado.saude.gov.br/portal/cancer-do-colo-do-utero/unidade-de-atencao-primaria/vigilancia-em-saude/tecnica-exame-citopatologico',
      },
      {
        nome: 'INCA — Informações para a população',
        url: 'https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/colo-do-utero/versao-para-populacao/',
      },
    ],
  },
};
