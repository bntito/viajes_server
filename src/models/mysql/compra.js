module.exports = (sequelize, DataTypes) => {
  const Compra = sequelize.define('compra', {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  });

  return Compra;
};
