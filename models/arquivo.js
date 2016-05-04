const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    nome: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    formato: {
      type: String,
      required: true
    },
    anuncio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anuncios',
      required: true
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true
    }
});

return mongoose.model('Comentario', schema);
};
