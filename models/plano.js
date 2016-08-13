var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    nome: {
      type: String,
      required: true
    },
    ordem: {
      type: Number,
      required: true
    },
    showLocalizacao: {
      type: Boolean,
      required: true,
      default: true
    },
    showContato: {
      type: Number,
      required: true,
      default: true
    },
    showMensagem: {
      type: Number,
      required: true,
      default: true
    },
    preco: {
      type: Number,
      required: true
    },
    duracao: {
      type: Number,
      required: true,
      default: 30
    },
    dataCadastro: {
      type: Date,
      required: true,
      default: new Date()
    },
    descricao: {
      type: String,
      required: true
    }
    // localComplemento: {
    //   type: String,
    // },
    // status: {
    //   type: Number,
    //   require: true,
    //   default: 1
    // },
    // usuario: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Usuarios',
    //   required: true
    // },
    // numQuartos: {
    //   type: Number,
    //   required: true,
    //   default: 0
    // },
    // numBanheiros: {
    //   type: Number,
    //   required: true,
    //   default: 0
    // },
    // numCamas:{
    //   type: Number,
    //   required: true,
    //   default: 0
    // },
    // numAcomoda:{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'NumAcomodaOption'
    // },
    // tipoImovel: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'TipoImovelOption'
    // },
    // oquelevar: {
    //   type: String,
    //   default: ''
    // },
    // oquenaolevar: {
    //   type: String,
    //   default: ''
    // },
    // listaArquivos: {
    //   type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Arquivos'}]
    // },
    // listaPrecosTemporadas: {
    //   type: [{type: mongoose.Schema.Types.ObjectId, ref: 'PrecosTemporadas'}]
    // },
    // listaComentarios: {
    //   type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comentarios'}]
    // },
    // listaComodidades: {
    //   type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comodidades'}]
    // },
    // listaOfertaValores: {
    //   type: [{type: mongoose.Schema.Types.ObjectId, ref: 'AnuncioOfertaValores'}]
    // }
});

return mongoose.model('Planos', schema);
};
