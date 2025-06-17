const express = require('express');
const router = express.Router();

const {
  addGasto,
  getGastos,
  updateGasto,
  deleteGasto
} = require('../controller/gastoController');

router.post('/gasto', addGasto);
router.get('/gasto', getGastos);
router.put('/gasto/:id', updateGasto);
router.delete('/gasto/:id', deleteGasto);

module.exports = router;
