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
    // localCep: {
    //   type: String
    // },
    // localLogradouro: {
    //   type: String
    // },
    // localNumero: {
    //   type: String
    // },
    // localBairro: {
    //   type: String
    // },
    // localCidade: {
    //   type: String
    // },
    // localEstado: {
    //   type: String
    // },
    // localPais: {
    //   type: String
    // },
    // localInfoProximidades: {
    //   type: String,
    // },
    regrasGerais: {
      type: String,
    },
    precoDiaria: {
      type: Number
    },
    precoSemanal: {
      type: Number
    },
    precoMensal: {
      type: Number
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
    localComplemento: {
      type: String,
    },
    etapa: {
      type: Number,
      required: true
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios'
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
    listaComodidades: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'AnuncioComodidades'}]
    },
    anuncioOfertaValores: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'AnuncioOfertaValores'}]
    },
    anuncioEspacos: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'AnuncioEspacos'}]
    }
});

return mongoose.model('Anuncios', schema);
};
