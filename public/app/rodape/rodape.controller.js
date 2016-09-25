(function () {
  'use strict';

  angular
    .module('campohouse')
    .controller('RodapeCtrl', RodapeCtrl);

    RodapeCtrl.$inject = ['Email', 'toaster'];

    function RodapeCtrl(Email, toaster) {
      /* jshint validthis: true */
      var vm = this;

      vm.email = '';

      vm.cadastraEmail = function () {
          if(vm.formnews.$valid){
            Email.save(vm.email)
            .finally(function () {

              vm.email = '';

              toaster.pop({
                type:'info',
                title: 'Email',
                body: "Email cadastrado com sucesso.",
                showCloseButton: true
              });
            });
          }
      };

    };

})();
