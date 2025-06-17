const express = require('express');
const router = express.Router();

const {
  addAhorro,
  getAhorros,
} = require('../controller/ahorroController');

router.post('/ahorro', addAhorro);
router.get('/ahorro', getAhorros);

module.exports = router;
