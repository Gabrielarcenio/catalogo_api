const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes'); // Corrigido o caminho para 'routes'
const apiRoutes = require('./routes/apiRoutes');   // Corrigido o caminho para 'routes'
const verifyToken = require('./middleware/authMiddleware'); // Corrigido o caminho para 'middleware'

const app = express();
const port = 3000;

// Configuração do Swagger
const swaggerOptions = {
  definition: {
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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Certifique-se de que este caminho esteja correto
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para JSON
app.use(express.json());

// Suas rotas e middlewares
app.use('/auth', authRoutes);
app.use('/apis', verifyToken, apiRoutes);

// Iniciar o servidor
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
