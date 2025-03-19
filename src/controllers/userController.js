const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const SECRET = process.env.JWT_SECRET;

const userRegister = async (req, res) => {
  try {
    const { email, password, nome } = req.body;

    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.usuario.create({
      data: {
        email,
        senha: hashedPassword, 
        nome,
        role: 'USER', 
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

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.senha);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        name: user.nome,
        role: user.role,
        email: user.email
      },
      SECRET,
      { expiresIn: '1h' }
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
