// eventoController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Event Routes
// Get all events
const getAllEventos = async (req, res) => {
  try {
    const eventos = await prisma.evento.findMany();
    return res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
};


// Get event
const getEventoById = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await prisma.evento.findUnique({
      where: { id: Number(id) },
    });
    if (!evento) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }
    return res.status(200).json(evento);
  } catch (error) {
    console.error('Erro ao buscar evento:', error);
    return res.status(500).json({ error: 'Erro ao buscar evento' });
  }
};

// Create event
const createEvento = async (req, res) => {
  const {
    titulo,
    descricao,
    endereco,
    dataInicio,
    dataTermino,
    ticketType,
    imagemUrl,
    preco,
    categoria,
  } = req.body;
  try {
    const novoEvento = await prisma.evento.create({
      data: {
        titulo,
        descricao,
        endereco,
        dataInicio: dataInicio ? new Date(dataInicio) : null,
        dataTermino: dataTermino ? new Date(dataTermino) : null,
        ticketType,
        imagemUrl,
        preco: Number(preco),
        categoria,
      },
    });
    return res.status(201).json(novoEvento);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return res.status(500).json({ error: 'Erro ao criar evento' });
  }
};

// Update event
const updateEvento = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descricao,
    endereco,
    dataInicio,
    dataTermino,
    ticketType,
    imagemUrl,
    preco,
    categoria,
  } = req.body;
  try {
    const eventoAtualizado = await prisma.evento.update({
      where: { id: Number(id) },
      data: {
        titulo,
        descricao,
        endereco,
        dataInicio: dataInicio ? new Date(dataInicio) : null,
        dataTermino: dataTermino ? new Date(dataTermino) : null,
        ticketType,
        imagemUrl,
        preco: Number(preco),
        categoria,
      },
    });
    return res.status(200).json(eventoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar evento:', error);
    return res.status(500).json({ error: 'Erro ao atualizar evento' });
  }
};

// Delete event
const deleteEvento = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.evento.delete({
      where: { id: Number(id) },
    });
    return res.status(200).json({ message: 'Evento deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    return res.status(500).json({ error: 'Erro ao deletar evento' });
  }
};


// User Routes
// User login
const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });
    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    return res.status(200).json({ message: 'Login bem-sucedido', usuario });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

// User register
const register = async (req, res) => {
  const { email, senha, nome } = req.body;
  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }
    const novoUsuario = await prisma.usuario.create({
      data: { email, senha, nome },
    });
    return res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};



module.exports = {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
};