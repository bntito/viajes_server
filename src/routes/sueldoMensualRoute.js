const express = require('express');
const router = express.Router();

const {
  addSueldoMensual,
  getSueldosMensuales
} = require('../controller/sueldoMensualController');

router.post('/sueldomensual', addSueldoMensual);

router.get('/sueldomensual', getSueldosMensuales);

module.exports = router;
