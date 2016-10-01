var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
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
      countNewDe: {
        type: Number,
        required: true,
        default: 0
      },
      countNewPara: {
        type: Number,
        required: true,
        default: 0
      }
    });

    return mongoose.model('Chat', schema);
};
