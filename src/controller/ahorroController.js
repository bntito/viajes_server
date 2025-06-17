const db = require('../config/mysql/configDB');
const Ahorro = db.ahorro;

const addAhorro = async (req, res) => {
  const { fecha, monto, dia, mes, año } = req.body;

  if (!fecha || !monto || !dia || !mes || !año) {
    return res.status(400).json({
      message: "Datos incompletos. Se requiere fecha, monto, día, mes y año.",
    });
  }

  try {
    const nuevoAhorro = await Ahorro.create({
      fecha,
      monto,
      dia,
      mes,
      año,
    });

    res.status(201).json({
      status: "201",
      dataApi: nuevoAhorro,
      message: "Ahorro registrado con éxito",
    });
  } catch (error) {
    console.error("Error al registrar el ahorro:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

const getAhorros = async (req, res) => {
  try {
    const ahorros = await Ahorro.findAll({
      order: [['fecha', 'DESC']],
    });

    res.status(200).json({
      status: "200",
      dataServerResult: ahorros,
      message: "Ahorros obtenidos correctamente",
    });
  } catch (error) {
    console.error("Error al obtener los ahorros:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

module.exports = {
  addAhorro,
  getAhorros,
};
