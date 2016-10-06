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
                nome: 'Mensal'
            }, function(err, planos) {
                if (!planos.length) {
                    new Planos({
                        nome: 'Mensal',
                        ordem: 1,
                        preco: 44.9,
                        duracao: (86400000 * 30), // 1 dia x 30
                        dias: 30,
                        parcelas: 1,
                        valorParcela: 44.9,
                        economia: 0,
                        descricao: 'Neste plano seu anúncio fica disponível por um prazo máximo de 30 dias a partir da data do cadastro.'
                    }).save();
                }
            });

            Planos.find({
                nome: 'Semestral'
            }, function(err, planos) {
                if (!planos.length) {
                    new Planos({
                        nome: 'Semestral',
                        ordem: 2,
                        preco: 137.4,
                        parcelas: 6,
                        valorParcela: 22.9,
                        economia: 48,
                        duracao: (86400000 * 180),
                        dias: 180,
                        descricao: 'Neste plano seu anúncio fica disponível por um prazo máximo de 180 dias a partir da data do cadastro.'
                    }).save();
                }
            });

            Planos.find({
                nome: 'Anual'
            }, function(err, planos) {
                if (!planos.length) {
                    new Planos({
                        nome: 'Anual',
                        ordem: 3,
                        preco: 178.8,
                        parcelas: 12,
                        valorParcela: 14.9,
                        economia: 66,
                        dias: 365,
                        duracao: (86400000 * 365),
                        descricao: 'Neste plano seu anúncio fica disponível por um prazo máximo de 365 dias a partir da data do cadastro.'
                    }).save();
                }
            });

            Planos.find({
                nome: 'Free'
            }, function(err, planos) {

                if (!planos.length) {

                    new Planos({
                        nome: 'Free',
                        ordem: 4,
                        preco: 0,
                        parcelas: 0,
                        valorParcela: 0,
                        economia: 0,
                        dias: 0,
                        duracao: (86400000 * 30),
                        descricao: '30 dias a partir da data do cadastro do usuário no site. Este plano NÃO estará disponível para o usuário contratar, será vinculado automaticamente no momento do cadastro.'
                    }).save(function (err) {
                    });
                }
            });

            Planos.find({
                nome: 'Promo Lançamento'
            }, function(err, planos) {
                if (!planos.length) {
                    new Planos({
                        nome: 'Promo Lançamento',
                        ordem: 5,
                        preco: 0,
                        parcelas: 0,
                        valorParcela: 0,
                        economia: 0,
                        dias: 0,
                        duracao: new Date(2016, 12, 31, 23, 59, 99).getTime(),
                        descricao: 'até 31/12 para os 50 primeiros usuários que se cadastrarem e realizarem o anúncio no site. Este plano também não estará disponível para o usuário optar por sua contratação, será automatico para quem estiver dentro da regra citada acima'
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
                            descComodidade: 'Playground',
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

                        new Comodidades({
                            descComodidade: 'Quadra Poliesportiva',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Campo de Futebol',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Rio',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Lago',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Barcos',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Motor de Popa',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Pesca',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Salão de Jogos',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Mesa de Sinuka',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Mesa para Tênis de Mesa',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Pomar',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Trilhas',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Antena Parabólica',
                            categoria: categoria._id
                        }).save();

                        new Comodidades({
                            descComodidade: 'Vista Panorâmica',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Churrasqueira',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Estacionamento',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Fogão à Gás',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Forno de Pizza',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Freezer',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Geladeira',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Internet sem Fio',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Basico - Toalhas, Lençóis, Sabonete Papel Higiênico',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Permitido Animais',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Permitido Fumar',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Cabides',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Ferro Elétrico',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Secador de Cabelo',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Segurança 24hrs',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Utensílios de Cozinha',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Ventilador de Teto',
                            categoria: categoria._id
                        }).save();
                        new Comodidades({
                            descComodidade: 'Vestiários',
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
            TipoImovelOption.find({
                nome: 'Área de Lazer'
            }, function(err, tipos) {
                if (!tipos.length) {
                    new TipoImovelOption({
                        nome: 'Área de Lazer'
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
