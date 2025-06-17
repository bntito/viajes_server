const dbConfig = require('./config.js');
const { Sequelize, DataTypes } = require("sequelize");

let DB_DATABASE = dbConfig.database;
let DB_USER = dbConfig.user;
let DB_PASSWORD = dbConfig.password;
let DB_HOST = dbConfig.host;
let DB_PORT = dbConfig.port;
let DB_DIALECT = dbConfig.dialect;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
  }
});

sequelize.authenticate().then(() => {
  console.log('Conectado a la base de datos MySQL');
})
.catch((err) => {
  console.log('Error de conexión a la base de datos;', err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos
db.horasextras = require('../../models/mysql/horasExtras.js')(sequelize, DataTypes);
db.sueldomensual = require('../../models/mysql/sueldoMensual.js')(sequelize, DataTypes);
db.gasto = require('../../models/mysql/gasto.js')(sequelize, DataTypes);
db.compra = require('../../models/mysql/compra.js')(sequelize, DataTypes);
db.ahorro = require('../../models/mysql/ahorro.js')(sequelize, DataTypes);

// Relaciones
db.compra.hasMany(db.gasto, {
  foreignKey: 'compra_id',
  as: 'gastos', // para usar include: [{ model: Gasto, as: 'gastos' }]
});

db.gasto.belongsTo(db.compra, {
  foreignKey: 'compra_id',
});

db.sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos inicializada');
});

module.exports = db;
