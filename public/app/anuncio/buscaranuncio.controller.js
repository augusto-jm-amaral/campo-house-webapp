(function () {
  'use strict';

  angular.module('campohouse').controller('BuscarAnuncioCtrl',BuscarAnuncioCtrl);

  BuscarAnuncioCtrl.$inject = ['$scope', '$location', '$routeParams', 'Anuncio'];

  function BuscarAnuncioCtrl($scope, $location, $routeParams, Anuncio) {

    $scope.maxSize = 9;
    $scope.bigTotalItems = 50;
    $scope.pagina = 1;

    $scope.optionsModel = { debounce: 1000 };

    $scope.anuncios = [];
    $scope.count = 0;

    $scope.busca = {
      numQuartos: 0,
      valor: 1000,
      hospedes: 0,
      cidade: ''
    };

    $scope.buscando = false;

    $scope.$watch('busca.hospedes', function(newVal, oldVal){
      $scope.verificarBuscaEBuscar();
    });
    $scope.$watch('busca.valor', function(newVal, oldVal){
      $scope.verificarBuscaEBuscar();
    });
    $scope.$watch('busca.numQuartos', function(newVal, oldVal){
      $scope.verificarBuscaEBuscar();
    });
    $scope.$watch('busca.cidade', function(newVal, oldVal){
      $scope.verificarBuscaEBuscar();
    });

    $scope.verificarBuscaEBuscar = function () {

      if($scope.buscando){
        $scope.buscando = false;
        $scope.buscarAnuncios();
      }
    };

    if($routeParams._nomeCidade){
      $scope.busca.cidade = $routeParams._nomeCidade;
    }

    // $scope.changeInput = function () {
    //   console.log($scope.busca);
    // };

    $scope.buscarAnuncios = function () {

      var query = '?pagina=' + $scope.pagina;
      query += '&numQuartos=' + $scope.busca.numQuartos;
      query += '&valor=' + $scope.busca.valor;
      query += '&hospedes=' + $scope.busca.hospedes;
      query += '&cidade=' + $scope.busca.cidade;

      Anuncio.get(null, query)
        .then(function (res) {
          $scope.anuncios = res.data.anuncios;
          $scope.count = res.data.count;
          $scope.buscando = true;
        }).catch(function (err) {
          console.log(err);
        });
    };

    $scope.buscarAnuncios();

  };

})();
