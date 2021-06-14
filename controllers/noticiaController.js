var noticiaModel = require("../models/noticiaModel.js");

/**
 * noticiaController.js
 *
 * @description :: Server-side logic for managing noticias.
 */
module.exports = {
  /**
   * noticiaController.list()
   */
  list: function(req, res) {
    noticiaModel.find(function(err, noticias) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting noticia.",
          error: err
        });
      }
      return res.json(noticias);
    });
  },

  /**
   * noticiaController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    noticiaModel
      .findOne({ _id: id })
      .populate("categoria")
      .exec(function(err, noticia) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting noticia.",
            error: err
          });
        }
        if (!noticia) {
          return res.status(404).json({
            message: "No such noticia"
          });
        }
        return res.json(noticia);
      });
  },

  /**
   * noticiaController.create()
   */
  create: function(req, res) {
    var noticia = new noticiaModel({
      titulo: req.body.titulo,
      categoria: req.body.categoria,
      texto: req.body.texto,
      pubdate: new Date(),
      diario: req.body.diario
    });

    noticia.save(function(err, noticia) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating noticia",
          error: err
        });
      }
      return res.status(201).json(noticia);
    });
  },

  /**
   * noticiaController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    noticiaModel.findOne({ _id: id }, function(err, noticia) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting noticia",
          error: err
        });
      }
      if (!noticia) {
        return res.status(404).json({
          message: "No such noticia"
        });
      }

      noticia.titulo = req.body.titulo ? req.body.titulo : noticia.titulo;
      noticia.categoria = req.body.categoria
        ? req.body.categoria
        : noticia.categoria;
      noticia.texto = req.body.texto ? req.body.texto : noticia.texto;
      // noticia.pubdate = req.body.pubdate ? req.body.pubdate : noticia.pubdate;
      noticia.diario = req.body.diario ? req.body.diario : noticia.diario;

      noticia.save(function(err, noticia) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating noticia.",
            error: err
          });
        }

        return res.json(noticia);
      });
    });
  },

  /**
   * noticiaController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    noticiaModel.findByIdAndRemove(id, function(err, noticia) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the noticia.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
