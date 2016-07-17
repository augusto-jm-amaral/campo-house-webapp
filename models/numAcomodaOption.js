var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    nome: {
      type: String
    },
    num:{
      type: Number
    }
});

return mongoose.model('NumAcomodaOption', schema);
};
