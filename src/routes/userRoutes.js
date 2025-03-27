const express = require('express');
const {
  userLogin,
  userRegister,
  createAdmin,
  resetPassword,
} = require('../controllers/userController');

const router = express.Router();
const checkRole = require('../middleware/checkRole');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para autenticação e registro de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *       example:
 *         id: 1
 *         email: "usuario@example.com"
 *         password: "senha123"
 */

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Users]
 *     requestBody:
 *       description: Dados para autenticação do usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "usuario@example.com"
 *               password: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso. Retorna um token de autenticação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado para o usuário
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', userLogin);

/**
 * @swagger
 * /usuario/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       description: Dados para registro de um novo usuário
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos ou erro na criação do usuário
 */
router.post('/register', userRegister);

/**
 * @swagger
 * /usuario/admin:
 *   post:
 *     summary: Cria um novo administrador (somente para usuário OWNER)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Email e senha do novo administrador
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "admin@example.com"
 *               password: "admin123"
 *     responses:
 *       201:
 *         description: Admin criado com sucesso
 *       403:
 *         description: Acesso negado (apenas OWNER pode criar ADMIN)
 *       400:
 *         description: Erro ao criar administrador
 */
router.post('/admin', checkRole('OWNER'), createAdmin);

/**
 * @swagger
 * /usuario/reset-password:
 *   post:
 *     summary: Redefine a senha do usuário
 *     tags: [Users]
 *     requestBody:
 *       description: Email e nova senha
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             example:
 *               email: "usuario@example.com"
 *               newPassword: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao redefinir senha
 */
router.post('/reset-password', resetPassword);

module.exports = router;
