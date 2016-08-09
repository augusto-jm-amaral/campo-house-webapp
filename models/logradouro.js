var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    endereco:{
      type: String,
      riquired: true
    },
    localCep: {
      type: String
    },
    localRua: {
      type: String
    },
    localNumero: {
      type: String
    },
    localBairro: {
      type: String
    },
    localCidade: {
      type: String
    },
    localEstado: {
      type: String
    },
    localPais: {
      type: String
    },
    localInfoProximidades: {
      type: String
    },
    localComplemento: {
      type: String
    },
    dataCadastro: {
      type: Date,
      required: true,
      default: new Date()
    },
    dataAtualizacao: {
      type: Date,
      required: true
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios'
    },
    anuncio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anuncios'
    },
    exibir:{
      type: Boolean,
      riquired: true
    },
    loc: {
      // type: [Number],
      type: {type: 'String', default:'Point'},
      // index: '2d',
      coordinates: [Number]
      // required: true
    }
});

schema.index({loc: '2dsphere'});

return mongoose.model('Logradouros', schema);
};
