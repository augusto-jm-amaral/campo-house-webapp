(function () {
  'use strict';

  angular.module('campohouse').service('Plano',Plano);

  Plano.$inject = ['$http','Config'];

  function Plano($http, Config) {

    var vm = this;

    vm.contratar = function (num) {
      return $http.get(Config.getUrlApi() + '/planos/' + num);
    };

    return vm;
  };


})();
