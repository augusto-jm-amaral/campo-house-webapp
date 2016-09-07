module.exports = function(app) {

    var populate = {
        run: function() {

            const Categorias = app.db.models.Categorias;
            const Comodidades = app.db.models.Comodidades;
            const TipoImovelOption = app.db.models.TipoImovelOption;
            const NumAcomodaOption = app.db.models.NumAcomodaOption;
            const OfertaValores = app.db.models.OfertaValores;
            const Planos = app.db.models.Planos;

            Planos.find({
                nome: 'Gratuito'
            }, function(err, planos) {
                if (!planos.length) {
                    new Planos({
                        nome: 'Gratuito',
                        ordem: 1,
                        showLocalizacao: false,
                        showContato: false,
                        showMensagem: true,
                        preco: 0,
                        duracao: 9999,
                        descricao: 'Plano Gratuito'
                    }).save();
                }
            });

            Planos.find({
                nome: 'Vip'
            }, function(err, planos) {
                if (!planos.length) {
                    new Planos({
                        nome: 'Vip',
                        ordem: 2,
                        showLocalizacao: true,
                        showContato: true,
                        showMensagem: true,
                        preco: 20,
                        duracao: 30,
                        descricao: 'Plano Vip'
                    }).save();
                }
            });

            Categorias.find({
                descCategoria: 'composta'
            }, function(err, categoria) {
                if (!categoria.length) {

                    var categoria = new Categorias({
                        descCategoria: 'composta',
                        tipo: 'textArea'
                    });

                    categoria.save(function(err, categoria) {

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

            Categorias.find({
                descCategoria: 'simples'
            }, function(err, categoria) {
                if (!categoria.length) {

                    var categoria = new Categorias({
                        descCategoria: 'simples',
                        tipo: 'checkbox'
                    });

                    categoria.save(function(err, categoria) {

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

            TipoImovelOption.find({
                nome: 'Casa para enventos'
            }, function(err, tipos) {
                if (!tipos.length) {
                    new TipoImovelOption({
                        nome: 'Casa para enventos'
                    }).save();
                }
            });
            TipoImovelOption.find({
                nome: 'Chácara'
            }, function(err, tipos) {
                if (!tipos.length) {
                    new TipoImovelOption({
                        nome: 'Chácara'
                    }).save();
                }
            });
            TipoImovelOption.find({
                nome: 'Chalé'
            }, function(err, tipos) {
                if (!tipos.length) {
                    new TipoImovelOption({
                        nome: 'Chalé'
                    }).save();
                }
            });
            TipoImovelOption.find({
                nome: 'Fazenda'
            }, function(err, tipos) {
                if (!tipos.length) {
                    new TipoImovelOption({
                        nome: 'Fazenda'
                    }).save();
                }
            });
            TipoImovelOption.find({
                nome: 'Rancho'
            }, function(err, tipos) {
                if (!tipos.length) {
                    new TipoImovelOption({
                        nome: 'Rancho'
                    }).save();
                }
            });
            TipoImovelOption.find({
                nome: 'Sítio'
            }, function(err, tipos) {
                if (!tipos.length) {
                    new TipoImovelOption({
                        nome: 'Sítio'
                    }).save();
                }
            });


            NumAcomodaOption.find({
                nome: 'Até 5'
            }, function(err, acomoda) {
                if (!acomoda.length) {
                    new NumAcomodaOption({
                        nome: 'Até 5',
                        num: 5
                    }).save();
                }
            });
            NumAcomodaOption.find({
                nome: 'Até 10'
            }, function(err, acomoda) {
                if (!acomoda.length) {
                    new NumAcomodaOption({
                        nome: 'Até 10',
                        num: 10
                    }).save();
                }
            });
            NumAcomodaOption.find({
                nome: 'Até 15'
            }, function(err, acomoda) {
                if (!acomoda.length) {
                    new NumAcomodaOption({
                        nome: 'Até 15',
                        num: 15
                    }).save();
                }
            });
            NumAcomodaOption.find({
                nome: 'Até 20'
            }, function(err, acomoda) {
                if (!acomoda.length) {
                    new NumAcomodaOption({
                        nome: 'Até 20',
                        num: 20
                    }).save();
                }
            });
            NumAcomodaOption.find({
                nome: 'Até 30'
            }, function(err, acomoda) {
                if (!acomoda.length) {
                    new NumAcomodaOption({
                        nome: 'Até 30',
                        num: 30
                    }).save();
                }
            });
            NumAcomodaOption.find({
                nome: 'Até 40'
            }, function(err, acomoda) {
                if (!acomoda.length) {
                    new NumAcomodaOption({
                        nome: 'Até 40',
                        num: 40
                    }).save();
                }
            });
            NumAcomodaOption.find({
                nome: 'Até 50'
            }, function(err, acomoda) {
                if (!acomoda.length) {
                    new NumAcomodaOption({
                        nome: 'Até 50',
                        num: 50
                    }).save();
                }
            });
            NumAcomodaOption.find({
                nome: 'Mais de 50'
            }, function(err, acomoda) {
                if (!acomoda.length) {
                    new NumAcomodaOption({
                        nome: 'Mais de 50',
                        num: 99
                    }).save();
                }
            });

            OfertaValores.find({
                nome: 'Perfeito para Pesca'
            }, function(err, oferta) {
                if (!oferta.length) {
                    new OfertaValores({
                        nome: 'Perfeito para Pesca'
                    }).save();
                }
            });
            OfertaValores.find({
                nome: 'Festa com Amigos'
            }, function(err, oferta) {
                if (!oferta.length) {
                    new OfertaValores({
                        nome: 'Festa com Amigos'
                    }).save();
                }
            });
            OfertaValores.find({
                nome: 'Folga em Família'
            }, function(err, oferta) {
                if (!oferta.length) {
                    new OfertaValores({
                        nome: 'Folga em Família'
                    }).save();
                }
            });
            OfertaValores.find({
                nome: 'Eventos'
            }, function(err, oferta) {
                if (!oferta.length) {
                    new OfertaValores({
                        nome: 'Eventos'
                    }).save();
                }
            });

        }
    }

    return populate;
    // }
};
