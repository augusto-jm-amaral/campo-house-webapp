(function () {
  'use strict';

  angular.module('campohouse').controller('AnuncioCtrl',AnuncioCtrl);

  AnuncioCtrl.$inject = ['$scope', '$location', '$routeParams', 'Anuncio'];

  function AnuncioCtrl($scope, $location, $routeParams, Anuncio) {

    $('.carousel').carousel();

    console.log($routeParams._id);

    $scope.anuncio = {};

    Anuncio.get($routeParams._id,'')
      .then(function (res) {
        $scope.anuncio = res.data;

        console.log($scope.anuncio);
      })
      .catch(function () {
        toaster.pop({
          type:'error',
          title: 'Anúncio',
          body: "Erro ao carregar, tente novamente.",
          showCloseButton: true
        });
      });

  };

})();
