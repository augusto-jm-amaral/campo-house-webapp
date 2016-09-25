(function () {
  'use strict';

  angular
    .module('campohouse')
    .service('Email', Email);

    Email.$inject = ['$http', 'Config'];

    function Email($http, Config) {

      var vm = this;

      vm.save = function save(email) {
        return $http.post(Config.getUrlApi() + '/emails', {email: email});
      };

      return vm;

    };


})();
