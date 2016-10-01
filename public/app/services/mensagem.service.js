(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('Mensagem', Mensagem);

  Mensagem.$inject = ['$http','Config'];

  function Mensagem($http, Config) {

      var url = Config.getUrlApi() + '/anuncios';

      var service = {
        get: getAnuncio,
        save: saveMensagem,
        getById: getById
        // delete: deleteAnuncio
      };

     return service;

     ///////////////

     function getAnuncio(_id, query) {

       var getUrl = Config.getUrlApi() + '/mensagens';
       return $http.get(getUrl);
     };

     function getById(_id) {
       var getUrl = Config.getUrlApi() + '/mensagens/' + _id;    
       return $http.get(getUrl);
     };

     function saveMensagem(mensagem) {

         return $http.post(url + '/' + mensagem.anuncio + '/mensagem' , mensagem);

     };

  };

})();
