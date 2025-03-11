const request = require('supertest');
const { app, server } = require('./server.js');

afterAll(async () => {
  server.close();
});

describe('Testes das rotas de Eventos', () => {
  let eventoId;

  it('Deve criar um novo evento', async () => {
    const response = await request(app)
      .post('/eventos')
      .send({
        titulo: 'Show de Rock',
        descricao: 'Um show incrível de rock clássico.',
        endereco: 'Rua da Música, 123',
        dataInicio: '2023-12-01T19:00:00Z',
        dataTermino: '2023-12-01T23:00:00Z',
        ticketType: 'INGRESSO',
        imagemUrl: 'https://exemplo.com/show-rock.jpg',
        preco: 150.0,
        categoria: 'SHOWS_ENTRETENIMENTO',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    eventoId = response.body.id;
  });

  it('Deve retornar a lista de eventos', async () => {
    const response = await request(app).get('/eventos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve retornar um evento específico', async () => {
    const response = await request(app).get(`/eventos/${eventoId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(eventoId);
  });

  it('Deve atualizar um evento existente', async () => {
    const response = await request(app)
      .put(`/eventos/${eventoId}`)
      .send({
        titulo: 'Show de Rock Atualizado',
        descricao: 'Um show incrível de rock clássico com novidades.',
        endereco: 'Rua da Música, 123',
        dataInicio: '2023-12-01T19:00:00Z',
        dataTermino: '2023-12-01T23:00:00Z',
        ticketType: 'VIP',
        imagemUrl: 'https://exemplo.com/show-rock.jpg',
        preco: 200.0,
        categoria: 'SHOWS_ENTRETENIMENTO',
      });

    expect(response.status).toBe(200);
    expect(response.body.titulo).toBe('Show de Rock Atualizado');
  });

  it('Deve deletar um evento existente', async () => {
    const response = await request(app).delete(`/eventos/${eventoId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(eventoId);
  });

  it('Deve retornar eventos por categoria', async () => {
    const response = await request(app).get('/eventos/categoria/SHOWS_ENTRETENIMENTO');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve popular o banco de dados com eventos', async () => {
    const response = await request(app).post('/eventos/populate');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Banco populado com sucesso');
  });
});

describe('Testes das rotas de Usuário', () => {
  it('Deve registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/usuario/register')
      .send({
        email: 'novouser@exemplo.com',
        senha: 'senha123',
        nome: 'Novo Usuário',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve fazer login com um usuário existente', async () => {
    const response = await request(app)
      .post('/usuario/login')
      .send({
        email: 'novouser@exemplo.com',
        senha: 'senha123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Login bem-sucedido');
  });
});