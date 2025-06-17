module.exports = (sequelize, DataTypes) => {
  const SueldoMensual = sequelize.define('sueldomensual', {
    sueldoMensual: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    diaDeCobro: { type: DataTypes.INTEGER, allowNull: false }, // ej: día del mes
    descuentos: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    usoTicketComida: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    adelanto: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    mes: { type: DataTypes.STRING(10), allowNull: false },
    año: { type: DataTypes.INTEGER, allowNull: false }
  });

  return SueldoMensual;
};
