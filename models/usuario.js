var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

module.exports = function () {

var schema = new Schema({
    nome: {
      type: String,
      required: true
    },
    sobreNome: {
      type: String,
    },
    dataNascimento: {
      type: Number
    },
    email: {
      type: String,
      required: true
    },
    telefone: {
      type: String,
    },
    sobre: {
      type: String,
    },
    senha: {
      type: String,
      required: true
    },
    dataCadastro: {
      type: Number
    },
    chaveAcesso: {
      type: String,
    },
    bloqueado: {
      type: Boolean,
      default: true
    },
    anuncios: {
      type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Anuncios'}],
    }
});

schema.method('encripitarSenha', function (usuario) {
  var salt = bcrypt.genSaltSync();
  usuario.senha = bcrypt.hashSync(usuario.senha, salt);
  return usuario;
});

schema.method('validarSenha', function (encodedPassword, password) {
  return bcrypt.compareSync(password, encodedPassword);
});

return mongoose.model('Usuarios', schema);
};
