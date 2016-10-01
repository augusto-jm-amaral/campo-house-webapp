var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
        texto: {
            type: String,
            required: true
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
            required: true
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true
        },
        data: {
            type: Date,
            default: new Date(),
            required: true
        }
    });

    return mongoose.model('Mensagens', schema);
};
