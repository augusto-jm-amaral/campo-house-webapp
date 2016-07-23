module.exports = function(app) {

  var config = {
    db: {
      url : 'mongodb://localhost/campushouse',
      options : {
        // user: 'campushouseuser',
        // pass: 'C4W9UsH0uZe',
        server: {
          poolSize: 30,
          debug : true
        }
      }
    },
    jwtSecret: '4PpR4NCH0',
    jwtSession: {session: false},
    urlRaizApi: '/apiv1.0',
    urlServe: 'http://localhost:3000',
    etapasAnuncio: {
      geral: "Geral",
      foto: "Fotos",
      logradouro: "Endereço",
      valor: "Valores"
    },
    numMaxFotos: 12

    // populateDb: true
  };

  return config;
};
