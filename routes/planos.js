const nodemailer = require('nodemailer'),
    fs = require('fs');

module.exports = function(app) {

    const cfg = app.libs.config;
    const Planos = app.db.models.Planos;
    const ContratoPlanos = app.db.models.ContratoPlanos;

    var transporter = nodemailer.createTransport({
        host: 'smtp.mail.pawnmail.com',
        port: 587,
        requireTLS: true,
          // secure: false,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: 'campohouse@campohouse.com.br',
            pass: 'campohouse1'
        }
    });

    app.route(cfg.urlRaizApi + '/planos/:_numplano')
        .all(app.auth.authenticate('usuario'))
        .get(function get(req, res) {

            req.checkParams('_numplano', '').notEmpty().isNumeric();

            var erros = req.validationErrors();

            var tempoRestante = req.user.planoFin.getTime() - new Date().getTime();

            var isMenos15Dias = true;

            if (tempoRestante > (86400000 * 15)) //15 dias
                isMenos15Dias = false;

            if (!erros && isMenos15Dias) {

                Planos.findOne({
                        ordem: req.params._numplano
                    })
                    .then(function(plano) {

                        new ContratoPlanos({
                                plano: plano._id,
                                usuario: req.user._id
                            })
                            .save(function(err, contratoPlano) {

                                var textoPlan = '<h2>Plano Contratado</h2><br>';
                                textoPlan += '<b>Plano: ' + plano.nome + '</b><br>';
                                textoPlan += '<b>Usuario: ' + req.user.nome + '</b><br>';
                                textoPlan += '<b>ID Usuario: ' + req.user._id + '</b><br>';
                                textoPlan += '<b>Telefone: ' + req.user.telefone + '</b><br>';
                                textoPlan += '<b>ID Contrato: ' + contratoPlano._id + '</b><br>';

                                if (!err) {

                                    var mailOptions = {
                                        from: 'CampuHouse	<campohouse@campohouse.com.br>',
                                        to: 'campohouse@campohouse.com.br',
                                        subject: 'Contratação de Plano',
                                        html: textoPlan
                                    };

                                    var sendMail = transporter.sendMail(mailOptions, function(error, info) {
                                        if (error) {
                                            app.libs.logger.info('CONTRATA PLANO ::: ' + error + ' ::: ' + textoPlan);
                                        } else {
                                            app.libs.logger.info('Email	enviado:	' + info.response);
                                        }
                                    });

                                    //Mandar E-mail pro usuario

                                    var textoEmail = '';

                                    textoEmail += 'Olá ' + req.user.nome.split(' ')[0] + ', desejamos que esteja tudo bem contigo.';
                                    textoEmail += 'Você acaba de contratar o Plano ' + plano.nome + ', válido por ' + plano.dias + '.';
                                    textoEmail += 'Aguarde que em algumas horas lhe enviaremos um e-mail através do PagSeguro para você concretizar o pagamento e finalizar a contratação.';
                                    textoEmail += 'Agradecemos seu desejo em usar nossos serviços.';
                                    textoEmail += 'Grande abraço,';
                                    textoEmail += 'Equipe Campo House.';

                                    fs.readFile('./libs/template-email.html', 'utf8', function(err, data) {

                                        var mailOptions = {
                                            from: 'CampoHouse	<campohouse@campohouse.com.br>',
                                            to: req.user.email,
                                            subject: 'Contratação de Plano',
                                            html: data.replace('*.&123456789*.&', textoEmail)
                                                // html: 'teste'
                                        };

                                        var sendMail = transporter.sendMail(mailOptions, function(error, info) {
                                            if (error) {
                                                app.libs.logger.info(error);
                                            } else {
                                                app.libs.logger.info('Email	enviado:	' + info.response);
                                            }
                                        });

                                    });

                                    res.sendStatus(200).end();

                                } else {
                                    app.libs.logger.info(err);
                                    res.sendStatus(412).end();
                                }
                            });

                    })
                    .catch(function(err) {
                        app.libs.logger.info(err);
                        res.sendStatus(412).end();
                    });

            } else {
                app.libs.logger.info(erros);
                res.sendStatus(400).end();
            }

        });

};
