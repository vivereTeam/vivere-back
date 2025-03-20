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
  populateDB,
} = require('../controllers/eventoController');

const verifyToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole')

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
 *         - nome
 *         - descricao
 *         - data
 *         - categoriaId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do evento
 *         nome:
 *           type: string
 *           description: Nome do evento
 *         descricao:
 *           type: string
 *           description: Descrição do evento
 *         data:
 *           type: string
 *           format: date-time
 *           description: Data do evento
 *         categoriaId:
 *           type: integer
 *           description: ID da categoria do evento
 *       example:
 *         id: 1
 *         nome: "Festa de Aniversário"
 *         descricao: "Celebração de aniversário"
 *         data: "2023-01-01T00:00:00Z"
 *         categoriaId: 2
 */

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Retorna a lista de todos os eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 */
router.get('/', getAllEventos);

/**
 * @swagger
 * /eventos/search:
 *   get:
 *     summary: Retorna eventos que correspondem ao termo de pesquisa
 *     tags: [Eventos]
 *     parameters:
 *       - in: query
 *         name: q
 *         description: Termo de busca para filtrar eventos por nome ou descrição
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de eventos que correspondem à pesquisa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 *       400:
 *         description: Termo de busca não informado
 *       500:
 *         description: Erro interno
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
 *         description: ID do evento
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evento retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Evento não encontrado
 */
router.get('/:id', getEventoById);

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Eventos]
 *     requestBody:
 *       description: Dados do novo evento a ser criado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       400:
 *         description: Dados inválidos ou erro na criação do evento
 */
router.post('/', verifyToken, checkRole('ADMIN'), createEvento);

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Atualiza um evento existente
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do evento a ser atualizado
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Dados atualizados do evento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Evento não encontrado
 */
router.put('/:id', verifyToken, checkRole('ADMIN'), updateEvento);

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Exclui um evento pelo ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do evento a ser excluído
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Evento excluído com sucesso (sem conteúdo de retorno)
 *       404:
 *         description: Evento não encontrado
 */
router.delete('/:id', verifyToken, checkRole('ADMIN'), deleteEvento);

/**
 * @swagger
 * /eventos/categoria/{id_categoria}:
 *   get:
 *     summary: Retorna eventos filtrados por categoria
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         description: ID da categoria dos eventos
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de eventos filtrada por categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Categoria não encontrada
 */
router.get('/categoria/:id_categoria', verifyToken, getEventosByCategory);

/**
 * @swagger
 * /eventos/populate:
 *   post:
 *     summary: Popula o banco de dados com dados de teste
 *     tags: [Eventos]
 *     responses:
 *       201:
 *         description: Banco de dados populado com sucesso
 */
router.post('/populate', verifyToken, populateDB);

module.exports = router;
