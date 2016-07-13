var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    sobreTitulo: {
      type: String,
      required: true
    },
    sobreDescricao: {
      type: String,
      required: true
    },
    regrasGerais: {
      type: String,
    },
    precoDiaria: {
      type: Number,
      default: 0
    },
    precoSemanal: {
      type: Number,
      default: 0
    },
    precoMensal: {
      type: Number,
      default: 0
    },
    dataCadastro: {
      type: Date,
      required: true,
      default: new Date()
    },
    dataAtualizacao: {
      type: Date,
      required: true,
      default: new Date()
    },
    localComplemento: {
      type: String,
    },
    status: {
      type: Number,
      require: true,
      default: 1
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true
    },
    numQuartos: {
      type: Number,
      required: true,
      default: -1
    },
    numBanheiros: {
      type: Number,
      required: true,
      default: -1
    },
    numCamas:{
      type: Number,
      required: true,
      default: -1
    },
    numMaxVisitantes:{
      type: Number,
      required: true,
      default: -1
    },
    listaArquivos: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Arquivos'}]
    },
    listaPrecosTemporadas: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'PrecosTemporadas'}]
    },
    listaComentarios: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comentarios'}]
    },
    listaAnuncioComodidades: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'AnuncioComodidades'}]
    },
    anuncioOfertaValores: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'AnuncioOfertaValores'}]
    }
    // anuncioEspacos: {
    //   type: [{type: mongoose.Schema.Types.ObjectId, ref: 'AnuncioEspacos'}]
    // }
});

return mongoose.model('Anuncios', schema);
};
