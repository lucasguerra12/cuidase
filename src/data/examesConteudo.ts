
/* ==========================================
   CARREGAMENTO DAS IMAGENS
========================================== */

/* Imagem do Papanicolau */

const imagensPapanicolau = import.meta.glob(
  '../assets/images/papanicolau-ilustracao.{jpeg,jpg,png,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
) as Record<string, string>;

const imagemPapanicolau =
  Object.values(imagensPapanicolau)[0];

/* Imagem do DNA-HPV */

const imagensDNA = import.meta.glob(
  '../assets/images/dna-hpv-ilustracao.{jpeg,jpg,png,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
) as Record<string, string>;

const imagemDNAHPV = Object.values(imagensDNA)[0];

/* TIPOS */

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

  imagem?: string;
  imagemAlt?: string;

  secoes: SecaoEducativa[];

  destaque: string;

  fontes: {
    nome: string;
    url: string;
  }[];
};

/* OPÇÕES DO MENU */

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

/* CONTEÚDOS EDUCATIVOS */

export const conteudosExames: Record<
  string,
  ConteudoExame
> = {

  /* PAPANICOLAU */

  papanicolau: {
    titulo: 'Conheça o exame Papanicolau',

    imagem: imagemPapanicolau,

    imagemAlt:
    'Ilustração educativa da coleta de células do colo do útero durante o exame Papanicolau.',

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

  /* TESTE DE DNA-HPV */

  'dna-hpv': {
    titulo: 'Entenda o teste de DNA-HPV',

    introducao:
      'O teste DNA-HPV é um exame molecular que identifica a presença de material genético de tipos do papilomavírus humano (HPV) associados a maior risco de câncer do colo do útero. Ele é utilizado para o rastreamento, mesmo quando a pessoa não apresenta sintomas.',

    imagem: imagemDNAHPV,

    imagemAlt:
      'Ilustração educativa de uma molécula de DNA, material de coleta e representações simbólicas do HPV.',

    secoes: [
      {
        titulo: 'Para que serve?',
        texto:
          'O teste procura infecções por tipos oncogênicos do HPV, ou seja, tipos associados ao desenvolvimento do câncer do colo do útero. Ele pode identificar essas infecções antes que apareçam alterações celulares.',
      },
      {
        titulo: 'Como funciona?',
        texto:
          'Uma amostra é coletada e encaminhada para análise laboratorial. O teste utiliza técnicas moleculares para identificar o DNA de tipos de HPV considerados de alto risco.',
      },
      {
        titulo: 'Como é feita a coleta?',
        texto:
          'A coleta pode ser realizada por profissionais de saúde nas Unidades Básicas de Saúde. Em situações previstas nos protocolos, também pode ser utilizada a autocoleta, com orientações da equipe de saúde.',
      },
      {
        titulo: 'Qual a diferença para o Papanicolau?',
        texto:
          'O Papanicolau examina as células do colo do útero em busca de alterações. Já o DNA-HPV procura a presença de tipos do vírus associados ao desenvolvimento dessas alterações. O teste molecular apresenta maior sensibilidade para o rastreamento.',
      },
      {
        titulo: 'O que significa um resultado negativo?',
        texto:
          'Significa que o teste não detectou os tipos de HPV oncogênicos pesquisados na amostra. Para pessoas de risco habitual, as recomendações atuais permitem repetir o rastreamento em cinco anos após resultado negativo, conforme os critérios do programa.',
      },
      {
        titulo: 'O que significa um resultado positivo?',
        texto:
          'Significa que foi detectado um tipo de HPV oncogênico. Isso não é um diagnóstico de câncer. A equipe de saúde avalia quais medidas de acompanhamento são necessárias, levando em conta o tipo viral identificado, outros exames e as diretrizes vigentes.',
      },
      {
        titulo: 'Onde posso realizar o teste?',
        texto:
          'O teste DNA-HPV está sendo implantado gradualmente no SUS. A disponibilidade pode variar entre municípios e unidades de saúde. Procure sua UBS para saber qual método de rastreamento está disponível.',
      },
      {
        titulo: 'Quem tomou a vacina precisa fazer o exame?',
        texto:
          'Sim. A vacinação contra o HPV é uma medida importante de prevenção, mas não substitui o rastreamento recomendado para a população elegível.',
      },
    ],

    destaque:
      'Resultado positivo para HPV não significa câncer. Não interprete o resultado isoladamente: procure a equipe de saúde para receber orientações sobre o acompanhamento adequado.',

    fontes: [
      {
        nome: 'INCA — Detecção precoce',
        url: 'https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-do-colo-do-utero/acoes/deteccao-precoce',
      },
      {
        nome: 'Ministério da Saúde — HPV',
        url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/h/hpv',
      },
      {
        nome: 'Ministério da Saúde — Diretrizes Parte II',
        url: 'https://www.gov.br/saude/pt-br/assuntos/pcdt/c/cancer-de-colo-do-utero-parte-II/view',
      },
    ],
  },
};
