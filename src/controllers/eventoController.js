const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

const populateDB = async (req, res) => {
  try {
    const eventos = [
      {
        titulo: 'Show de Rock',
        descricao: 'Um show incrível de rock clássico.',
        endereco: 'Rua da Música, 123',
        dataInicio: new Date('2023-12-01T19:00:00Z'),
        dataTermino: new Date('2023-12-01T23:00:00Z'),
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/show-rock.jpg',
        preco: 150.0,
        categoria: 'SHOWS_ENTRETENIMENTO',
      },
      {
        titulo: 'Festival de Jazz',
        descricao: 'Uma noite de jazz com grandes nomes da música.',
        endereco: 'Avenida das Artes, 456',
        dataInicio: new Date('2023-12-10T18:00:00Z'),
        dataTermino: new Date('2023-12-10T22:00:00Z'),
        ticketType: 'VIP',
        imagemUrl: 'https://exemplo.com/jazz-festival.jpg',
        preco: 200.0,
        categoria: 'SHOWS_ENTRETENIMENTO',
      },
      {
        titulo: 'Noite de Sertanejo',
        descricao: 'Os maiores sucessos do sertanejo universitário.',
        endereco: 'Praça da Música, 789',
        dataInicio: new Date('2023-12-15T20:00:00Z'),
        dataTermino: new Date('2023-12-15T23:30:00Z'),
        ticketType: 'GRATUITO',
        imagemUrl: 'https://exemplo.com/sertanejo-night.jpg',
        preco: 0.0,
        categoria: 'SHOWS_ENTRETENIMENTO',
      },
      {
        titulo: 'Festival EDM',
        descricao: 'Uma noite eletrizante com os melhores DJs do mundo.',
        endereco: 'Avenida da Música Eletrônica, 101',
        dataInicio: new Date('2023-12-20T22:00:00Z'),
        dataTermino: new Date('2023-12-21T05:00:00Z'),
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/edm-festival.jpg',
        preco: 300.0,
        categoria: 'SHOWS_ENTRETENIMENTO',
      },
      {
        titulo: 'Concerto de Orquestra',
        descricao: 'Uma noite de música clássica com orquestra sinfônica.',
        endereco: 'Teatro Municipal, 202',
        dataInicio: new Date('2023-12-25T20:00:00Z'),
        dataTermino: new Date('2023-12-25T22:00:00Z'),
        ticketType: 'VIP',
        imagemUrl: 'https://exemplo.com/orquestra.jpg',
        preco: 250.0,
        categoria: 'SHOWS_ENTRETENIMENTO',
      },

      {
        titulo: 'Passeio de Quadriciclo',
        descricao: 'Aventura off-road em trilhas emocionantes.',
        endereco: 'Estrada da Aventura, 303',
        dataInicio: new Date('2023-12-02T09:00:00Z'),
        dataTermino: new Date('2023-12-02T12:00:00Z'),
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/quadriciclo.jpg',
        preco: 120.0,
        categoria: 'AVENTURA_ADRENALINA',
      },
      {
        titulo: 'Salto de Paraquedas',
        descricao: 'Experimente a emoção de saltar de paraquedas.',
        endereco: 'Aeroporto da Aventura, 404',
        dataInicio: new Date('2023-12-07T10:00:00Z'),
        dataTermino: new Date('2023-12-07T15:00:00Z'),
        ticketType: 'VIP',
        imagemUrl: 'https://exemplo.com/paraquedas.jpg',
        preco: 500.0,
        categoria: 'AVENTURA_ADRENALINA',
      },
      {
        titulo: 'Rafting no Rio',
        descricao: 'Desafie as corredeiras em um emocionante rafting.',
        endereco: 'Rio das Emoções, 505',
        dataInicio: new Date('2023-12-12T08:00:00Z'),
        dataTermino: new Date('2023-12-12T12:00:00Z'),
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/rafting.jpg',
        preco: 180.0,
        categoria: 'AVENTURA_ADRENALINA',
      },
      {
        titulo: 'Tirolesa na Montanha',
        descricao: 'Deslize pelas alturas em uma tirolesa emocionante.',
        endereco: 'Montanha Radical, 606',
        dataInicio: new Date('2023-12-17T09:00:00Z'),
        dataTermino: new Date('2023-12-17T13:00:00Z'),
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/tirolesa.jpg',
        preco: 90.0,
        categoria: 'AVENTURA_ADRENALINA',
      },
      {
        titulo: 'Escalada em Rocha',
        descricao: 'Aprenda técnicas de escalada em rocha.',
        endereco: 'Parque das Pedras, 707',
        dataInicio: new Date('2023-12-22T10:00:00Z'),
        dataTermino: new Date('2023-12-22T16:00:00Z'),
        ticketType: 'VIP',
        imagemUrl: 'https://exemplo.com/escalada.jpg',
        preco: 220.0,
        categoria: 'AVENTURA_ADRENALINA',
      },

      {
        titulo: 'Jantar Gourmet',
        descricao: 'Um jantar sofisticado com pratos exclusivos.',
        endereco: 'Rua da Gastronomia, 808',
        dataInicio: new Date('2023-12-03T19:00:00Z'),
        dataTermino: new Date('2023-12-03T22:00:00Z'),
        ticketType: 'VIP',
        imagemUrl: 'https://exemplo.com/jantar-gourmet.jpg',
        preco: 350.0,
        categoria: 'GASTRONOMIA_DEGUSTACOES',
      },
      {
        titulo: 'Degustação de Vinhos',
        descricao: 'Experimente vinhos premiados de diferentes regiões.',
        endereco: 'Vinícola da Cidade, 909',
        dataInicio: new Date('2023-12-08T18:00:00Z'),
        dataTermino: new Date('2023-12-08T21:00:00Z'),
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/degustacao-vinhos.jpg',
        preco: 150.0,
        categoria: 'GASTRONOMIA_DEGUSTACOES',
      },
      {
        titulo: 'Workshop de Chocolates',
        descricao: 'Aprenda a fazer chocolates artesanais.',
        endereco: 'Rua do Chocolate, 1010',
        dataInicio: new Date('2023-12-13T14:00:00Z'),
        dataTermino: new Date('2023-12-13T17:00:00Z'),
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/workshop-chocolates.jpg',
        preco: 100.0,
        categoria: 'GASTRONOMIA_DEGUSTACOES',
      },
      {
        titulo: 'Feira de Comidas Típicas',
        descricao: 'Experimente pratos típicos de diversas culturas.',
        endereco: 'Praça da Gastronomia, 1111',
        dataInicio: new Date('2023-12-18T12:00:00Z'),
        dataTermino: new Date('2023-12-18T18:00:00Z'),
        ticketType: 'GRATUITO',
        imagemUrl: 'https://exemplo.com/feira-comidas.jpg',
        preco: 0.0,
        categoria: 'GASTRONOMIA_DEGUSTACOES',
      },
      {
        titulo: 'Curso de Cozinha Molecular',
        descricao: 'Descubra os segredos da cozinha molecular.',
        endereco: 'Rua da Inovação, 1212',
        dataInicio: new Date('2023-12-23T10:00:00Z'),
        dataTermino: new Date('2023-12-23T14:00:00Z'),
        ticketType: 'VIP',
        imagemUrl: 'https://exemplo.com/cozinha-molecular.jpg',
        preco: 280.0,
        categoria: 'GASTRONOMIA_DEGUSTACOES',
      },

      {
        titulo: 'Parque de Diversões',
        descricao: 'Diversão para toda a família com brinquedos incríveis.',
        endereco: 'Avenida da Diversão, 1313',
        dataInicio: new Date('2023-12-04T10:00:00Z'),
        dataTermino: new Date('2023-12-04T18:00:00Z'),
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/parque-diversoes.jpg',
        preco: 80.0,
        categoria: 'INFANTIL_FAMILIAR',
      },
      {
        titulo: 'Teatro Infantil',
        descricao: 'Peça teatral divertida para crianças e famílias.',
        endereco: 'Teatro da Cidade, 1414',
        dataInicio: new Date('2023-12-09T15:00:00Z'),
        dataTermino: new Date('2023-12-09T17:00:00Z'),
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/teatro-infantil.jpg',
        preco: 50.0,
        categoria: 'INFANTIL_FAMILIAR',
      },
      {
        titulo: 'Festa de Natal',
        descricao: 'Celebre o Natal com atividades e presentes para crianças.',
        endereco: 'Praça do Natal, 1515',
        dataInicio: new Date('2023-12-16T14:00:00Z'),
        dataTermino: new Date('2023-12-16T20:00:00Z'),
        ticketType: 'GRATUITO',
        imagemUrl: 'https://exemplo.com/festa-natal.jpg',
        preco: 0.0,
        categoria: 'INFANTIL_FAMILIAR',
      },
      {
        titulo: 'Cinema ao Ar Livre',
        descricao: 'Sessão de cinema infantil em ambiente aberto.',
        endereco: 'Parque da Cidade, 1616',
        dataInicio: new Date('2023-12-21T18:00:00Z'),
        dataTermino: new Date('2023-12-21T20:00:00Z'),
        ticketType: 'GRATUITO',
        imagemUrl: 'https://exemplo.com/cinema-ao-ar-livre.jpg',
        preco: 0.0,
        categoria: 'INFANTIL_FAMILIAR',
      },
      {
        titulo: 'Oficina de Pintura para Crianças',
        descricao: 'Atividade criativa para crianças se divertirem.',
        endereco: 'Rua da Arte, 1717',
        dataInicio: new Date('2023-12-26T10:00:00Z'),
        dataTermino: new Date('2023-12-26T12:00:00Z'),
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/oficina-pintura.jpg',
        preco: 30.0,
        categoria: 'INFANTIL_FAMILIAR',
      },
    ];
    await prisma.evento.createMany({
      data: eventos,
    });
    return res.status(200).json({ message: 'Banco populado com sucesso' });
  } catch (error) {
    console.error('Erro ao popular banco:', error);
    return res.status(500).json({ error: 'Erro ao popular banco' });
  }
};

module.exports = {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
  getEventosByCategory,
  populateDB,
};