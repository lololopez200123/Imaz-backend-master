var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var profesionalSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    profesion: { type: String, required: true },
    imagen1: { type: String, required: true },
    imagen2: { type: String, required: true }
});

module.exports = mongoose.model("profesional", profesionalSchema);
