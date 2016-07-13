(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('Logradouro', Logradouro);

  Logradouro.$inject = ['$http','Config'];

  function Logradouro($http, Config) {

      var url = Config.getUrlApi() + '/anuncios';

      var service = {
        get: getLogradouro,
        save: saveLogradouro,
        delete: deleteLogradouro
      };

     return service;

     ///////////////

     function getLogradouro(_idanuncio, query) {

       var getUrl = url;

       if(_id){
         getUrl += '/' + _id + '/logradouros';
       }

       if(query){
          getUrl += query;
       }

       return $http.get(url);
     };

     function saveLogradouro(_idanuncio, logradouro) {

       if(logradouro._id){
         return $http.put(url + '/' + _idanuncio + '/logradouros', logradouro);
       }else{
         return $http.post(url + '/' + _idanuncio + '/logradouros', logradouro, logradouro);
       }

     };

     function deleteLogradouro(_idanuncio) {
       return $http.get(url + _idanuncio + '/logradouros');
     };

  };

})();
