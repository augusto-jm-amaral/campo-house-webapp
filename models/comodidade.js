var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    descComodidade: {
      type: String
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categorias',
      required: true
    }
});

return mongoose.model('Comodidades', schema);
};
