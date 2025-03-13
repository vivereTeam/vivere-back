const express = require('express');
const {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
  getEventosByCategory,
  populateDB,
} = require('../controllers/eventoController');

const router = express.Router();

router.get('/', getAllEventos);
router.get('/:id', getEventoById);
router.post('/', createEvento);
router.put('/:id', updateEvento);
router.delete('/:id', deleteEvento);
router.get('/categoria/:id_categoria', getEventosByCategory);
router.post('/populate', populateDB);

module.exports = router;