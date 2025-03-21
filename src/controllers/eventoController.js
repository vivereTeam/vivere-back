const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, baseName + '-' + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

const getAllEventos = async (req, res) => {
  try {
    const eventos = await prisma.evento.findMany();
    return res.status(200).json(eventos);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
};

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
    cardSize,
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
        cardSize,
      },
    });
    return res.status(201).json(novoEvento);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return res.status(500).json({ error: 'Erro ao criar evento' });
  }
};

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

const deleteEvento = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.evento.delete({
      where: { id: Number(id) },
    });
    return res.status(200).json({ id: Number(id) });
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    return res.status(500).json({ error: 'Erro ao deletar evento' });
  }
};

const getEventosByCategory = async (req, res) => {
  const { id_categoria } = req.params;
  try {
    const eventos = await prisma.evento.findMany({
      where: { categoria: id_categoria },
    });
    return res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao buscar eventos por categoria:', error);
    return res.status(500).json({ error: 'Erro ao buscar eventos por categoria' });
  }
};

const searchEventos = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Termo de busca não informado" });
    }

    const eventos = await prisma.evento.findMany({
      where: {
        OR: [
          { titulo: { contains: q, mode: "insensitive" } },
          { descricao: { contains: q, mode: "insensitive" } },
        ],
      },
    });

    return res.status(200).json(eventos);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return res.status(500).json({ error: "Erro ao buscar eventos" });
  }
};

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado" });
  }
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  return res.status(200).json({ imageUrl });
};

module.exports = {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
  getEventosByCategory,
  searchEventos,
  upload,
  uploadImage,
};
