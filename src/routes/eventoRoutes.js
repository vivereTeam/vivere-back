const express = require('express');
const router = express.Router();
const {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
  getEventosByCategory,
  searchEventos,
  upload,
  uploadImage,
} = require('../controllers/eventoController');

const verifyToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: Endpoints para gerenciamento de eventos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Evento:
 *       type: object
 *       required:
 *         - titulo
 *         - descricao
 *         - categoria
 *       properties:
 *         id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descricao:
 *           type: string
 *         categoria:
 *           type: string
 *         preco:
 *           type: number
 *         dataInicio:
 *           type: string
 *           format: date-time
 *         imagemUrl:
 *           type: string
 *         endereco:
 *           type: string
 *       example:
 *         id: 1
 *         titulo: "Show de Rock"
 *         descricao: "Um show de rock imperdível."
 *         categoria: "SHOWS_ENTRETENIMENTO"
 *         preco: 50
 *         dataInicio: "2025-01-01T20:00:00Z"
 *         imagemUrl: "http://exemplo.com/imagem.jpg"
 *         endereco: "Av. Principal, 123"
 */

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Lista todos os eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Retorna a lista de todos os eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados para criação de um evento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       401:
 *         description: Acesso não autorizado (é preciso ser ADMIN)
 *       400:
 *         description: Erro na validação ou criação do evento
 */
router.get('/', getAllEventos);
router.post('/', verifyToken, checkRole('ADMIN'), createEvento);

/**
 * @swagger
 * /eventos/search:
 *   get:
 *     summary: Busca eventos com base em uma query string
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Texto de busca (por título, descrição etc.)
 *     responses:
 *       200:
 *         description: Retorna eventos que correspondem à busca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 */
router.get('/search', searchEventos);

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Retorna um evento específico pelo ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Retorna o evento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Evento não encontrado
 *   put:
 *     summary: Atualiza um evento específico
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     requestBody:
 *       description: Dados para atualização do evento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       401:
 *         description: Acesso não autorizado (é preciso ser ADMIN)
 *       404:
 *         description: Evento não encontrado
 *   delete:
 *     summary: Exclui um evento específico
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       204:
 *         description: Evento excluído com sucesso
 *       401:
 *         description: Acesso não autorizado (é preciso ser ADMIN)
 *       404:
 *         description: Evento não encontrado
 */
router.get('/:id', getEventoById);
router.put('/:id', verifyToken, checkRole('ADMIN'), updateEvento);
router.delete('/:id', verifyToken, checkRole('ADMIN'), deleteEvento);

/**
 * @swagger
 * /eventos/categoria/{id_categoria}:
 *   get:
 *     summary: Lista eventos de uma categoria específica
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador da categoria (por exemplo: SHOWS_ENTRETENIMENTO)
 *     responses:
 *       200:
 *         description: Retorna a lista de eventos da categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 */
router.get('/categoria/:id_categoria', getEventosByCategory);

/**
 * @swagger
 * /eventos/upload:
 *   post:
 *     summary: Faz upload de uma imagem associada a um evento
 *     tags: [Eventos]
 *     requestBody:
 *       description: Arquivo de imagem (multipart/form-data)
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Retorna informações sobre o upload da imagem
 *       400:
 *         description: Erro ao fazer upload
 */
router.post('/upload', upload.single('file'), uploadImage);

module.exports = router;
