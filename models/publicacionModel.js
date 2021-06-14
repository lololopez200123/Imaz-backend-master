var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var publicacionSchema = new Schema({
  titulo: { type: String, required: true },
  texto: { type: String, required: true },
  pubdate: { type: Date, required: true },
  diario: String,
  autor: String
});

module.exports = mongoose.model("publicacion", publicacionSchema);
