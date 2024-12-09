const { Comentario, Usuario, Prato } = require("../models");

// Adicionar comentário
exports.adicionarComentario = async (req, res) => {
  const { usuarioId, pratoId, comentario } = req.body;

  try {
    const novoComentario = await Comentario.create({
      usuarioId,
      pratoId,
      comentario,
    });

    res.status(201).json(novoComentario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar comentário." });
  }
};

// Listar comentários por prato
exports.listarComentarios = async (req, res) => {
  const { pratoId } = req.params;

  try {
    const comentarios = await Comentario.findAll({
      where: { pratoId },
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["nome"],
        },
        {
          model: Prato,
          as: "prato",
          attributes: ["nome"],
        },
      ],
    });

    if (comentarios.length === 0) {
      return res.status(404).json({ error: "Nenhum comentário encontrado." });
    }

    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar comentários." });
  }
};
