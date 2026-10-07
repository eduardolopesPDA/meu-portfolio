import type { Project } from '../types'

// Imagens opcionais: coloque em /public/projects e use image: '/projects/arquivo.webp'
export const PROJECTS: Project[] = [
  {
    id: 'conteinerizacao-web-solutions',
    string: 'E2',
    title: 'Web Solutions',
    description:
      'Prova de conceito de conteinerização e orquestração: um formulário no Apache envia mensagens para uma API no Nginx, tudo rodando em Docker e Kubernetes.',
    problem:
      'Modernizar a infraestrutura da Web Solutions Ltda., mostrando como imagens Docker e a orquestração com Kubernetes facilitam implantação, escala e gerenciamento.',
    technologies: ['Docker', 'Kubernetes', 'Nginx', 'Apache', 'JavaScript', 'Shell'],
    github: 'https://github.com/eduardolopesPDA/conteinerizacao-web-solutions',
  },
  {
    id: 'coderv',
    string: 'A2',
    title: 'CodeRV',
    description:
      'Sistema de revisão de código que combina análise estática (ESLint e Ruff) com análise por IA, usando as regras de negócio cadastradas pelo time como fonte de verdade.',
    problem:
      'Ajudar desenvolvedores solo e times a garantir a qualidade do código sem que a IA invente regras: ela compara o código com o que foi cadastrado e pergunta quando há dúvida.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind'],
    github: 'https://github.com/eduardolopesPDA/CodeRV',
  },
  {
    id: 'sistema-banco-faculdade',
    string: 'D3',
    title: 'Banco de Dados Acadêmico',
    description:
      'Modelagem e implementação de um banco SQL para gestão acadêmica: alunos, cursos, matérias, professores, turmas e notas.',
    problem:
      'Dar a uma faculdade uma estrutura sólida para acompanhar o desempenho de cada aluno por turma, com chaves primárias e estrangeiras garantindo a integridade dos dados.',
    technologies: ['MySQL', 'SQL', 'Modelagem de dados'],
    github: 'https://github.com/eduardolopesPDA/sistema-de-banco-de-dados-para-faculdade',
  },
  {
    id: 'reuse',
    string: 'G3',
    title: 'ReUse+',
    description:
      'Plataforma colaborativa, feita em equipe, que conecta pessoas para doar, trocar ou encontrar itens usados em bom estado.',
    problem:
      'Itens ainda utilizáveis são descartados todos os dias enquanto muita gente não tem acesso a eles. O ReUse+ aproxima doadores e quem precisa de forma segura e sustentável.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js', 'Express'],
    github: 'https://github.com/Millena-Monteiro/ReUse-Frontend',
  },
  {
    id: 'biblioteca-unifecaf',
    string: 'B3',
    title: 'Biblioteca UniFECAF',
    description:
      'Interface da Biblioteca Digital da UniFECAF, criada a partir de um protótipo de baixa fidelidade, com busca no acervo, categorias, livros em destaque e serviços.',
    problem:
      'Facilitar o acesso dos estudantes a livros e materiais acadêmicos com uma página responsiva, fiel à identidade da faculdade e feita só com HTML e CSS.',
    technologies: ['HTML', 'CSS', 'GitHub Actions'],
    github: 'https://github.com/eduardolopesPDA/Biblioteca-Unifecaf',
    demo: 'https://biblioteca-unifecaf.vercel.app',
  },
  {
    id: 'portfolio-musical',
    string: 'E4',
    title: 'Este portfólio',
    description:
      'Portfólio interativo em que cada corda de uma guitarra 3D abre um projeto, com som de corda sintetizado em tempo real.',
    problem: 'Mostrar quem eu sou unindo as duas coisas que mais gosto: código e música.',
    technologies: ['React', 'TypeScript', 'Three.js', 'Web Audio API', 'Tailwind'],
    // adicione o link quando publicar no GitHub:
    // github: 'https://github.com/eduardolopesPDA/<repositorio>',
  },
]
