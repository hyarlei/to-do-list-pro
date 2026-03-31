# 🚀 To-Do List Pro - Backend API

Esta é uma API RESTful para gerenciamento de tarefas, desenvolvida como parte do processo de onboarding na JIT Technology. O projeto foca em organização de camadas, tipagem forte com TypeScript e persistência de dados.

## Tecnologias Utilizadas

Node.js
TypeScript
Express
Prisma ORM
SQLite

## Funcionalidades

[x] Cadastro de Categorias (Trabalho, Estudo, Pessoal, etc.)
[x] Listagem de Categorias
[ ] CRUD completo de Tarefas (Create, Read, Update, Delete)
[ ] Filtro de tarefas por status (Pendente/Concluído)
[ ] Relacionamento entre Tarefa e Categoria

## Como rodar o projeto

Siga os passos abaixo para configurar o ambiente localmente:

1. clonar o projeto:
bash
git clone https://github.com/seu-usuario/todo-list-pro.git
cd todo-list-pro
2. Instalar dependências
npm install
3. Configurar banco de dados
npx prisma migrate dev --name init
4. Iniciar o servidor
npm run dev

A API estará disponível em http://localhost:3000 (ou a porta que você configurou).

## Rotas da API

Método,Rota,Descrição
POST,/categories,Cadastra uma nova categoria
GET,/categories,Lista todas as categorias
POST,/tasks,Cria uma nova tarefa vinculada a uma categoria
GET,/tasks,Lista todas as tarefas (com filtros)

## Estrutura de pastas

src/
  ├── controllers/  # Lógica de recebimento de requisições e respostas
  ├── services/     # Regras de negócio e integração com banco de dados
  ├── database/     # Configuração e instância do Prisma
  ├── routes.ts     # Definição das rotas da aplicação
  └── server.ts     # Ponto de entrada do servidor

## Autor

Hyarlei Silva
Linkedin:
GitHub: