var falloModel = require("../models/falloModel.js");

/**
 * falloController.js
 *
 * @description :: Server-side logic for managing fallos.
 */
module.exports = {
  /**
   * falloController.list()
   */
  list: function(req, res) {
    falloModel
      .find({})
      .sort({ pubdate: -1 })
      .exec(function(err, fallos) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting fallo.",
            error: err
          });
        }
        return res.json(fallos);
      });
  },

  /**
   * falloController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    falloModel.findOne({ _id: id }, function(err, fallo) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting fallo.",
          error: err
        });
      }
      if (!fallo) {
        return res.status(404).json({
          message: "No such fallo"
        });
      }
      return res.json(fallo);
    });
  },

  /**
   * falloController.create()
   */
  create: function(req, res) {
    var fallo = new falloModel({
      caratula: req.body.caratula,
      expediente: req.body.expediente,
      texto: req.body.texto,
      pubdate: req.body.pubdate
    });

    fallo.save(function(err, fallo) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating fallo",
          error: err
        });
      }
      return res.status(201).json(fallo);
    });
  },

  /**
   * falloController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    falloModel.findOne({ _id: id }, function(err, fallo) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting fallo",
          error: err
        });
      }
      if (!fallo) {
        return res.status(404).json({
          message: "No such fallo"
        });
      }

      fallo.caratula = req.body.caratula ? req.body.caratula : fallo.caratula;
      fallo.expediente = req.body.expediente
        ? req.body.expediente
        : fallo.expediente;
      fallo.texto = req.body.texto ? req.body.texto : fallo.texto;
      fallo.pubdate = req.body.pubdate ? req.body.pubdate : fallo.pubdate;

      fallo.save(function(err, fallo) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating fallo.",
            error: err
          });
        }

        return res.json(fallo);
      });
    });
  },

  /**
   * falloController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    falloModel.findByIdAndRemove(id, function(err, fallo) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the fallo.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
