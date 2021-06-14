var linkModel = require("../models/linkModel.js");

/**
 * linkController.js
 *
 * @description :: Server-side logic for managing links.
 */
module.exports = {
  /**
   * linkController.list()
   */
  list: function(req, res) {
    linkModel.find(function(err, links) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting link.",
          error: err
        });
      }
      return res.json(links);
    });
  },

  /**
   * linkController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    linkModel.findOne({ _id: id }, function(err, link) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting link.",
          error: err
        });
      }
      if (!link) {
        return res.status(404).json({
          message: "No such link"
        });
      }
      return res.json(link);
    });
  },

  /**
   * linkController.create()
   */
  create: function(req, res) {
    var link = new linkModel({
      titulo: req.body.titulo,
      url: req.body.url,
      imagen: req.body.imagen
    });

    link.save(function(err, link) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating link",
          error: err
        });
      }
      return res.status(201).json(link);
    });
  },

  /**
   * linkController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    linkModel.findOne({ _id: id }, function(err, link) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting link",
          error: err
        });
      }
      if (!link) {
        return res.status(404).json({
          message: "No such link"
        });
      }

      link.titulo = req.body.titulo ? req.body.titulo : link.titulo;
      link.url = req.body.url ? req.body.url : link.url;
      link.imagen = req.body.imagen ? req.body.imagen : link.imagen;

      link.save(function(err, link) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating link.",
            error: err
          });
        }

        return res.json(link);
      });
    });
  },

  /**
   * linkController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    linkModel.findByIdAndRemove(id, function(err, link) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the link.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
