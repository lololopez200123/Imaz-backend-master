var profesionalModel = require("../models/profesionalesModel.js");

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
    profesionalModel.find(function(err, noticias) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting profesionales.",
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
    profesionalModel
      .findOne({ _id: id })
      .exec(function(err, profesional) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting profesionales.",
            error: err
          });
        }
        if (!profesional) {
          return res.status(404).json({
            message: "No such profesional"
          });
        }
        return res.json(profesional);
      });
  },

  /**
   * noticiaController.create()
   */
  create: function(req, res) {
    var profesional = new profesionalModel({
      nombre: req.body.nombre,
      email: req.body.email,
      profesion: req.body.profesion,
      imagen1: req.body.imagen1,
      imagen2: req.body.imagen2
    });

    profesional.save(function(err, profesional) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating profesional",
          error: err
        });
      }
      return res.status(201).json(profesional);
    });
  },

  /**
   * noticiaController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    profesionalModel.findOne({ _id: id }, function(err, profesional) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting profesional",
          error: err
        });
      }
      if (!profesional) {
        return res.status(404).json({
          message: "No such profesional"
        });
      }

      profesional.nombre = req.body.nombre ? req.body.nombre : profesional.nombre;
      profesional.email = req.body.email
        ? req.body.email
        : profesional.email;
      profesional.profesion = req.body.profesion ? req.body.profesion : profesional.profesion;
      profesional.imagen1 = req.body.imagen1 ? req.body.imagen1 : profesional.imagen1;
      profesional.imagen2 = req.body.imagen2 ? req.body.imagen2 : profesional.imagen2;

      profesional.save(function(err, profesional) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating noticia.",
            error: err
          });
        }

        return res.json(profesional);
      });
    });
  },

  /**
   * noticiaController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    profesionalModel.findByIdAndRemove(id, function(err, noticia) {
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
