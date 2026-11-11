/* CUIDA-SE | CONTATOS E MENSAGENS PRONTAS

   Edite somente este arquivo para trocar os dados demonstrativos
   pelos nomes e números autorizados das integrantes do projeto.

   IMPORTANTE: não apresente estudantes como médicas nem utilize
   CRM ou disponibilidade "online" fictícios.
*/

export type ContatoChat = {
  id: string;
  nome: string;
  funcao: string;
  tema: string;
  descricao: string;
  whatsapp?: string;
  fotoArquivo?: string;
};

export type MensagemPronta = {
  id: string;
  titulo: string;
  texto: string;
};

// Opcional: número único do grupo, com DDD. Ex.: '5512999999999'.
// Deixe vazio até ter permissão para publicar o contato.
export const whatsappProjeto = '';

export const contatosChat: ContatoChat[] = [
  {
    id: 'integrante-1',
    nome: 'Sarah Munetaka',
    funcao: 'Estudante de Biomedicina',
    tema: 'HPV, prevenção e saúde da mulher',
    descricao: 'Integrante da equipe do projeto Cuida-se.',
    whatsapp: '5512992458057',
    fotoArquivo: 'integrante-1.jpg',
  },
  {
    id: 'integrante-2',
    nome: 'Integrante 2',
    funcao: 'Equipe do projeto Cuida-se',
    tema: 'Vacinação e prevenção',
    descricao: 'Contato demonstrativo para dúvidas educativas.',
    whatsapp: '',
  },
  {
    id: 'integrante-3',
    nome: 'Integrante 3',
    funcao: 'Equipe do projeto Cuida-se',
    tema: 'Papanicolau e DNA-HPV',
    descricao: 'Contato demonstrativo para dúvidas educativas.',
    whatsapp: '',
  },
  {
    id: 'integrante-4',
    nome: 'Integrante 4',
    funcao: 'Equipe do projeto Cuida-se',
    tema: 'Unidades de saúde e orientações',
    descricao: 'Contato demonstrativo para dúvidas educativas.',
    whatsapp: '',
  },
];

export const mensagensProntas: MensagemPronta[] = [
  {
    id: 'hpv',
    titulo: 'Tenho dúvidas sobre o HPV',
    texto: 'Estou utilizando o Cuida-se e gostaria de receber informações gerais sobre o HPV e sua prevenção. Poderiam me orientar?',
  },
  {
    id: 'vacina',
    titulo: 'Quero saber sobre a vacina',
    texto: 'Gostaria de saber onde posso encontrar informações oficiais sobre a vacina contra o HPV e como verificar se posso recebê-la pelo SUS.',
  },
  {
    id: 'papanicolau',
    titulo: 'Dúvidas sobre o Papanicolau',
    texto: 'Gostaria de esclarecer dúvidas gerais sobre o exame Papanicolau, como ele é realizado e onde buscar atendimento.',
  },
  {
    id: 'dna-hpv',
    titulo: 'Dúvidas sobre o DNA-HPV',
    texto: 'Gostaria de informações educativas sobre o teste DNA-HPV e como verificar sua disponibilidade na rede de saúde.',
  },
  {
    id: 'ubs',
    titulo: 'Onde procurar atendimento?',
    texto: 'Gostaria de saber como localizar uma UBS e confirmar quais serviços preventivos estão disponíveis em São José dos Campos.',
  },
  {
    id: 'aplicativo',
    titulo: 'Como usar o Cuida-se?',
    texto: 'Tenho uma dúvida sobre as funcionalidades do aplicativo Cuida-se. Poderiam me ajudar?',
  },
];

/* Carregamento opcional de fotos reais, mediante autorização.
   Salve em src/assets/images/contatos/ e informe o nome em fotoArquivo.
   Sem foto, a interface exibe as iniciais do contato. */
const fotos = import.meta.glob(
  '../assets/images/contatos/*.{jpeg,jpg,png,webp}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

export function obterFotoContato(arquivo?: string): string | undefined {
  if (!arquivo || arquivo.includes('/') || arquivo.includes('\\')) return undefined;
  const entrada = Object.entries(fotos).find(([caminho]) =>
    caminho.endsWith(`/${arquivo}`)
  );
  return entrada?.[1];
}

/**
 * Aceita números brasileiros com DDD (10 ou 11 dígitos), com ou
 * sem prefixo +55. Não cria links para números vazios/inválidos.
 */
export function normalizarWhatsapp(numero: string): string | null {
  const digitos = numero.replace(/\D/g, '');
  if (!digitos) return null;
  if (digitos.length === 10 || digitos.length === 11) {
    return `55${digitos}`;
  }
  if ((digitos.length === 12 || digitos.length === 13) && digitos.startsWith('55')) {
    return digitos;
  }
  return null;
}
