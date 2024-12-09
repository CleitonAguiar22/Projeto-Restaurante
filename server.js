const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const comentariosRoutes = require("./routes/comentarios");
const carrinhoRoutes = require("./routes/carrinhoRoutes");
const pratoRoutes = require("./routes/pratoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

app.use("/api/comentarios", comentariosRoutes);
app.use("/api/carrinhos", carrinhoRoutes);
app.use("/api/pratos", pratoRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
  res.send("API do Restaurante");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
