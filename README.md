# To-Do List Pro

> Uma aplicação full-stack moderna e intuitiva para gerenciamento de tarefas e produtividade pessoal.

## Sobre o Projeto

To-Do List Pro é uma solução completa para organização e gerenciamento de tarefas. A aplicação permite que os usuários criem, categorizem e acompanhem suas atividades de forma eficiente, com uma interface responsiva e um backend robusto.

## Arquitetura

O projeto segue uma arquitetura **full-stack** bem definida, separando completamente a camada de apresentação da lógica de negócio:

```To-Do-List-Pro/
├── backend/          # API RESTful em Node.js + Express + TypeScript
└── frontend/         # Interface em React + Vite
```

### Backend

- **Tecnologias**: Node.js, Express, TypeScript, Prisma ORM, SQLite
- **Padrões**: Use Cases, Repositories, Dependency Injection
- **Validação**: Zod
- **Documentação**: Veja [backend/README.md](backend/README.md)

### Frontend  

- **Tecnologias**: React 19, Vite, JavaScript/JSX
- **Padrões**: Componentes funcionais, Hooks
- **Build**: Otimizado para produção
- **Documentação**: Veja [frontend/README.md](frontend/README.md)

## Funcionalidades

- ✅ Criação e gerenciamento de tarefas
- ✅ Organização por categorias (Trabalho, Estudo, Pessoal, etc.)
- ✅ Marcação de conclusão de tarefas
- ✅ Edição e exclusão de tarefas
- ✅ Filtro por status (Pendente/Concluído)
- ✅ Interface intuitiva e responsiva
- ✅ Validação robusta de dados
- ✅ Tratamento centralizado de erros

## Como Iniciar

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### 1. Clonar o projeto

```bash
git clone https://github.com/hyarlei/to-do-list-pro.git
cd to-do-list-pro
```

### 2. Configurar Backend

```bash
cd backend
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

A API estará disponível em `http://localhost:3333`

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Stack Tecnológico

### Back end

|Tecnologia|Versão|Propósito|
|-----------|--------|----------|
|Node.js|LTS|Runtime JavaScript|
|Express|^5.2.1|Framework web|
|TypeScript|^6.0.2|Type safety|
|Prisma|^7.6.0|ORM|
|SQLite|-|Banco de dados|
|Zod|^4.3.6|Validação de schema|
|CORS|^2.8.6|Cross-origin requests|

### Front end

|Tecnologia|Versão|Propósito|
|-----------|--------|----------|
|React|^19.2.4|Biblioteca UI|
|Vite|^8.0.1|Build tool|
|ESLint|^9.39.4|Linter|

## Documentação Detalhada

- **[Backend README](backend/README.md)** - Guia de configuração, endpoints e desenvolvimento da API
- **[Frontend README](frontend/README.md)** - Guia de componentes, estrutura e desenvolvimento da interface

## Autor

Hyarlei Silva

## Licença

ISC

## Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

Feito com ❤️ para melhorar sua produtividade.
