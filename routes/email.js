module.exports = function(app) {

    const cfg = app.libs.config;
    const Emails = app.db.models.Emails;
    const Logger = app.libs.logger;

    app.route(cfg.urlRaizApi + '/emails')
        .post(function get(req, res) {

            req.checkBody('email', '').notEmpty();

            var erros = req.validationErrors();

            if (!erros) {

                Emails({
                        endereco: req.body.email
                    })
                    .save();

                    res.sendStatus(200).end();
            } else {
                logger.error(erros);
                res.sendStatus(400).end();
            }

        });

};
