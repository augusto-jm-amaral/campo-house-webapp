var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
        nome: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        ordem: {
            type: Number,
            required: true
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
        }
    });

    return mongoose.model('Planos', schema);
};
