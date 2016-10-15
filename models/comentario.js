var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
        nota: {
            type: Number,
            required: true
        },
        comentario: {
            type: String,
            required: true
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuarios',
            required: true
        }
    });

    return mongoose.model('Comentarios', schema);
};
