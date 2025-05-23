## 📌 Planejamento do Projeto

Esse projeto foi idealizado através de um modelo de aplicação Full Stack dispolibilizada pelo professor que serviu como exemplo para esse meu projeto, serviu de um escopo para que eu pudesse entender como funcionava a aplicação, com o entuito de colocá-lo para funcionar.
O planejamento inicial contemplou a definição clara dos requisitos funcionais e não funcionais, a arquitetura do sistema, a escolha das tecnologias e a divisão do trabalho em etapas iterativas (sprints).

As fases foram:

- Levantamento de requisitos e escopo.

- Prototipação da interface com ferramentas de design.

- Desenvolvimento backend (API REST).

- Desenvolvimento frontend (integração com a API).

- Testes e ajustes finais.

---

## 🕒 Quantidade de Sprints Utilizadas

O projeto foi dividido em 2 sprints.

---

## ⏳ Duração das Sprints

Cada sprint teve uma duração de 2 semanas, totalizando 4 semanas de desenvolvimento ativo.

---

## 🚀 Metodologia Ágil Utilizada


- Planejamento no início de cada sprint

- Revisão e retrospectiva ao final de cada sprint

- O foco foi manter o ciclo de feedback constante e iterativo, garantindo entregas incrementais.

---

## ⚙️ Tecnologias Utilizadas

- **Frontend**: React, JavaScript, React Scripts
- **Backend**: Node.js, Express, JWT, Bcrypt, pg (PostgreSQL)
- **Banco de Dados**: PostgreSQL 14
- **Outros**: Docker, Docker Compose
- **Postmam**: Para fazer o teste de Login
---

## 🚀 Etapas de Desenvolvimento

### 1. Backend
- Criado com Express.
- Conexão com banco PostgreSQL usando `pg`.
- Implementadas rotas:
  - `POST /api/register`: cadastro de usuários.
  - `POST /api/login`: autenticação JWT.
  - `GET /api/usuarios`: listagem de usuários (sem senha).
  - `GET /api/protegida`: exemplo de rota protegida por token.
  - Tokens JWT para autenticação.
  - http://localhost:5000/api/login
  - http://localhost:5000/api/usuarios
  
  ---

### 2. Frontend
- Desenvolvido com Create React App.
- Interface simples para registro, login e exibição de dados protegidos.
- http://localhost:3000

### 3. Banco de Dados
- Serviço PostgreSQL configurado via Docker Compose.
- Tabela `users` criada automaticamente no início da aplicação backend.

---

## 🐳 Conteinerização com Docker

### Dockerfile (backend)
- Baseado na imagem `node:18`.
- Instala dependências e inicia o servidor com `node index.js`.

### Dockerfile (frontend)
- Baseado na imagem `node:18`.
- Executa `npm start` para iniciar o app React.

### docker-compose.yml
- Define os três serviços: `backend`, `frontend`, `postgres_db`.
- Utiliza rede interna para comunicação entre containers.

---

## 🔄 Fluxo de Desenvolvimento

1. Criação dos serviços em containers com `docker-compose up --build`.
2. O backend se conecta automaticamente ao PostgreSQL.
3. O frontend se comunica com o backend em `http://localhost:5000`.

---

## 🧩 Desafios Enfrentados e Soluções Adotadas

🔹 Integração entre Frontend e Backend
Desafio: Dificuldade na comunicação inicial entre o frontend e a API devido ao CORS.
Solução: Configuração correta dos headers CORS no backend (CORS middleware).

🔹 Gerenciamento de dependências no ambiente
Desafio: Diferenças de ambiente entre desenvolvedores causavam erros de execução.
Solução: Adoção do Docker para padronizar e isolar o ambiente de desenvolvimento.

---

## 👨‍💻 Autor

- Nome: *[Arsidney Martins da Rocha P5 B Noite]*
- Projeto acadêmico desenvolvido com foco em integração, autenticação e conteinerização.

