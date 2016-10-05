(function () {
  'use strict';

  angular.module('campohouse').controller('PlanoSucessoCtrl',PlanoSucessoCtrl);

  PlanoSucessoCtrl.$inject = ['$rootScope', '$routeParams', '$window', '$timeout', 'Login', '$location', 'toaster', 'Plano', '$http'];

  function PlanoSucessoCtrl($rootScope, $routeParams, $window, $timeout, Login, $location, toaster, Plano, $http) {

// :_success/:_numplano

    var vm = this;

    vm.numPlano = $routeParams._numplano;
    vm.success = $routeParams._success;

    vm.plano = {};

    if($window.sessionStorage.nome)
      vm.nome = $window.sessionStorage.nome.split(' ')[0];

    $http.get('/plan/' + vm.numPlano)
    .then(function (res) {

      vm.plano = res.data;

      $timeout(function () {
        $('#modal-plano').modal('show');
      }, 10);

    }).catch(function (err) {
      console.log(err);
    });

  };


})();
