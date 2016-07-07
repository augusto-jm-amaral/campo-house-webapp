var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    descCategoria: {
      type: String,
      index: {
        unique: true
      }
    },
    tipo: {
      type: String,
      index: {
        unique: true
      }
    }
});

return mongoose.model('Categorias', schema);
};
