const db = require('../config/mysql/configDB');
const horasextras = db.horasextras;

// Función para agregar un registro de horas extras
const addHorasExtras = async (req, res) => {
  const newRegistro = {
    fecha: req.body.fecha,
    horasExtras: req.body.horasExtras,
    ciudad: req.body.ciudad,
    tipoDia: req.body.tipoDia,
    descripcion: req.body.descripcion
  };

  try {
    // Verifica que los datos se estén recibiendo correctamente
    console.log(req.body);

    // Crear el registro en la base de datos
    const register = await horasextras.create(newRegistro);
    
    res.status(201).json({
      status: "201",
      dataApi: register,
      message: "El registro fue creado"
    });
  } catch (error) {
    // Log de error para depuración
    console.error('Error al crear el registro:', error);

    // Respuesta más detallada con el error
    res.status(500).json({
      message: "Error interno del servidor al crear el registro",
      error: error.message
    });
  }
};

// Función para obtener todos los registros de horas extras
const getHorasExtras = async (req, res) => {
  console.log("Solicitud recibida para obtener horas extras");
  try {
    const registros = await horasextras.findAll();
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
  addHorasExtras,
  getHorasExtras
};
