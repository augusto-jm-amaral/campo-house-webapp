(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('Usuario', Usuario);

  Usuario.$inject = ['$http'];

  function Usuario($http) {

      var url = '/usuarios';

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

       return $http.get(getUrl);
     };

     function saveUsuarios(usuario) {

       // console.log(url);

       if(usuario._id){
         return $http.put(url + '/' + usuario._id, usuario);
       }else{
         return $http.post(url, usuario);
       }

     };

     function deleteUsuarios(usuario) {
       return $http.get(url + usuario._id);
     };

  };

})();
