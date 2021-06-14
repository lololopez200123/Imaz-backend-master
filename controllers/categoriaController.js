var categoriaModel = require("../models/categoriaModel.js");

/**
 * categoriaController.js
 *
 * @description :: Server-side logic for managing categorias.
 */
module.exports = {
  /**
   * categoriaController.list()
   */
  list: function(req, res) {
    categoriaModel.find(function(err, categorias) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting categoria.",
          error: err
        });
      }
      return res.json(categorias);
    });
  },

  /**
   * categoriaController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    categoriaModel.findOne({ _id: id }, function(err, categoria) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting categoria.",
          error: err
        });
      }
      if (!categoria) {
        return res.status(404).json({
          message: "No such categoria"
        });
      }
      return res.json(categoria);
    });
  },

  /**
   * categoriaController.create()
   */
  create: function(req, res) {
    var categoria = new categoriaModel({
      nombre: req.body.nombre
    });

    categoria.save(function(err, categoria) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating categoria",
          error: err
        });
      }
      return res.status(201).json(categoria);
    });
  },

  /**
   * categoriaController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    categoriaModel.findOne({ _id: id }, function(err, categoria) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting categoria",
          error: err
        });
      }
      if (!categoria) {
        return res.status(404).json({
          message: "No such categoria"
        });
      }

      categoria.nombre = req.body.nombre ? req.body.nombre : categoria.nombre;

      categoria.save(function(err, categoria) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating categoria.",
            error: err
          });
        }

        return res.json(categoria);
      });
    });
  },

  /**
   * categoriaController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    categoriaModel.findByIdAndRemove(id, function(err, categoria) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the categoria.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
