(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('FaleConosco', FaleConosco);

  FaleConosco.$inject = ['$http','Config'];

  function FaleConosco($http, Config) {

      var url = Config.getUrlApi() + '/faleconosco';

      var service = {
        save: saveFaleConosco,
      };

     return service;

     ///////////////

     function saveFaleConosco(mensagem) {

         return $http.post(url, mensagem);

     };

  };

})();
