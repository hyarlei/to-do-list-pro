# To-Do List Pro - Frontend

Interface moderna e responsiva para gerenciamento de tarefas, desenvolvida com React e Vite.

## Sobre o Frontend

O frontend do To-Do List Pro fornece uma experiência de usuário intuitiva e rápida para criar, editar, visualizar e gerenciar tarefas. Utiliza React 19 com Hooks para estado dinâmico e Vite para um desenvolvimento ágil com HMR (Hot Module Replacement).

## Funcionalidades

- ✅ Interface responsiva e moderna
- ✅ Hot Module Replacement (HMR) em desenvolvimento
- ✅ Integração com API Backend
- ✅ Design mobile-first
- ✅ Filtro e busca de tarefas
- ✅ Organização por categorias
- ✅ Marcação de tarefas concluídas
- ✅ Componentes reutilizáveis

## Stack Tecnológico

|Tecnologia|Versão|Propósito|
|-----------|--------|----------|
|React|^19.2.4|Biblioteca UI|
|Vite|^8.0.1|Build tool e dev server|
|JavaScript/JSX|-|Linguagem|
|ESLint|^9.39.4|Linter e code quality|

## Estrutura do Projeto

```frontend/
├── src/
│   ├── App.jsx          # Componente raiz da aplicação
│   ├── App.css          # Estilos globais
│   ├── main.jsx         # Ponto de entrada
│   └── components/      # Componentes reutilizáveis (a estruturar)
├── public/              # Arquivos estáticos
├── index.html           # Template HTML
├── vite.config.js       # Configuração do Vite
├── eslint.config.js     # Configuração do ESLint
└── package.json         # Dependências e scripts
```

## Instalação e Setup

### Pré-requisitos

- Node.js v18 ou superior
- npm ou yarn

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Se necessário, crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3333
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Comandos Disponíveis

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento com HMR ativado.

### Build de Produção

```bash
npm run build
```

Cria uma versão otimizada para produção na pasta `dist/`.

### Preview de Produção

```bash
npm run preview
```

Visualiza a versão de produção localmente.

### Lint e Verificação de Code Quality

```bash
npm run lint
```

Executa o ESLint para verificar qualidade do código.

## Padrões e Convenções

- **Componentes**: Use nomes em PascalCase (ex: `TaskCard.jsx`)
- **Hooks**: Prefixe com `use` (ex: `useTasks.js`)
- **Props**: Use destructuring em parâmetros de função
- **Estado**: Prefira `useState` para estado local e considere `useContext` para estado global

## Deployment

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

### Hospedar Estaticamente

O diretório `dist/` pode ser hospedado em:

- **Vercel** (recomendado para Vite)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Servidor próprio (Nginx, Apache)**

## 🔗 Integração com Backend

O frontend se comunica com a API do backend via requisições HTTP. Configure a URL base da API em:

```javascript
// Exemplo em um serviço ou arquivo de configuração
const API_URL = process.env.VITE_API_URL || 'http://localhost:3333';
```

### Endpoints Utilizados

- `GET /tasks` - Listar todas as tarefas
- `POST /tasks` - Criar nova tarefa
- `GET /tasks/:id` - Obter detalhes da tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa
- `GET /categories` - Listar categorias

Veja a documentação completa em [backend/README.md](../backend/README.md)

## Troubleshooting

### Porta 5173 já está em uso

```bash
npm run dev -- --port 3001
```

### Problemas de CORS

Certifique-se de que o backend possui CORS habilitado e que a URL está correta em `VITE_API_URL`.

### Módulos não encontrados

```bash
# Limpe node_modules e reinstale
rm -rf node_modules
npm install
```

## Licença

ISC

## Contribuindo

Para contribuir com melhorias, faça um fork do repositório e envie um pull request.

## Suporte

Para dúvidas ou issues, abra uma issue no repositório principal.
