const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
        nome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telefone: {
            type: String,
            required: true
        },
        mensagem: {
          type: String,
          required: true
        }
    });

    return mongoose.model('FaleConosco', schema);
};
