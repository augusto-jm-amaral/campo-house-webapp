(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('Anuncio', Anuncio);

  Anuncio.$inject = ['$http','Config'];

  function Anuncio($http) {

      var url = Config.getUrlApi + '/anuncios';

      var service = {
        get: getAnuncio,
        save: saveAnuncio,
        delete: deleteAnuncio
      };

     return service;

     ///////////////

     function getAnuncio(_id, query) {

       var getUrl = url;

       if(_id){
         getUrl += '/' + _id;
       }

       if(query){
          getUrl += query;
       }

       return $http.get(url);
     };

     function saveAnuncio(anuncio) {

       if(anuncio._id){
         return $http.put(url, usuario);
       }else{
         return $http.post(url, usuario);
       }

     };

     function deleteAnuncio(usuario) {
       return $http.get(url + usuario._id);
     };

  };

})();
