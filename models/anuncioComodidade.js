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
    comodidade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comodidades',
      required: true
    },
    anuncio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anuncios',
      required: true
    },
});

return mongoose.model('AnuncioComodidades', schema);
};
