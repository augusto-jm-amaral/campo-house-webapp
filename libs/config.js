module.exports = function(app) {

    var config = {
        db: {
            url: 'mongodb://localhost/campushouse',
            options: {
                // user: 'campushouseuser',
                // pass: 'C4W9UsH0uZe',
                server: {
                    poolSize: 30,
                    // debug: false
                    // debug: function(coll, method, query, doc, options) {
                    //     var set = {
                    //         coll: coll,
                    //         method: method,
                    //         query: query,
                    //         doc: doc,
                    //         options: options
                    //     };
                    //     // console.log('AUHAHAU');
                    //     console.log(set);
                    //     // log.info({
                    //     //     dbQuery: set
                    //     }
                }
            }
        },
        jwtSecret: '4PpR4NCH0',
        jwtSession: {
            session: false
        },
        urlRaizApi: '/apiv1.0',
        urlServe: 'http://localhost:3000',
        etapasAnuncio: {
            geral: "Geral",
            foto: "Fotos",
            logradouro: "Endereço",
            valor: "Valores"
        },
        numMaxFotos: 20

        // populateDb: true
    };

    return config;
};
