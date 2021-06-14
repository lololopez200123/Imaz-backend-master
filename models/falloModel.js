var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var falloSchema = new Schema({
  caratula: { type: String, required: true },
  expediente: { type: String, required: true },
  texto: { type: String, required: true },
  pubdate: { type: Date, required: true }
});

module.exports = mongoose.model("fallo", falloSchema);
