(function () {
  'use strict';

  angular.module('campohouse').controller('ChatCtrl',ChatCtrl);

  ChatCtrl.$inject = ['Mensagem', '$http', 'toaster'];

  function ChatCtrl(Mensagem, $http, toaster) {

    var vm = this;

    vm.collapsedStyle = {height: '69px'};
    vm.isCollapsed = true;

    vm.openChat = function () {

      if(vm.isCollapsed){
        vm.collapsedStyle = {height: '50%'};
        vm.isCollapsed = false;
      }else{
        vm.collapsedStyle = {height: '69px'};
        vm.isCollapsed = true;
      }

    };

  };

})();
