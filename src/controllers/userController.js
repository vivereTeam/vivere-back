const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

/**
 * userRegister:
 *  - Recebe email, senha, nome e cria um novo usuário no banco
 *  - Armazena a senha com hash (bcrypt)
 */
const userRegister = async (req, res) => {
  try {
    const { email, password, nome } = req.body;

    // Verificar se já existe usuário com esse email
    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Fazer hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário no banco
    const newUser = await prisma.usuario.create({
      data: {
        email,
        senha: hashedPassword, // salva hash em vez da senha
        nome,
        role: 'USER', // se quiser default como USER
      },
    });

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      usuario: {
        id: newUser.id,
        email: newUser.email,
        nome: newUser.nome,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

/**
 * userLogin:
 *  - Recebe email e password
 *  - Verifica o usuário no banco
 *  - Compara o hash com bcrypt.compare
 *  - Gera token JWT se credenciais estiverem certas
 */
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário pelo email
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.senha);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        name: user.nome,
        role: user.role,
        email: user.email
      },
      SECRET,
      { expiresIn: '1h' } // expira em 1 dia, por exemplo
    );

    return res.status(200).json({
      message: 'Login bem-sucedido',
      token,
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

/**
 * createAdmin:
 *  - Exemplo de rota para criar usuário com role ADMIN
 *  - Se quiser restringir, proteja com middleware e checar se role é OWNER ou algo do tipo
 */
const createAdmin = async (req, res) => {
  try {
    const { email, password, nome } = req.body;

    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.usuario.create({
      data: {
        email,
        senha: hashedPassword,
        nome,
        role: 'ADMIN',
      },
    });

    return res.status(201).json({
      message: 'Admin criado com sucesso',
      usuario: {
        id: newAdmin.id,
        email: newAdmin.email,
        nome: newAdmin.nome,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error('Erro ao criar admin:', error);
    return res.status(500).json({ error: 'Erro ao criar admin' });
  }
};

module.exports = {
  userLogin,
  userRegister,
  createAdmin,
};
