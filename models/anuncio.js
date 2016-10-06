var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

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
            default: new Date().toISOString()
        },
        dataAtualizacao: {
            type: Date,
            required: true,
            default: new Date().toISOString()
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
        endereco: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Logradouros'
            // required: true
        },
        numQuartos: {
            type: Number,
            required: true,
            default: 0
        },
        numBanheiros: {
            type: Number,
            required: true,
            default: 0
        },
        numCamas: {
            type: Number,
            required: true,
            default: 0
        },
        numAcomoda: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NumAcomodaOption'
        },
        tipoImovel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TipoImovelOption'
        },
        oquelevar: {
            type: String,
            default: ''
        },
        oquenaolevar: {
            type: String,
            default: ''
        },
        listaArquivos: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Arquivos'
            }]
        },
        listaPrecosTemporadas: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PrecosTemporadas'
            }]
        },
        listaComentarios: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comentarios'
            }]
        },
        listaComodidades: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comodidades'
            }]
        },
        listaOfertaValores: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AnuncioOfertaValores'
            }]
        }
    });

    return mongoose.model('Anuncios', schema);
};
