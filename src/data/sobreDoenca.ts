
export type Aba = 'oque' | 'causas' | 'sintomas' | 'prevencao';

type Fonte = {
  nome: string;
  url: string;
};

type Conteudo = {
  titulo: string;
  introducao: string[];
  pontos: string[];
  destaque: string;
  fontes: Fonte[];
};

export const abas: { id: Aba; nome: string }[] = [
  { id: 'oque', nome: 'O que é?' },
  { id: 'causas', nome: 'Causas' },
  { id: 'sintomas', nome: 'Sintomas' },
  { id: 'prevencao', nome: 'Prevenção' },
];

export const conteudos: Record<Aba, Conteudo> = {
  oque: {
    titulo: 'O que é o câncer do colo do útero?',

    introducao: [
      'O câncer do colo do útero, também chamado de câncer cervical, é uma doença caracterizada pelo crescimento anormal de células na parte inferior do útero, região que faz a ligação com a vagina.',

      'Seu desenvolvimento está associado principalmente à infecção persistente por determinados tipos do papilomavírus humano (HPV), chamados de tipos oncogênicos.',
    ],

    pontos: [
      'O HPV é um vírus muito comum, transmitido principalmente pelo contato sexual.',
      'Na maioria das pessoas, a infecção desaparece naturalmente.',
      'Quando a infecção por tipos oncogênicos persiste, podem surgir alterações celulares que, ao longo dos anos, podem evoluir para câncer.',
      'A identificação e o tratamento de lesões precursoras ajudam a prevenir o desenvolvimento da doença.',
    ],

    destaque:
      'O câncer do colo do útero pode ser prevenido em muitos casos por meio da vacinação contra HPV e do rastreamento adequado.',

    fontes: [
      {
        nome: 'INCA — Câncer do colo do útero',
        url: 'https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/colo-do-utero',
      },
      {
        nome: 'Ministério da Saúde — HPV',
        url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/h/hpv',
      },
    ],
  },

  causas: {
    titulo: 'O que causa o câncer do colo do útero?',

    introducao: [
      'A principal causa é a infecção persistente por tipos oncogênicos do HPV. Entre eles, os tipos 16 e 18 estão associados a uma parcela importante dos casos.',

      'Ter HPV não significa ter câncer. A maioria das infecções é controlada pelo organismo, mas algumas podem persistir e causar alterações nas células.',
    ],

    pontos: [
      'Infecção persistente por HPV oncogênico.',
      'Tabagismo, que aumenta o risco de desenvolvimento da doença.',
      'Imunidade comprometida, que pode dificultar o controle da infecção.',
      'Fatores relacionados à exposição ao HPV, como início precoce da atividade sexual e múltiplas parcerias sexuais.',
    ],

    destaque:
      'O HPV é muito comum. O diagnóstico de uma infecção não significa que a pessoa desenvolverá câncer.',

    fontes: [
      {
        nome: 'INCA — Fatores de risco',
        url: 'https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-do-colo-do-utero/fatores-de-risco',
      },
    ],
  },

  sintomas: {
    titulo: 'Quais são os principais sintomas?',

    introducao: [
      'O câncer do colo do útero pode não apresentar sintomas nas fases iniciais. Por isso, o rastreamento é importante mesmo para pessoas que se sentem bem.',

      'Quando surgem manifestações, alguns sinais devem ser investigados por um profissional de saúde.',
    ],

    pontos: [
      'Sangramento vaginal durante ou após a relação sexual.',
      'Sangramento entre as menstruações.',
      'Sangramento após a menopausa.',
      'Corrimento vaginal com sangue ou odor desagradável.',
      'Dor durante a relação sexual.',
      'Em casos mais avançados, podem ocorrer dores na região pélvica ou lombar.',
    ],

    destaque:
      'Esses sintomas podem ter outras causas. Mesmo assim, é importante procurar atendimento para avaliação, sem esperar o próximo exame de rotina.',

    fontes: [
      {
        nome: 'INCA — Sinais e sintomas',
        url: 'https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/colo-do-utero/versao-para-populacao',
      },
    ],
  },

  prevencao: {
    titulo: 'Como prevenir o câncer do colo do útero?',

    introducao: [
      'A prevenção envolve principalmente a vacinação contra o HPV, a redução do risco de transmissão do vírus e a realização dos exames de rastreamento recomendados.',

      'O rastreamento permite encontrar alterações antes do aparecimento de sintomas, possibilitando investigação e tratamento quando necessários.',
    ],

    pontos: [
      'Vacinação: a vacina contra HPV é oferecida gratuitamente pelo SUS. O calendário de rotina contempla meninas e meninos de 9 a 14 anos, além de grupos específicos com recomendações próprias.',
      'Preservativos: ajudam a reduzir o risco de transmissão do HPV, mas não oferecem proteção completa.',
      'Rastreamento: no SUS, é recomendado para mulheres e outras pessoas com colo do útero, geralmente entre 25 e 64 anos, que já tiveram atividade sexual.',
      'Teste DNA-HPV: é o exame primário adotado progressivamente no Brasil. Com resultado negativo, o intervalo habitual é de cinco anos.',
      'Papanicolau: continua sendo utilizado onde o teste DNA-HPV ainda não foi implantado. Após dois exames anuais normais, o intervalo habitual é de três anos.',
    ],

    destaque:
      'Mesmo quem recebeu a vacina contra HPV deve seguir as recomendações de rastreamento. A UBS pode orientar sobre o exame disponível e situações que exigem acompanhamento diferente.',

    fontes: [
      {
        nome: 'INCA — Detecção precoce',
        url: 'https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-do-colo-do-utero/acoes/deteccao-precoce',
      },
      {
        nome: 'Ministério da Saúde — HPV',
        url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/h/hpv',
      },
    ],
  },
};
