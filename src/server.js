const express = require('express');
const cors = require('cors');
const eventoRoutes = require('./routes/eventoRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vivere+',
      version: '1.0.0',
      description: 'Documentação da API Vivere+',
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/eventos', eventoRoutes);
app.use('/usuario', userRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app, server };