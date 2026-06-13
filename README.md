# Projeto CI/CD - Gestão de Configuração de Software

## Requisitos Atendidos

- **10+ arquivos**: 19 arquivos de código fonte
- **20+ métodos/funções**: Mais de 50 funções implementadas
- **Testes automatizados**: Unitários, Integração e Aceitação
- **CI/CD com CircleCI**: Pipeline completo
- **Build automatizado**: Docker + Node.js
- **Deploy contínuo**: Railway/Heroku

## Como executar localmente

```bash
npm install
npm start
# ou
npm run dev
```
## Testes

```bash
npm test                 # todos os testes
npm run test:unit        # apenas unitários
npm run test:integration # apenas integração
npm run test:acceptance  # apenas aceitação
```
## API Endpoints
- Método	Endpoint	    Descrição
- GET	    /health	        Health check
- POST	    /api/users	    Criar usuário
- GET	    /api/users	    Listar usuários
- GET	    /api/users/:id	Buscar usuário
- PUT	    /api/users/:id	Atualizar usuário
- DELETE	/api/users/:id	Deletar usuário
- GET	    /api/stats	    Estatísticas

## Pipeline CI/CD
Commit na main → dispara CircleCI
Build → npm ci
Testes Unitários → Jest
Testes de Integração → Supertest
Testes de Aceitação → End-to-end
Build Docker → imagem criada
Push para Docker Hub
Deploy → Railway/Heroku

## Estrutura do Projeto
├── .circleci/config.yml   # Pipeline CI/CD
├── src/                   # Código fonte
│   ├── controllers/       # Controladores
│   ├── services/          # Lógica de negócio
│   ├── models/            # Modelos de dados
│   ├── utils/             # Utilitários
│   ├── middlewares/       # Middlewares
│   └── app.js             # App Express
├── tests/                 # Testes
│   ├── unit/              # Unitários
│   ├── integration/       # Integração
│   └── acceptance/        # Aceitação
├── Dockerfile             # Containerização
└── server.js              # Entry point

## Configurando o CircleCI

1. Faça o push do código para um repositório no GitHub
2. Acesse [CircleCI](https://app.circleci.com/) e conecte seu GitHub
3. Adicione o projeto no CircleCI
4. Configure as variáveis de ambiente no CircleCI:
   - `DOCKERHUB_USERNAME`
   - `DOCKERHUB_PASSWORD`
   - `RAILWAY_WEBHOOK_TOKEN` (opcional, para deploy)