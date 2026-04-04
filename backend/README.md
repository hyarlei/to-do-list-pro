# To-Do List Pro - Backend API

Esta é uma API RESTful para gerenciamento de tarefas, desenvolvida como parte do processo de onboarding na JIT Technology. O projeto foca em organização de camadas, tipagem forte com TypeScript e persistência de dados.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- Zod (Validação)
- CORS

## Funcionalidades

- ✅ Cadastro de Categorias (Trabalho, Estudo, Pessoal, etc.)
- ✅ Listagem de Categorias
- ✅ CRUD completo de Tarefas (Create, Read, Update, Delete)
- ✅ Filtro de tarefas por status (Pendente/Concluído)
- ✅ Relacionamento entre Tarefa e Categoria
- ✅ Validação com Zod
- ✅ Tratamento centralizado de erros
- ✅ CORS habilitado

## Como rodar o projeto

Siga os passos abaixo para configurar o ambiente localmente:

### 1. Clonar o projeto

```bash
git clone https://github.com/seu-usuario/todo-list-pro.git
cd todo-list-pro
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

### 4. Configurar banco de dados

```bash
npx prisma migrate dev --name init
```

### 5. Iniciar o servidor

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000` (ou a porta que você configurou).

## Rotas da API

### Categorias

|Método|Rota|Descrição|
|------|------|-----------|
|POST|/categories|Cadastra uma nova categoria|
|GET|/categories|Lista todas as categorias com contagem de tarefas|

### Tarefas

|Método|Rota|Descrição|
|------|------|-----------|
|POST|/tasks|Cria uma nova tarefa vinculada a uma categoria|
|GET|/tasks|Lista todas as tarefas (com filtro opcional por status)|
|GET|/tasks/:id|Busca uma tarefa específica|
|PATCH|/tasks/:id|Atualiza uma tarefa|
|DELETE|/tasks/:id|Deleta uma tarefa|

### Query Parameters

- `GET /tasks?completed=true` - Filtra tarefas concluídas
- `GET /tasks?completed=false` - Filtra tarefas pendentes

## Estrutura de pastas

```src/
  ├── http/
  │   ├── controllers/      # Controllers de Tarefas e Categorias
  │   ├── middleware/       # Middlewares (error-handler, validação)
  │   └── routes.ts         # Definição das rotas e validações Zod
  ├── use-cases/            # Lógica de negócio (CreateTaskUseCase)
  ├── repositories/         # Abstrações de banco de dados
  │   ├── prisma/           # Implementação com Prisma
  │   └── in-memory/        # Implementação em memória
  ├── lib/                  # Instância centralizada do Prisma
  ├── env/                  # Configuração de variáveis de ambiente
  ├── server.ts             # Ponto de entrada do servidor
  └── use-cases/
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
NODE_ENV=dev
PORT=3000
DATABASE_URL=file:./dev.db
JWT_SECRET=sua-chave-secreta-super-segura
```

## Scripts Disponíveis

```bash
npm run dev
npm run build
npm run test
```

## Exemplo de Requisição

### Criar uma categoria

```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Trabalho"}'
```

### Criar uma tarefa

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar TypeScript",
    "description": "Aprender generics e tipos avançados",
    "categoryId": 1,
    "completed": false
  }'
```

## Tratamento de Erros

A API retorna respostas padronizadas com status HTTP apropriados:

```json
{
  "error": "Validação falhou",
  "statusCode": 400,
  "details": [
    {
      "field": "title",
      "message": "Título é obrigatório"
    }
  ],
  "timestamp": "2026-03-31T12:00:00.000Z"
}
```

## Autor

Hyarlei Silva

- LinkedIn: [https://www.linkedin.com/in/hyarlei-silva]
- GitHub: [https://github.com/hyarlei]
