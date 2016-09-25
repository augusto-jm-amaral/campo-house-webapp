var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
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
        usuario: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Usuarios',
          required: true
        },
        plano: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Planos',
          required: true
        },
        gerado: {
            type: Boolean,
            require: true,
            default: false
        }
    });

    return mongoose.model('ContratoPlanos', schema);
};
