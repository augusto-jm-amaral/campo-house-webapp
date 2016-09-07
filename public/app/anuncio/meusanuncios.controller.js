(function () {
  'use strict';

  angular.module('campohouse').controller('MeusAnunciosCtrl',MeusAnunciosCtrl);

  MeusAnunciosCtrl.$inject = ['$scope', '$location', 'Anuncio'];

  function MeusAnunciosCtrl($scope, $location, Anuncio) {

    $scope.anuncios = [];

    Anuncio.getMeusAnuncio()
      .then(function (res) {
        $scope.anuncios = res.data;
      }).catch(function (err) {

      });

    $scope.validaAnuncio = function (anuncio) {

        //Tem de ter fotos
        if(!anuncio.listaArquivos.length)
          return false;

        // A diaria tem que ter um valor
        if(!anuncio.precoDiaria)
          return false;

        return true;
    };

  };

})();
