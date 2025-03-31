const express = require('express');
const {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart
} = require('../controllers/cartController');

const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Carrinho
 *   description: Endpoints para gerenciamento do carrinho de compras
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CarrinhoItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         eventoId:
 *           type: integer
 *         quantidade:
 *           type: integer
 *         evento:
 *           $ref: '#/components/schemas/Evento'
 */

/**
 * @swagger
 * /carrinho/{usuarioId}:
 *   get:
 *     summary: Retorna o carrinho do usuário
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carrinho retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 usuarioId:
 *                   type: integer
 *                 itens:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CarrinhoItem'
 *       404:
 *         description: Carrinho não encontrado
 */
router.get('/:usuarioId', verifyToken, getCart);

/**
 * @swagger
 * /carrinho/{usuarioId}/itens:
 *   post:
 *     summary: Adiciona item ao carrinho
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventoId:
 *                 type: integer
 *               quantidade:
 *                 type: integer
 *             example:
 *               eventoId: 1
 *               quantidade: 2
 *     responses:
 *       201:
 *         description: Item adicionado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/:usuarioId/itens', verifyToken, addItem);

/**
 * @swagger
 * /carrinho/itens/{itemId}:
 *   put:
 *     summary: Atualiza quantidade de um item
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade:
 *                 type: integer
 *             example:
 *               quantidade: 3
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.put('/itens/:itemId', verifyToken, updateItem);

/**
 * @swagger
 * /carrinho/itens/{itemId}:
 *   delete:
 *     summary: Remove item do carrinho
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.delete('/itens/:itemId', verifyToken, removeItem);

/**
 * @swagger
 * /carrinho/{usuarioId}/limpar:
 *   delete:
 *     summary: Limpa todos os itens do carrinho
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carrinho limpo com sucesso
 */
router.delete('/:usuarioId/limpar', verifyToken, clearCart);

module.exports = router;