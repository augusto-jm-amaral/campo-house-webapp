(function () {
  'use strict';

  angular.module('campohouse').controller('ValidarCadastroCtrl',ValidarCadastroCtrl);

  ValidarCadastroCtrl.$inject = ['$routeParams','$rootScope', '$window', '$timeout', 'Login', '$location', 'toaster', 'Plano', '$http'];

  function ValidarCadastroCtrl($routeParams, $rootScope, $window, $timeout, Login, $location, toaster, Plano, $http) {

    var vm = this;

    if($routeParams._hash){
      vm._hash = $routeParams._hash;

      // if($rootScope.logged){

        $http.get('/usuarios/validaremail/' + vm._hash)
        .then(function (res) {

          vm.success = 'true'

        }).catch(function (err) {
          vm.success = 'false'
          console.log(err);
        });

      // }else{
      //
      //   toaster.pop({
      //     type:'info',
      //     title: 'Validação',
      //     body: "Você precisa fazer login para validar seu e-mail",
      //     showCloseButton: true
      //   });
      //
      //   $location.path('/entrar');
      //
      // }
    }
  };



})();
