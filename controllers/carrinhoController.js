const { Carrinho, Prato, Usuario } = require("../models");

// Adicionar item ao carrinho
exports.adicionarAoCarrinho = async (req, res) => {
  const { pratoId, quantidade, usuarioId } = req.body;

  try {
    const prato = await Prato.findByPk(pratoId);
    if (!prato) {
      return res.status(404).json({ error: "Prato não encontrado." });
    }

    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const itemCarrinho = await Carrinho.create({
      usuarioId,
      pratoId,
      quantidade,
    });

    res.status(201).json(itemCarrinho);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar item ao carrinho." });
  }
};

// Listar itens no carrinho
exports.listarCarrinho = async (req, res) => {
  const { usuarioId } = req.body;

  try {
    const itensCarrinho = await Carrinho.findAll({
      where: { usuarioId },
      include: [
        {
          model: Prato,
          as: "prato",
          attributes: ["nome", "valor"],
        },
      ],
    });

    if (itensCarrinho.length === 0) {
      return res.status(404).json({ error: "Carrinho vazio." });
    }

    res.status(200).json(itensCarrinho);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar itens do carrinho." });
  }
};

// Remover
exports.removerDoCarrinho = async (req, res) => {
  const { itemId } = req.params;
  try {
    const itemCarrinho = await Carrinho.findByPk(itemId);
    if (!itemCarrinho) {
      return res
        .status(404)
        .json({ error: "Item não encontrado no carrinho." });
    }
    await itemCarrinho.destroy();
    res.status(200).json({ message: "Item removido com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover item do carrinho." });
  }
};

// Finalizar Compra
exports.finalizarCompra = async (req, res) => {
  const { usuarioId } = req.body;

  try {
    const itensCarrinho = await Carrinho.findAll({ where: { usuarioId } });

    if (itensCarrinho.length === 0) {
      return res.status(400).json({ error: "O carrinho está vazio." });
    }

    // Calcular o total do pedido
    let total = 0;
    for (const item of itensCarrinho) {
      const prato = await Prato.findByPk(item.pratoId);
      if (prato) {
        total += prato.valor * item.quantidade;
      }
    }

    res.status(200).json({
      message: "Compra finalizada com sucesso!",
      totalPedido: total,
      itensCarrinho: itensCarrinho,
    });

    // Limpa o carrinho após a compra
    await Carrinho.destroy({ where: { usuarioId } });
  } catch (error) {
    res.status(500).json({ error: "Erro ao finalizar a compra." });
  }
};
