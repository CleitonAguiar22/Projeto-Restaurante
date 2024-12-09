module.exports = (sequelize, DataTypes) => {
  const Carrinho = sequelize.define("Carrinho", {
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

  Carrinho.associate = (models) => {
    Carrinho.belongsTo(models.Usuario, {
      foreignKey: "usuarioId",
      as: "usuario",
    });

    Carrinho.belongsTo(models.Prato, {
      foreignKey: "pratoId",
      as: "prato",
    });
  };

  return Carrinho;
};
