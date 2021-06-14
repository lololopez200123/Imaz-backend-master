var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categoriaSchema = new Schema({
  nombre: { type: String, required: true }
});

module.exports = mongoose.model("categoria", categoriaSchema);
