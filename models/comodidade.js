var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    descComodidade: {
      type: String,
      index: {
        unique: true
      }
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categorias',
      required: true
    }
});

return mongoose.model('Comodidades', schema);
};
