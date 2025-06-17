const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const path = require('path');

require('./config/mysql/configDB.js');

app.use(cors({
  origin: ['http://localhost:5173', 'https://devuelo.onrender.com'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/public/html/welcome.html');
});

/* Acceso rutas MySQL DB */
app.use('/api', require('./routes/horasExtrasRoute.js'));
app.use('/api', require('./routes/sueldoMensualRoute.js'));
app.use('/api', require('./routes/gastoRoutes.js'));
app.use('/api', require('./routes/ahorroRoutes.js'));

/* Ruta para mantener vivo el server */
app.get('/api/ping', (req, res) => {
  res.status(200).send('pong');
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/public/html/404.html');
});

app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
