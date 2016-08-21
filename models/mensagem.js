var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    texto: {
      type: String,
      required: true
    },
    de: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true
    },
    para: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true
    },
    anuncio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anuncios',
      required: true
    },
    see: {
      type: Number,
      required:true,
      default: 1
    },
    data:{
      type: Date,
      default: new Date(),
      required:true
    }
});

return mongoose.model('Mensagens', schema);
};
