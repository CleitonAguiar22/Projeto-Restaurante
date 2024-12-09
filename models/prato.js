"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prato extends Model {
    static associate(models) {}
  }
  Prato.init(
    {
      nome: DataTypes.STRING,
      descricao: DataTypes.STRING,
      valor: DataTypes.FLOAT,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Prato",
    }
  );
  return Prato;
};
