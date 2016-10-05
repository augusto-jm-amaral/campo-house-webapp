(function () {
  'use strict';

  angular.module('campohouse').controller('PlanoCtrl',PlanoCtrl);

  PlanoCtrl.$inject = ['$rootScope', '$window', '$timeout', 'Login', '$location', 'toaster', 'Plano', '$http'];

  function PlanoCtrl($rootScope, $window, $timeout, Login, $location, toaster, Plano, $http) {

    var vm = this;

    vm.plano = {};

    if($window.sessionStorage.nome)
      vm.nome = $window.sessionStorage.nome.split(' ')[0];

    vm.showModalPlano = function (numPlano) {


      if($rootScope.logged){
        $http.get('/plan/' + numPlano)
        .then(function (res) {

          vm.plano = res.data;

          $timeout(function () {
            $('#modal-plano').modal('show');
          }, 10);

        }).catch(function (err) {
          console.log(err);
        });
      }else{
        toaster.pop({
          type:'info',
          title: 'Planos',
          body: "Você precisa fazer login para contratar um plano",
          showCloseButton: true
        });
        $location.path('/entrar');
      }

    };

    vm.contratar = function (num) {


      // $timeout(function () {
        $('#modal-plano').modal('hide');

        $('body').removeClass('modal-open');

        $('.modal-backdrop').remove();
      // }, 50);


        if(Login.islogin()){

          Plano.contratar(num)
          .then(function (res) {

            $location.path('/planosucesso/1/' + num );

          }).catch(function (err) {

            console.log(err);
            $location.path('/planosucesso/0/' + num );
            // toaster.pop({
            //   type:'info',
            //   title: 'Planos',
            //   body: "Você ainda possui mais de 15 dias de plano.",
            //   showCloseButton: true
            // });

          });

        }else{
          toaster.pop({
            type:'info',
            title: 'Planos',
            body: "Você precisa fazer login para contratar um plano",
            showCloseButton: true
          });
          $location.path('/entrar');
        }

    };

  };


})();
