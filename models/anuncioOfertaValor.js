var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    descricao: {
      type: String
    },
    principal:{
      type: Boolean
    },
    ofertaValor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OfertaValores',
      required: true
    },
    anuncio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anuncios',
      required: true
    },
});

return mongoose.model('AnuncioOfertaValores', schema);
};
