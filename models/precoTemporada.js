var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    inicioTemporada: {
      type: Number
    },
    terminoTemporada:{
      type: Number
    },
    precoDiaria:{
      type: Number
    },
    precoSemanal:{
      type: Number
    },
    precoMensal:{
      type: Number
    },
    anuncio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anuncios',
      required: true
    },
});

return mongoose.model('PrecoTemporadas', schema);
};
