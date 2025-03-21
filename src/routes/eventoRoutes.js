const express = require('express');
const router = express.Router();
const {
  getAllEventos,
  getEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
  getEventosByCategory,
  searchEventos,
  upload,
  uploadImage,
} = require('../controllers/eventoController');

const verifyToken = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

router.get('/', getAllEventos);

router.get('/search', searchEventos);

router.get('/:id', getEventoById);

router.post('/', verifyToken, checkRole('ADMIN'), createEvento);

router.put('/:id', verifyToken, checkRole('ADMIN'), updateEvento);

router.delete('/:id', verifyToken, checkRole('ADMIN'), deleteEvento);

router.get('/categoria/:id_categoria', getEventosByCategory);

router.post('/upload', upload.single('file'), uploadImage);

module.exports = router;
