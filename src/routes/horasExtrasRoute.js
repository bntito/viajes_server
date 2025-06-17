const express = require('express');
const router = express.Router();

const {
  addHorasExtras,
  getHorasExtras
} = require('../controller/horasExtrasController');

router.post('/horasextras', addHorasExtras);

router.get('/horasextras', getHorasExtras);

module.exports = router;
