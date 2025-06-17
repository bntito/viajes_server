module.exports = (sequelize, DataTypes) => {
  const Ahorro = sequelize.define('ahorro', {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    dia: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    mes: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    año: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
  });

  return Ahorro;
};
