const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
        endereco: {
            type: String,
            required: true,
            index: {
              unique: true
            }
        },
        registro: {
          type: Date,
          required: true,
          default: new Date()
        }
    });

    return mongoose.model('Emails', schema);
};
