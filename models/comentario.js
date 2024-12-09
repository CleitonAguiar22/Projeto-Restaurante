module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define("Comentario", {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pratoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
      as: "usuario",
    });
    Comentario.belongsTo(models.Prato, {
      foreignKey: "pratoId",
      as: "prato",
    });
  };

  return Comentario;
};
