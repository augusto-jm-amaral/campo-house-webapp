module.exports = function(app) {

    const cfg = app.libs.config;
    const Anuncios = app.db.models.Anuncios;
    const NumAcomodaOption = app.db.models.NumAcomodaOption;
    const TipoImovelOption = app.db.models.TipoImovelOption;
    const Comodidades = app.db.models.Comodidades;
    const OfertaValores = app.db.models.OfertaValores;


    app.route(cfg.urlRaizApi + '/numacomoda')
        // .all(app.auth.authenticate('usuario'))
        .get(function get(req, res) {

            NumAcomodaOption.find({}, function(err, num) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400).end();
                } else {
                    res.status(200).json(num).end();
                }
            });

        });

    app.route(cfg.urlRaizApi + '/tipoimovel')
        .get(function get(req, res) {

            TipoImovelOption.find({}, function(err, num) {
                if (err) {
                    console.log(err);
                    res.sendStatus(400).end();
                } else {
                    res.status(200).json(num).end();
                }
            });

        });

    app.route(cfg.urlRaizApi + '/comodidades')
        .get(function get(req, res) {

            Comodidades.find({})
                .sort({
                    categoria: 1,
                    descComodidade: 1
                })
                .populate('categoria')
                .then(function(com) {
                    res.status(200).json(com).end();
                })
                .catch(function(err) {
                    console.log(err);
                    res.sendStatus(400).end();
                });

        });

    app.route(cfg.urlRaizApi + '/ofertavalores')
        .get(function get(req, res) {

            OfertaValores.find({})
                .sort({
                    nome: 1
                })
                .then(function(ofertas) {
                    res.status(200).json(ofertas).end();
                })
                .catch(function(err) {
                    console.log(err);
                    res.sendStatus(400).end();
                });

        });

};