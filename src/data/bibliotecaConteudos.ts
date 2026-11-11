/* CUIDA-SE | BIBLIOTECA EDUCATIVA
   Esta lista reúne páginas já existentes no projeto.
   Adicione novos conteúdos aqui sem alterar os cards do React.
*/

export type CategoriaBiblioteca =
  | 'Prevenção'
  | 'Exames'
  | 'Vacinação'
  | 'Atendimento'
  | 'Dúvidas';

export type IconeBiblioteca =
  | 'coracao'
  | 'exames'
  | 'papanicolau'
  | 'dna'
  | 'calendario'
  | 'vacina'
  | 'localizacao'
  | 'duvidas';

export type ItemBiblioteca = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: CategoriaBiblioteca;
  rota: string;
  icone: IconeBiblioteca;
};

export const bibliotecaConteudos: ItemBiblioteca[] = [
  {
    id: 'sobre',
    titulo: 'Entenda o câncer do colo do útero',
    descricao: 'Conheça a doença, seus fatores de risco e formas de prevenção.',
    categoria: 'Prevenção',
    rota: '/sobre',
    icone: 'coracao',
  },
  {
    id: 'exames',
    titulo: 'Exames e rastreamento',
    descricao: 'Veja quais exames são utilizados para o rastreamento.',
    categoria: 'Exames',
    rota: '/exames',
    icone: 'exames',
  },
  {
    id: 'papanicolau',
    titulo: 'Tudo sobre o Papanicolau',
    descricao: 'Saiba para que serve, como é realizada a coleta e o que esperar.',
    categoria: 'Exames',
    rota: '/exames/papanicolau',
    icone: 'papanicolau',
  },
  {
    id: 'dna-hpv',
    titulo: 'Conheça o teste DNA-HPV',
    descricao: 'Entenda a diferença entre o exame molecular e o Papanicolau.',
    categoria: 'Exames',
    rota: '/exames/dna-hpv',
    icone: 'dna',
  },
  {
    id: 'frequencia',
    titulo: 'Com que frequência fazer?',
    descricao: 'Consulte orientações educativas conforme algumas informações do seu histórico.',
    categoria: 'Exames',
    rota: '/exames/frequencia',
    icone: 'calendario',
  },
  {
    id: 'vacina',
    titulo: 'Vacina contra o HPV',
    descricao: 'Conheça a vacinação e sua importância na prevenção.',
    categoria: 'Vacinação',
    rota: '/vacina-hpv',
    icone: 'vacina',
  },
  {
    id: 'onde-realizar',
    titulo: 'Onde buscar atendimento?',
    descricao: 'Consulte a lista de unidades de saúde em São José dos Campos.',
    categoria: 'Atendimento',
    rota: '/exames/onde-realizar',
    icone: 'localizacao',
  },
  {
    id: 'duvidas',
    titulo: 'Perguntas frequentes',
    descricao: 'Encontre respostas sobre HPV, prevenção, vacinação e exames.',
    categoria: 'Dúvidas',
    rota: '/duvidas',
    icone: 'duvidas',
  },
];
