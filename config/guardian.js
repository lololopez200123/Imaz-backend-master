const jwt = require("express-jwt");
const usuarioModel = require("../models/usuarioModel.js");

module.exports = options => {
  return [
    jwt({ secret: process.env.BCF, userProperty: "payload" }),
    (req, res, next) => {
      if (
        !req.payload ||
        !(options.mailToken ? req.payload.uid : req.payload._id)
      ) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        usuarioModel
          .findOne({
            _id: options.mailToken ? req.payload.uid : req.payload._id
          })
          .exec((error, usuario) => {
            if (error) {
              return res.status(500).json({ message: "Internal error" });
            } else {
              if (!usuario) {
                return res.status(401).json({
                  message: "Unauthorized"
                });
              } else {
                if (options.validateRole) {
                  if (usuario.role !== options.validateRole) {
                    return res.status(401).json({
                      message: "Unauthorized"
                    });
                  } else {
                    return next();
                  }
                } else if (options.mailToken) {
                  if (
                    req.payload.exp &&
                    new Date(req.payload.exp) < new Date()
                  ) {
                    return res.status(406).json({
                      message: "Outdated token"
                    });
                  } else {
                    return next();
                  }
                } else {
                  return next();
                }
              }
            }
          });
      }
    }
  ];
};
