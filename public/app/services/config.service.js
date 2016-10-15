(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('Config', Config);

  Config.$inject = [];

  function Config() {

      var urlApi = '';

      var service = {
        getUrlApi: getUrlApi
      };

     return service;

     ///////////////

     function getUrlApi() {
       return urlApi;
     };

  };

})();
