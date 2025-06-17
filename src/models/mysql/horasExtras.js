module.exports = (sequelize, DataTypes) => {
  const horasextras = sequelize.define('horasextras', {
    fecha: { type: DataTypes.STRING(20), allowNull: true },
    horasExtras: { type: DataTypes.STRING(5), allowNull: true },
    ciudad: { type: DataTypes.BOOLEAN, allowNull: true },
    tipoDia: { type: DataTypes.STRING(20), allowNull: true },
    descripcion: { type: DataTypes.STRING(200), allowNull: true }
  });

  return horasextras;
};
