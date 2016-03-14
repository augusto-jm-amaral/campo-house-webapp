var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    descOfertaValor: {
      type: String
    }
});

return mongoose.model('OfertaValores', schema);
};
