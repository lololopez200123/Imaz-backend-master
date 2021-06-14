var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  titulo: { type: String, required: true },
  url: { type: String, required: true },
  imagen: String
});

module.exports = mongoose.model("link", linkSchema);
