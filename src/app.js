const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');
const Logger = require('./utils/logger');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint (para teste de aceitação)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rotas
app.use('/api', userRoutes);

// Tratamento de erros
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;