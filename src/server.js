// server.js
const express = require('express');
const cors = require('cors');
const eventoRoutes = require('./routes/eventoRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/eventos', eventoRoutes);

app.use('/usuário', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});