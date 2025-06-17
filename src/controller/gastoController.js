const db = require('../config/mysql/configDB');
const Gasto = db.gasto;
const Compra = db.compra;

const addGasto = async (req, res) => {
  const { fecha, total, articulos } = req.body;

  if (!fecha || isNaN(total) || !Array.isArray(articulos) || articulos.length === 0) {
    return res.status(400).json({
      message: "Datos inválidos. Se requiere fecha, total y al menos un artículo.",
    });
  }

  try {
    // Crear la compra principal
    const nuevaCompra = await Compra.create({ fecha, total });

    // Registrar cada gasto con referencia a la compra
    const nuevosGastos = await Promise.all(
      articulos.map((item) => {
        const { descripcion, monto } = item;

        if (!descripcion || isNaN(monto)) {
          throw new Error("Cada artículo debe tener descripción y monto válido.");
        }

        return Gasto.create({
          fecha,
          descripcion,
          monto,
          compra_id: nuevaCompra.id,
        });
      })
    );

    res.status(201).json({
      status: "201",
      dataApi: {
        compra: nuevaCompra,
        articulos: nuevosGastos,
      },
      message: "Compra registrada con éxito",
    });
  } catch (error) {
    console.error("Error al registrar la compra:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

const getGastos = async (req, res) => {
  const { mes, anio } = req.query;

  let whereCompra = {};
  if (mes && anio) {
    const { Op, fn, col, where } = require('sequelize');

    whereCompra = where(
      fn('DATE_FORMAT', col('compra.fecha'), '%Y-%m'),
      `${anio}-${mes.padStart(2, '0')}`
    );
  }

  try {
    const compras = await Compra.findAll({
      where: whereCompra,
      order: [['fecha', 'DESC']],
      include: [
        {
          model: Gasto,
          as: 'gastos',
        },
      ],
    });

    res.status(200).json({
      status: "200",
      dataServerResult: compras,
      message: "Compras y gastos obtenidos correctamente",
    });
  } catch (error) {
    console.error("Error al obtener las compras y gastos:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

const updateGasto = async (req, res) => {
  const { id } = req.params;
  const { fecha, total } = req.body;

  if (!fecha || isNaN(total)) {
    return res.status(400).json({ message: "Datos inválidos. Se requiere fecha y total." });
  }

  try {
    const compra = await Compra.findByPk(id);
    if (!compra) return res.status(404).json({ message: "Compra no encontrada" });

    await compra.update({ fecha, total });

    res.status(200).json({
      status: "200",
      message: "Compra actualizada correctamente",
      dataApi: compra
    });
  } catch (error) {
    console.error("Error al actualizar la compra:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

const deleteGasto = async (req, res) => {
  const { id } = req.params;

  try {
    const compra = await Compra.findByPk(id);
    if (!compra) return res.status(404).json({ message: "Compra no encontrada" });

    // Borrar artículos relacionados
    await Gasto.destroy({ where: { compra_id: id } });

    // Borrar la compra
    await compra.destroy();

    res.status(200).json({
      status: "200",
      message: "Compra y gastos asociados eliminados correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar la compra:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

module.exports = {
  addGasto,
  getGastos,
  updateGasto,
  deleteGasto
};
