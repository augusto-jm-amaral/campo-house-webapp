(function () {

  angular.module('campohouse').controller('CadastroAnuncioCtrl', CadastroAnuncioCtrl);

  // CadastroAnuncioCtrl.$inject = ['$scope', '$location', 'Anuncio', 'toaster'];
  CadastroAnuncioCtrl.$inject = ['$scope', '$location', 'Anuncio', 'toaster', 'Logradouro', 'Options'];

  // function CadastroAnuncioCtrl($scope, $location, Anuncio, toaster) {
  function CadastroAnuncioCtrl($scope, $location, Anuncio, toaster, Logradouro, Options) {

    $scope.anuncio = {
      sobreTitulo: '',
      sobreDescricao: '',
      numQuartos: 0,
      numBanheiros: 0,
      numCamas: 0,
      precoDiaria: 0,
      oquelevar: '',
      oquenaolevar: '',
      listaComodidades: [],
      listaOfertaValores: []
    };

    $scope.tipoImovelOptions = [];
    $scope.numAcomodaOptions = [];
    $scope.comodidades = [];
    $scope.ofertaValores = [];

    Options.getTipoImovel()
      .then(function (res) {
        $scope.tipoImovelOptions = res.data;
        $scope.anuncio.tipoImovel = $scope.tipoImovelOptions[0]._id;
        // console.log($scope.tipoImovelOptions[0]._id);
      }).catch(function (err) {
        console.log(err);
      });

    Options.getNumAcomoda()
      .then(function (res) {
        $scope.numAcomodaOptions = res.data;
        $scope.anuncio.numAcomoda = $scope.numAcomodaOptions[0]._id;
      }).catch(function (err) {
        console.log(err);
      });

    Options.getComodidades()
      .then(function (res) {
        $scope.comodidades = res.data;
        // $scope.anuncio.numAcomoda = $scope.numAcomodaOptions[0]._id;
      }).catch(function (err) {
        console.log(err);
      });

    Options.getOfertaValores()
      .then(function (res) {
        $scope.ofertaValores = res.data;
        // $scope.ofertaValores[0].checked = true;
        // $scope.anuncio.numAcomoda = $scope.numAcomodaOptions[0]._id;
      }).catch(function (err) {
        console.log(err);
      });

    $scope.checkComodidade = function (_id) {

        var listaAux = []
        var existe = false;

        for (var i = 0; i < $scope.anuncio.listaComodidades.length; i++) {
          if($scope.anuncio.listaComodidades[i]==_id){
            existe = true;
          }else{
            listaAux.push($scope.anuncio.listaComodidades[i])
          }
        }

        if(existe){
          $scope.anuncio.listaComodidades = listaAux;
        }else{
          $scope.anuncio.listaComodidades.push(_id);
        }
    };

    $scope.checkOfertaValor = function (_id) {

        var listaAux = []
        var existe = false;

        for (var i = 0; i < $scope.anuncio.listaOfertaValores.length; i++) {
          if($scope.anuncio.listaOfertaValores[i]==_id){
            existe = true;
          }else{
            listaAux.push($scope.anuncio.listaOfertaValores[i])
          }
        }

        if(existe){
          $scope.anuncio.listaOfertaValores = listaAux;
        }else{
          $scope.anuncio.listaOfertaValores.push(_id);
        }
    };


    $scope.logradouro = {
      localCep: '',
      localRua: '',
      localNumero: '',
      localBairro: '',
      localCidade: '',
      localEstado: 'São Paulo',
      localPais: 'Brasil',
      localInfoProximidades: '',
      localComplemento: ''
    };

    $scope.salvarAnuncio = function (next) {

      // if($scope.formGeral.$valid){
        // console.log($scope.anuncio);
        Anuncio.save($scope.anuncio)
          .then(function (res) {

            // if(anuncio._id)
            $("#tabs-anuncio a[aria-controls='"+ next + "']").tab('show');

            $scope.anuncio = res.data;

            toaster.pop({
              type:'success',
              title: 'Anúncio',
              body: "Salvo com sucesso.",
              showCloseButton: true
            });

          }).catch(function (err) {

            toaster.pop({
              type:'error',
              title: 'Anúncio',
              body: "Erro ao salvar, tente novamente.",
              showCloseButton: true
            });

          })

      // }

    };

    $scope.salvarLogradouro = function () {

      $("#tabs-anuncio a[aria-controls='espaco']").tab('show');

      if($scope.formLogradouro.$valid && $scope.anuncio._id){


        Logradouro.save($scope.anuncio._id ,$scope.logradouro)
          .then(function (res) {

            $scope.logradouro = res.data;


            toaster.pop({
              type:'success',
              title: 'Anúncio',
              body: "Salvo com sucesso.",
              showCloseButton: true
            });

          }).catch(function (err) {

            toaster.pop({
              type:'error',
              title: 'Anúncio',
              body: "O Endereço não foi encontrado.",
              showCloseButton: true
            });

          })

      }else{

        toaster.pop({
          type:'warning',
          title: 'Anúncio',
          body: "Faltam dados na localização.",
          showCloseButton: true
        });

      }

    };



  	$scope.eventsWizard = function() {

      // $('#btnGravarGeral').on('click', function(){
      //   $("#tabs-anuncio a[aria-controls='localizacao']").tab('show');
      // });

      // $('#btnGravarLocal').on('click', function(){
      //   $("#tabs-anuncio a[aria-controls='espaco']").tab('show');
      // });

      $('#btnVoltarLocal').on('click', function(){
        $("#tabs-anuncio a[aria-controls='geral']").tab('show');
      });


      // $('#btnGravarEspaco').on('click', function(){
      //   $("#tabs-anuncio a[aria-controls='comodidade']").tab('show');
      // });

      $('#btnVoltarEspaco').on('click', function(){
        $("#tabs-anuncio a[aria-controls='localizacao']").tab('show');
      });

      // $('#btnGravarComodidade').on('click', function(){
      //   $("#tabs-anuncio a[aria-controls='ofertavalor']").tab('show');
      // });

      $('#btnVoltarComodidade').on('click', function(){
        $("#tabs-anuncio a[aria-controls='espaco']").tab('show');
      });


      // $('#btnGravarOfertaValor').on('click', function(){
      //   $("#tabs-anuncio a[aria-controls='preco']").tab('show');
      // });

      $('#btnVoltarOfertaValor').on('click', function(){
        $("#tabs-anuncio a[aria-controls='comodidade']").tab('show');
      });


      // $('#btnGravarPreco').on('click', function(){
      //   $("#tabs-anuncio a[aria-controls='fotos']").tab('show');
      // });

      $('#btnVoltarPreco').on('click', function(){
        $("#tabs-anuncio a[aria-controls='ofertavalor']").tab('show');
      });


      $('#btnVoltarFotos').on('click', function(){
        $("#tabs-anuncio a[aria-controls='preco']").tab('show');
      });



  	};

  	$scope.eventsWizard();

  };

})();
