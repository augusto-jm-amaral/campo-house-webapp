(function () {
  'use strict';

  angular.module('campohouse').controller('PlanoCtrl',PlanoCtrl);

  PlanoCtrl.$inject = ['Login', '$location', 'toaster', 'Plano'];

  function PlanoCtrl(Login, $location, toaster, Plano) {

    var vm = this;

    vm.contratar = function (num) {

      if(Login.islogin()){

        Plano.contratar(num)
          .then(function (res) {

            toaster.pop({
              type:'success',
              title: 'Planos',
              body: "Plano contratado, você recebera um e-mail com instruções",
              showCloseButton: true
            });

          }).catch(function (err) {

            console.log(err);
            toaster.pop({
              type:'warning',
              title: 'Planos',
              body: "Ocorreu um erro, tente novamente ou entre em contato",
              showCloseButton: true
            });

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
