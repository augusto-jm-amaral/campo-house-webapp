(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('Mensagem', Mensagem);

  Mensagem.$inject = ['$http','Config'];

  function Mensagem($http, Config) {

      var url = Config.getUrlApi() + '/anuncios';

      var service = {
        // get: getAnuncio,
        save: saveMensagem
        // delete: deleteAnuncio
      };

     return service;

     ///////////////

    //  function getAnuncio(_id, query) {
    //
    //    var getUrl = url;
    //
    //    if(_id){
    //      getUrl += '/' + _id;
    //    }
    //
    //    if(query){
    //       getUrl += query;
    //    }
    //
    //    return $http.get(getUrl);
    //  };

     function saveMensagem(mensagem) {

         return $http.post(url + '/' + mensagem.anuncio + '/mensagem' , mensagem);

     };

  };

})();
