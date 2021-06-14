var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noticiaSchema = new Schema({
  titulo: { type: String, required: true },
  categoria: { type: Schema.Types.ObjectId, ref: "categoria" },
  texto: { type: String, required: true },
  pubdate: { type: Date, required: true },
  diario: String
});

module.exports = mongoose.model("noticia", noticiaSchema);
