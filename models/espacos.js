var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    nome: {
      type: String
    },
    descEspaco: {
      type: String
    }
});

return mongoose.model('Espacos', schema);
};
