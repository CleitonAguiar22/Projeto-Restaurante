const { Sequelize } = require("sequelize");
const path = require("path"); // Importar path para criar o caminho correto do arquivo SQLite

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../database.sqlite"), // Caminho correto para o banco de dados SQLite
});

module.exports = sequelize;
