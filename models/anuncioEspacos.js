var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    descricao: {
      type: String
    },
    valor:{
      type: Number
    },
    espaco: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Espacos',
      required: true
    },
    anuncio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anuncios',
      required: true
    },
});

return mongoose.model('AnuncioEspacos', schema);
};
