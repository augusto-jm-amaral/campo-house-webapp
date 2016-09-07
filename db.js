var mongoose = require('mongoose');

module.exports = function(app) {

    //Configurações para a conexão
    var cfg = app.libs.config.db;

    //Criando a conexão com o banco
    mongoose.connect(cfg.url, cfg.options);

    //Evento de conexão
    mongoose.connection.on('connected',  () => {
      console.log('Mongoose:: Conectado em ' + cfg.url);
    });

    //Evento quando desconectado
    mongoose.connection.on('disconnected',  () => {
      console.log('Mongoose:: Desconectado de ' + cfg.url);
    });

    //Evento quando houver erro
    mongoose.connection.on('error',  (erro) => {
      console.log('Mongoose:: Erro na conexão com ' + cfg.url + ', erro: ' + erro);
    });

    //Evento para quando a aplicação for terminada, por (ctr + c) ou erros graves
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongose:: Desconectado pelo termino da aplicação.');
        process.exit(0);
      });
    });

  return mongoose;
};
