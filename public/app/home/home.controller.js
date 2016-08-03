(function () {
  'use strict';

  angular.module('campohouse').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', '$location'];

  function HomeCtrl($scope, $location) {

    $scope.nomeCidade = '';

  };

})();
