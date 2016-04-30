(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('Usuario', Usuario);

  Usuario.$inject = ['$http','Config'];

  function Usuario($http) {

      var url = Config.getUrlApi + '/usuarios';

      var service = {
        get: getUsuarios,
        save: saveUsuarios,
        delete: deleteUsuarios
      };

     return service;

     ///////////////

     function getUsuarios(_id, query) {

       var getUrl = url;

       if(_id){
         getUrl += '/' + _id;
       }

       if(query){
          getUrl += query;
       }

       return $http.get(url);
     };

     function saveUsuarios(usuario) {

       if(usuario._id){
         return $http.put(url, usuario);
       }else{
         return $http.post(url, usuario);
       }

     };

     function deleteUsuarios(usuario) {
       return $http.get(url + usuario._id);
     };

  };

})();
