const db = require('../config/mysql/configDB');
const SueldoMensual = db.sueldomensual;

// Crear un nuevo registro de sueldo mensual
const addSueldoMensual = async (req, res) => {
  const newRegistro = {
    sueldoMensual: req.body.sueldoMensual,
    diaDeCobro: req.body.diaDeCobro,
    descuentos: req.body.descuentos,
    usoTicketComida: req.body.usoTicketComida,
    adelanto: req.body.adelanto,
    mes: req.body.mes,
    año: req.body.año
  };

  try {
    console.log(req.body); // Depuración
    const register = await SueldoMensual.create(newRegistro);
    res.status(201).json({
      status: "201",
      dataApi: register,
      message: "El registro fue creado"
    });
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({
      message: "Error interno del servidor al crear el registro",
      error: error.message
    });
  }
};

// Obtener todos los registros de sueldo mensual
const getSueldosMensuales = async (req, res) => {
  const { mes, anio } = req.query;

  const filtro = {};
  if (mes) filtro.mes = mes;
  if (anio) filtro.año = parseInt(anio);

  try {
    const registros = await SueldoMensual.findAll({ where: filtro });
    res.status(200).json({
      status: "200",
      dataServerResult: registros,
      message: "Registros obtenidos exitosamente"
    });
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
  }
};


module.exports = {
  addSueldoMensual,
  getSueldosMensuales
};
