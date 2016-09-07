//
// module.exports = function (app) {
//
//   const cfg = app.libs.config;
//   const Anuncios = app.db.models.Anuncios;
//   const PrecoTemporadas = app.db.models.PrecoTemporadas;
//
//   app.route(cfg.urlRaizApi + '/anuncios/:_idanuncio/precotemporada/:_idprecotemporada')
//     .all(app.auth.authenticate('usuario'))
//     .delete(function get(req, res){
//
//           req.checkBody('_idanuncio','').notEmpty().isMongoId();
//           req.checkBody('_idprecotemporada','').notEmpty().isMongoId();
//
//           var erros = req.validationErrors();
//
//           if(!erros){
//
//             PrecoTemporadas.remove(
//               {_id: req.params._idprecotemporada, anuncio: req.params._idprecotemporada, usuario: req.user._id},
//               {justOne: true}
//             )
//             .then(function (precoTemporada) {
//               Anuncios.update(
//                 {_id: req.params._idprecotemporada, usuario: req.user._id},
//                 { $pullAll: { listaPrecosTemporadas: [ req.params._idprecotemporada ] } }
//               ).then(function (anuncio) {
//                 res.status(200).json(anuncio).end();
//               }).catch(function (err) {
//                 console.log(err);
//                 res.sendStatus(412).end();
//               })
//             }).catch(function (err) {
//               console.log(err);
//               res.sendStatus(412).end();
//             });
//
//           }else{
//             res.sendStatus(400).end();
//           }
//
//     });
//
//   app.route(cfg.urlRaizApi + '/anuncios/:_id')
//     .all(app.auth.authenticate('usuario'))
//     .post(function get(req, res){
//
//         // req.checkBody('sobreTitulo','').notEmpty();
//         req.checkParam('_idanuncio').notEmpty().isMongoId();
//         // req.checkBody('sobreDescricao','').notEmpty();
//
//         var erros = req.validationErrors();
//
//         if(!erros){
//
//           // PrecoTemporadas.
//
//         }else{
//           res.sendStatus(400).end();
//         }
//       });
//
//     app.route(cfg.urlRaizApi + '/anuncios/:_idanuncio/precotemporada/:_idprecotemporada')
//     .all(app.auth.authenticate('usuario'))
//     .put(function get(req, res){
//
//         req.checkParam('_idanuncio').notEmpty().isMongoId();
//         req.checkParam('_idprecotemporada').notEmpty().isMongoId();
//
//         var erros = req.validationErrors();
//
//         if(!erros){
//
//         }else{
//           res.sendStatus(400).end();
//         }
//
//       });
//
// };