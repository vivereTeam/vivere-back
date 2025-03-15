const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const userLogin = async (req, res) => {
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
  
const userRegister = async (req, res) => {
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

  async function hashPassword(plainPassword) {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  }

  async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

const createOwner = async (req, res) => {
  const { email, senha, nome } = req.body;
  try  {
    const existingOwner = await prisma.usuario.findFirst({
      where: { role: 'OWNER' }
    });

    if(existingOwner) {
      return res.status(400).json({ error: "já existe um owner cadastrado" });
  }

    const newOwner = await prisma.usuario.create({
      data: {
        email,
        senha,
        nome,
        role: 'OWNER'
      }
    });

    return res.status(200).json(newOwner)
  } catch(error) {
    return res.status(500).json({ error: "Erro ao criar owner" });
  }
};

module.exports = {
  userLogin,
  userRegister,
  createOwner
};