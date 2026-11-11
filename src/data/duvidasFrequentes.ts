/* CUIDA-SE | Perguntas e respostas educativas (dados locais, sem backend) */

export const categoriasDuvidas = [
  'HPV',
  'Exames',
  'Vacinação',
  'Prevenção',
  'Atendimento',
] as const;

export type CategoriaDuvida = (typeof categoriasDuvidas)[number];

export type DuvidaFrequente = {
  id: string;
  categoria: CategoriaDuvida;
  pergunta: string;
  resposta: string;
};

export const duvidasFrequentes: DuvidaFrequente[] = [
  // HPV
  {
    id: 'o-que-e-hpv',
    categoria: 'HPV',
    pergunta: 'O que é HPV?',
    resposta:
      'HPV é a sigla para papilomavírus humano, um grupo de vírus que pode infectar a pele e as mucosas. Alguns tipos causam verrugas; outros estão associados a determinados cânceres, incluindo o do colo do útero.',
  },
  {
    id: 'transmissao-hpv',
    categoria: 'HPV',
    pergunta: 'Como o HPV é transmitido?',
    resposta:
      'Principalmente pelo contato íntimo com pele ou mucosas infectadas, inclusive durante relações sexuais com ou sem penetração. É possível transmitir o vírus sem apresentar sintomas.',
  },
  {
    id: 'hpv-sem-sintomas',
    categoria: 'HPV',
    pergunta: 'É possível ter HPV e não sentir nada?',
    resposta:
      'Sim. Muitas infecções não apresentam sinais ou sintomas. Por isso, a ausência de desconforto não exclui a presença do vírus, e a prevenção continua sendo importante.',
  },
  {
    id: 'hpv-cancer',
    categoria: 'HPV',
    pergunta: 'Ter HPV significa que tenho câncer?',
    resposta:
      'Não. A infecção por HPV é comum e, na maioria das pessoas, desaparece espontaneamente. Alguns tipos de alto risco podem persistir e provocar alterações ao longo dos anos. Um resultado positivo exige orientação e acompanhamento, não significa diagnóstico de câncer.',
  },
  {
    id: 'hpv-desaparece',
    categoria: 'HPV',
    pergunta: 'O HPV pode desaparecer sozinho?',
    resposta:
      'Sim. O sistema imunológico controla muitas infecções por HPV sem que sejam necessárias intervenções. Entretanto, algumas podem persistir, por isso é importante seguir a avaliação e as recomendações da equipe de saúde.',
  },
  {
    id: 'preservativo-hpv',
    categoria: 'HPV',
    pergunta: 'O preservativo protege totalmente contra o HPV?',
    resposta:
      'O preservativo reduz o risco, mas não oferece proteção completa porque o vírus pode estar em áreas de pele não cobertas. Ele continua sendo importante para prevenir outras infecções sexualmente transmissíveis.',
  },
  {
    id: 'hpv-outras-pessoas',
    categoria: 'HPV',
    pergunta: 'O HPV afeta apenas mulheres?',
    resposta:
      'Não. Pessoas de diferentes sexos e gêneros podem contrair HPV. O vírus pode estar relacionado a verrugas e a cânceres em diferentes partes do corpo. A vacinação é importante também para meninos.',
  },

  // Exames
  {
    id: 'para-que-papanicolau',
    categoria: 'Exames',
    pergunta: 'Para que serve o Papanicolau?',
    resposta:
      'O Papanicolau analisa células do colo do útero para procurar alterações que podem anteceder o câncer. Ele ajuda a identificar situações que precisam de investigação ou acompanhamento.',
  },
  {
    id: 'teste-dna-hpv',
    categoria: 'Exames',
    pergunta: 'O que é o teste DNA-HPV?',
    resposta:
      'É um exame molecular que procura tipos de HPV associados a maior risco de câncer do colo do útero. O SUS está adotando esse teste como método principal de rastreamento, de forma progressiva.',
  },
  {
    id: 'diferenca-exames',
    categoria: 'Exames',
    pergunta: 'Qual a diferença entre Papanicolau e DNA-HPV?',
    resposta:
      'O Papanicolau busca alterações nas células do colo do útero. O DNA-HPV identifica tipos do vírus associados a essas alterações, podendo detectar o risco antes de modificações celulares aparecerem.',
  },
  {
    id: 'idade-rastreamento',
    categoria: 'Exames',
    pergunta: 'A partir de qual idade devo fazer o rastreamento?',
    resposta:
      'No SUS, o rastreamento de rotina é voltado principalmente a pessoas de 25 a 64 anos com colo do útero que já tiveram atividade sexual. Situações especiais, como imunossupressão, podem exigir orientações diferentes.',
  },
  {
    id: 'frequencia-exame',
    categoria: 'Exames',
    pergunta: 'De quanto em quanto tempo devo repetir o exame?',
    resposta:
      'Para pessoas de risco habitual, um DNA-HPV negativo costuma permitir intervalo de cinco anos. Onde o Papanicolau ainda é utilizado, o intervalo habitual é de três anos após dois resultados normais consecutivos, feitos com intervalo de um ano. Resultados alterados e condições especiais podem mudar o acompanhamento.',
  },
  {
    id: 'sem-sintomas',
    categoria: 'Exames',
    pergunta: 'Preciso fazer o exame mesmo sem sintomas?',
    resposta:
      'Sim, se você faz parte da população indicada para rastreamento. O objetivo é encontrar riscos ou alterações antes que surjam sintomas. Se já houver sintomas, procure avaliação: isso é investigação clínica, não rastreamento de rotina.',
  },
  {
    id: 'dor-papanicolau',
    categoria: 'Exames',
    pergunta: 'O exame Papanicolau dói?',
    resposta:
      'Geralmente a coleta é rápida, mas pode provocar desconforto. Avise o profissional se sentir dor ou precisar interromper o procedimento. Você pode pedir explicações antes e durante o exame.',
  },
  {
    id: 'preparacao-exame',
    categoria: 'Exames',
    pergunta: 'Preciso me preparar para o Papanicolau?',
    resposta:
      'É importante seguir as orientações da unidade sobre o momento adequado para a coleta. Informe se estiver menstruada e se utilizou cremes, medicamentos ou outros produtos vaginais recentemente, pois isso pode interferir no exame.',
  },
  {
    id: 'resultado-alterado',
    categoria: 'Exames',
    pergunta: 'Um resultado alterado significa câncer?',
    resposta:
      'Não necessariamente. Um resultado alterado pode indicar infecção pelo HPV ou mudanças celulares que precisam ser avaliadas. Busque o resultado e siga a orientação da equipe de saúde para exames complementares ou acompanhamento.',
  },
  {
    id: 'situacoes-especiais',
    categoria: 'Exames',
    pergunta: 'Quem vive com HIV ou tem imunossupressão segue os mesmos intervalos?',
    resposta:
      'Nem sempre. Pessoas imunodeprimidas podem precisar iniciar o acompanhamento em outro momento e seguir um protocolo específico. A periodicidade deve ser definida pela equipe que acompanha sua saúde.',
  },

  // Vacinação
  {
    id: 'quem-vacina',
    categoria: 'Vacinação',
    pergunta: 'Quem pode tomar a vacina contra o HPV pelo SUS?',
    resposta:
      'A vacinação de rotina é oferecida a meninas e meninos de 9 a 14 anos, com esquema de dose única. Campanhas de resgate e grupos com condições específicas podem ter outras faixas etárias ou esquemas. Consulte o calendário atual da UBS.',
  },
  {
    id: 'vacina-segura',
    categoria: 'Vacinação',
    pergunta: 'A vacina contra o HPV é segura?',
    resposta:
      'Sim. Ela é considerada segura e monitorada. Podem ocorrer reações como dor no local da aplicação, geralmente leves e passageiras. Em caso de reação importante ou dúvida sobre contraindicações, procure orientação profissional.',
  },
  {
    id: 'vacina-cura',
    categoria: 'Vacinação',
    pergunta: 'A vacina cura uma infecção por HPV que já existe?',
    resposta:
      'Não. A vacina é preventiva: ela ajuda a evitar novas infecções pelos tipos de HPV incluídos na sua composição. Ela não elimina uma infecção já existente nem substitui o acompanhamento médico.',
  },
  {
    id: 'vacina-dispensa-exame',
    categoria: 'Vacinação',
    pergunta: 'Quem tomou a vacina ainda precisa fazer o preventivo?',
    resposta:
      'Sim, quando estiver na faixa etária e nas condições indicadas para rastreamento. A vacina não protege contra todos os tipos de HPV associados ao câncer do colo do útero.',
  },

  // Prevenção
  {
    id: 'prevenir-cancer',
    categoria: 'Prevenção',
    pergunta: 'É possível prevenir o câncer do colo do útero?',
    resposta:
      'A vacinação contra o HPV e o rastreamento adequado reduzem muito o risco. O uso de preservativo também ajuda a diminuir a transmissão do vírus. Identificar e tratar lesões precursoras é uma forma importante de prevenção.',
  },
  {
    id: 'sinais-alerta',
    categoria: 'Prevenção',
    pergunta: 'Quais sinais devem ser avaliados por um profissional?',
    resposta:
      'Sangramento vaginal fora do padrão habitual, especialmente após relações sexuais, corrimento persistente incomum ou dor pélvica persistente merecem avaliação. Esses sintomas podem ter várias causas; não espere a data do próximo preventivo para procurar atendimento.',
  },
  {
    id: 'sem-atividade-sexual',
    categoria: 'Prevenção',
    pergunta: 'Quem nunca teve atividade sexual precisa fazer rastreamento?',
    resposta:
      'Em geral, o rastreamento de rotina do câncer do colo do útero não é indicado para pessoas que nunca tiveram atividade sexual. Se houver sintomas ou dúvidas sobre sua situação, converse com a equipe de saúde.',
  },

  // Atendimento
  {
    id: 'exame-sus',
    categoria: 'Atendimento',
    pergunta: 'Posso fazer os exames preventivos pelo SUS?',
    resposta:
      'Sim. Procure uma Unidade Básica de Saúde (UBS) para receber orientação sobre o rastreamento disponível e como agendar a coleta. A oferta do teste DNA-HPV está sendo implantada gradualmente.',
  },
  {
    id: 'onde-vacinar',
    categoria: 'Atendimento',
    pergunta: 'Onde posso saber se a vacina ou o exame está disponível?',
    resposta:
      'Consulte a UBS de referência ou a Secretaria Municipal de Saúde. Uma lista de endereços não garante que todos os serviços estejam disponíveis em cada unidade, por isso é importante confirmar antes de sair de casa.',
  },
];

export const fontesDuvidas = [
  {
    nome: 'INCA — Detecção precoce',
    url: 'https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-do-colo-do-utero/acoes/deteccao-precoce',
  },
  {
    nome: 'INCA — Câncer do colo do útero (população)',
    url: 'https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/colo-do-utero/versao-para-populacao',
  },
  {
    nome: 'Ministério da Saúde — Perguntas sobre HPV',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/h/hpv/faq',
  },
  {
    nome: 'Ministério da Saúde — Vacinação HPV',
    url: 'https://www.gov.br/saude/pt-br/acesso-a-informacao/faq/vacinacao-hpv',
  },
];
