(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('Anuncio', Anuncio);

  Anuncio.$inject = ['$http','Config'];

  function Anuncio($http, Config) {

      var url = Config.getUrlApi() + '/anuncios';

      var service = {
        get: getAnuncio,
        save: saveAnuncio,
        delete: deleteAnuncio,
        getMeusAnuncio: getMeusAnuncio,
        getEdit: getAnuncioEdit
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

       return $http.get(getUrl);
     };

     function getMeusAnuncio() {

       var getUrl = url;

       return $http.get(getUrl + '/meusanuncios');
     };

     function getAnuncioEdit(_id) {

       var getUrl = url + '/' + _id + '/edit';

       return $http.get(getUrl);
     };

     function saveAnuncio(anuncio) {

       if(anuncio._id){
         return $http.put(url + '/' + anuncio._id , anuncio);
       }else{
         return $http.post(url, anuncio);
       }

     };

     function deleteAnuncio(usuario) {
       return $http.get(url + usuario._id);
     };

  };

})();
