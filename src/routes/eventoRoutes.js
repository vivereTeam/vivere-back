const express = require('express');
const {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
} = require('../controllers/eventoController');

const router = express.Router();

router.get('/', getAllEventos);

router.get('/:id', getEventoById);

router.post('/', createEvento);

router.put('/:id', updateEvento);

router.delete('/:id', deleteEvento);

module.exports = router;
