const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCart = async (req, res) => {
    try {
      const { usuarioId } = req.params;
      
      let cart = await prisma.carrinho.findUnique({
        where: { usuarioId: Number(usuarioId) },
        include: { itens: { include: { evento: true } } }
      });
  
      if (!cart) {
        cart = await prisma.carrinho.create({
          data: { usuarioId: Number(usuarioId) },
          include: { itens: { include: { evento: true } } }
        });
      }
  
      return res.status(200).json(cart);
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
      return res.status(500).json({ error: 'Erro ao buscar carrinho' });
    }
  };

const addItem = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { eventoId, quantidade } = req.body;

    let cart = await prisma.carrinho.findUnique({
      where: { usuarioId: Number(usuarioId) }
    });

    if (!cart) {
      cart = await prisma.carrinho.create({
        data: { usuarioId: Number(usuarioId) }
      });
    }

    const existingItem = await prisma.carrinhoItem.findFirst({
      where: {
        carrinhoId: cart.id,
        eventoId: Number(eventoId)
      }
    });

    if (existingItem) {
      const updatedItem = await prisma.carrinhoItem.update({
        where: { id: existingItem.id },
        data: { quantidade: existingItem.quantidade + Number(quantidade) }
      });
      return res.status(200).json(updatedItem);
    }

    const newItem = await prisma.carrinhoItem.create({
      data: {
        carrinhoId: cart.id,
        eventoId: Number(eventoId),
        quantidade: Number(quantidade)
      },
      include: { evento: true }
    });

    return res.status(201).json({
      message: 'Item adicionado ao carrinho',
      item: newItem
    });
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
    return res.status(500).json({ error: 'Erro ao adicionar item ao carrinho' });
  }
};

const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantidade } = req.body;

    const updatedItem = await prisma.carrinhoItem.update({
      where: { id: Number(itemId) },
      data: { quantidade: Number(quantidade) },
      include: { evento: true }
    });

    return res.status(200).json({
      message: 'Item atualizado com sucesso',
      item: updatedItem
    });
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    return res.status(500).json({ error: 'Erro ao atualizar item do carrinho' });
  }
};

const removeItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    await prisma.carrinhoItem.delete({
      where: { id: Number(itemId) }
    });

    return res.status(200).json({ message: 'Item removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover item:', error);
    return res.status(500).json({ error: 'Erro ao remover item do carrinho' });
  }
};

const clearCart = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    await prisma.carrinhoItem.deleteMany({
      where: { carrinho: { usuarioId: Number(usuarioId) } }
    });

    return res.status(200).json({ message: 'Carrinho esvaziado com sucesso' });
  } catch (error) {
    console.error('Erro ao esvaziar carrinho:', error);
    return res.status(500).json({ error: 'Erro ao esvaziar carrinho' });
  }
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart
};