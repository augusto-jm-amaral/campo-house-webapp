var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    descEspaco: {
      type: String
    }
});

return mongoose.model('Espacos', schema);
};
