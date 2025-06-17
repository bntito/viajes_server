module.exports = (sequelize, DataTypes) => {
  const Gasto = sequelize.define('gasto', {
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    compra_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Gasto;
};
