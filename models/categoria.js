var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    descCategoria: {
      type: String
    }
});

return mongoose.model('Categorias', schema);
};
