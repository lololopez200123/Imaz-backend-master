var publicacionModel = require("../models/publicacionModel.js");

/**
 * publicacionController.js
 *
 * @description :: Server-side logic for managing publicacions.
 */
module.exports = {
  /**
   * publicacionController.list()
   */
  list: function(req, res) {
    publicacionModel
      .find({})
      .sort({ pubdate: -1 })
      .exec(function(err, publicacions) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting publicacion.",
            error: err
          });
        }
        return res.json(publicacions);
      });
  },

  /**
   * publicacionController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    publicacionModel.findOne({ _id: id }, function(err, publicacion) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting publicacion.",
          error: err
        });
      }
      if (!publicacion) {
        return res.status(404).json({
          message: "No such publicacion"
        });
      }
      return res.json(publicacion);
    });
  },

  /**
   * publicacionController.create()
   */
  create: function(req, res) {
    var publicacion = new publicacionModel({
      titulo: req.body.titulo,
      texto: req.body.texto,
      pubdate: req.body.pubdate,
      diario: req.body.diario,
      autor: req.body.autor
    });

    publicacion.save(function(err, publicacion) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating publicacion",
          error: err
        });
      }
      return res.status(201).json(publicacion);
    });
  },

  /**
   * publicacionController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    publicacionModel.findOne({ _id: id }, function(err, publicacion) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting publicacion",
          error: err
        });
      }
      if (!publicacion) {
        return res.status(404).json({
          message: "No such publicacion"
        });
      }

      publicacion.titulo = req.body.titulo
        ? req.body.titulo
        : publicacion.titulo;
      publicacion.texto = req.body.texto ? req.body.texto : publicacion.texto;
      publicacion.pubdate = req.body.pubdate
        ? req.body.pubdate
        : publicacion.pubdate;
      publicacion.diario = req.body.diario
        ? req.body.diario
        : publicacion.diario;
      publicacion.autor = req.body.autor ? req.body.autor : publicacion.autor;

      publicacion.save(function(err, publicacion) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating publicacion.",
            error: err
          });
        }

        return res.json(publicacion);
      });
    });
  },

  /**
   * publicacionController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    publicacionModel.findByIdAndRemove(id, function(err, publicacion) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the publicacion.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
