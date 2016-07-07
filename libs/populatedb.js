module.exports = function (app) {

    var populate = {
      run: function () {

        const Categorias = app.db.models.Categorias;
        const Comodidades = app.db.models.Comodidades;

        Categorias.find({descCategoria: 'composta'}, function (err, categoria) {
            if(!categoria.length){

              var categoria = new Categorias({
                descCategoria: 'composta',
                tipo: 'textArea'
              });

              categoria.save(function (err, categoria) {

                new Comodidades({
                  descComodidade: 'O que Levar',
                  categoria: categoria._id
                }).save();

                new Comodidades({
                  descComodidade: 'O que Não Levar',
                  categoria: categoria._id
                }).save();

              });
            }

        });

        Categorias.find({descCategoria: 'simples'}, function (err, categoria) {
            if(!categoria.length){

              var categoria = new Categorias({
                descCategoria: 'simples',
                tipo: 'checkbox'
              });

              categoria.save(function (err, categoria) {

                new Comodidades({
                  descComodidade: 'TV',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'TV a Cabo',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Ar Condicionado',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Cozinha',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Internet',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Máquina de Lavar',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Secadora',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Café da Manhã',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Estacionamento',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Academia',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Lareira Interna',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Piscina',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Sauna',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Quadra de Esportes',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Playground para Crianças',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Acessível para Cadeira de Rodas',
                  categoria: categoria._id
                }).save();
                new Comodidades({
                  descComodidade: 'Fogão a Lenha',
                  categoria: categoria._id
                }).save();

              });

            }

          });
        //
        // Comodidades.find({descComodidade: ''}, function (err, comodidades) {
        //     if(!comodidades.length){
        //
        //       var comodidade = new Categorias({
        //         descCategoria: 'composta',
        //         tipo: 'checkbox'
        //       });
        //
        //       console.log(categoria);
        //
        //       categoria.save();
        //
        //     }
        //
        //   });

      }
    }

    return populate;
  // }
};
