const { Prato } = require("../models");

// Criar prato
exports.createPrato = async (req, res) => {
  const { nome, descricao, valor, img } = req.body;

  try {
    const prato = await Prato.create({ nome, descricao, valor, img });
    res.status(201).json(prato);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o prato." });
  }
};

// Listar pratos
exports.getPratos = async (req, res) => {
  try {
    const pratos = await Prato.findAll();
    res.status(200).json(pratos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar os pratos." });
  }
};

// Atualizar prato
exports.updatePrato = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, valor, img } = req.body;

  try {
    const prato = await Prato.findByPk(id);
    if (!prato) return res.status(404).json({ error: "Prato não encontrado." });

    prato.nome = nome || prato.nome;
    prato.descricao = descricao || prato.descricao;
    prato.valor = valor || prato.valor;
    prato.img = img || prato.img;

    await prato.save();
    res.status(200).json(prato);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o prato." });
  }
};

// Deletar prato
exports.deletePrato = async (req, res) => {
  const { id } = req.params;

  try {
    const prato = await Prato.findByPk(id);
    if (!prato) return res.status(404).json({ error: "Prato não encontrado." });

    await prato.destroy();
    res.status(200).json({ message: "Prato deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o prato." });
  }
};
