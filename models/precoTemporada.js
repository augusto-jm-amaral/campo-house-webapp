var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
        inicioTemporada: {
            type: Number,
            required: true
        },
        terminoTemporada: {
            type: Number,
            required: true
        },
        precoDiaria: {
            type: Number,
            required: true
        },
        precoSemanal: {
            type: Number
        },
        precoMensal: {
            type: Number
        },
        anuncio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Anuncios',
            required: true
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuarios'
        }
    });

    return mongoose.model('PrecoTemporadas', schema);
};