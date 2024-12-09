const { Usuario } = require("../models");
const jwt = require("jsonwebtoken");

// Criar usuário
exports.createUsuario = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  try {
    const usuario = await Usuario.create({ nome, email, senha, role });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o usuário." });
  }
};

// Listar usuários
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os usuários." });
  }
};

// Deletar Usuario

exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    // Verificar se o usuário existe
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    await usuario.destroy(); // Deleta o usuário

    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o usuário." });
  }
};

// Registrar usuário
exports.registerUsuario = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const usuario = await Usuario.create({ nome, email, senha, role });
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar o usuário." });
  }
};

// Login de usuário
exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const senhaValida = await usuario.verificarSenha(senha);
    if (!senhaValida) {
      return res.status(400).json({ error: "Senha incorreta." });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: usuario.id, role: usuario.role }, // Payload
      "secreta",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login." });
  }
};
