(function () {

  angular.module('campohouse').controller('CadastroAnuncioCtrl', CadastroAnuncioCtrl);

  // CadastroAnuncioCtrl.$inject = ['$scope', '$location', 'Anuncio', 'toaster'];
  CadastroAnuncioCtrl.$inject = ['$scope', '$location', 'Anuncio', 'toaster', 'Logradouro'];

  // function CadastroAnuncioCtrl($scope, $location, Anuncio, toaster) {
  function CadastroAnuncioCtrl($scope, $location, Anuncio, toaster, Logradouro) {

    $scope.optionsEspacos = [
      {name: 'Não desejo informar.', value: -1},
      {name: 'Até 1', value: 1},
      {name: 'Até 2', value: 2},
      {name: 'Até 3', value: 3},
      {name: 'Até 10', value: 10},
      {name: 'Até 15', value: 15},
      {name: 'Até 20', value: 20},
      {name: 'Mais de 20', value: 99}
    ];
    // console.log($scope.optionsEspacos[0].value);
    // $scope.selecionado = $scope.optionsEspacos[0].value;

    $scope.anuncio = {
      sobreTitulo: '',
      sobreDescricao: '',
      numQuartos: $scope.optionsEspacos[0].value,
      numBanheiros: $scope.optionsEspacos[0].value,
      numCamas: $scope.optionsEspacos[0].value,
      numMaxVisitantes: $scope.optionsEspacos[0].value
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

        Anuncio.save($scope.anuncio)
          .then(function (res) {

            $scope.anuncio = res.data;

            $("#tabs-anuncio a[aria-controls='"+ next + "']").tab('show');

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
              body: "Erro ao salvar, tente novamente.",
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

      $('#btnGravarComodidade').on('click', function(){
        $("#tabs-anuncio a[aria-controls='ofertavalor']").tab('show');
      });

      $('#btnVoltarComodidade').on('click', function(){
        $("#tabs-anuncio a[aria-controls='espaco']").tab('show');
      });


      $('#btnGravarOfertaValor').on('click', function(){
        $("#tabs-anuncio a[aria-controls='preco']").tab('show');
      });

      $('#btnVoltarOfertaValor').on('click', function(){
        $("#tabs-anuncio a[aria-controls='comodidade']").tab('show');
      });


      $('#btnGravarPreco').on('click', function(){
        $("#tabs-anuncio a[aria-controls='fotos']").tab('show');
      });

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
