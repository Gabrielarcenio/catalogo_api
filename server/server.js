// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/apiRoutes'); // Importa as rotas de APIs
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
const verifyToken = require('./middleware/authMiddleware'); // Middleware de autenticação

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port = 3000;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost/catalogo-api', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Middleware para analisar JSON
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Catálogo de APIs',
      version: '1.0.0',
      description: 'Documentação interativa do catálogo de APIs',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas de Autenticação
app.use('/auth', authRoutes); // Rota base para autenticação

// Protege a rota de APIs usando middleware de autenticação
app.use('/apis', verifyToken, apiRoutes); // Rota protegida para APIs

// Inicia o servidor
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
