const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: String,
  hash: String
});

usuarioSchema.methods.setPassword = function(password) {
  this.hash = crypto
    .pbkdf2Sync(password, process.env.BCF, 1000, 64, "sha1")
    .toString("hex");
};

usuarioSchema.methods.validPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, process.env.BCF, 1000, 64, "sha1")
    .toString("hex");
  return this.hash === hash;
};

usuarioSchema.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  // El rol se "encripta" como un base64 juntando el id de usuario y el email, después se "desencriptará" en el frontend para matchear con el valor del rol.

  return jwt.sign(
    Object.assign(
      {},
      {
        _id: this._id,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000)
      },
      this.role && {
        role: Buffer.from(`${this._id}${this.role}${this.email}`).toString(
          "base64"
        )
      }
    ),
    process.env.BCF
  );
};
usuarioSchema.methods.generateMailToken = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);

  return jwt.sign(
    {
      uid: this._id,
      exp: parseInt(expiry.getTime())
    },
    process.env.BCF
  );
};

module.exports = mongoose.model("usuario", usuarioSchema);
