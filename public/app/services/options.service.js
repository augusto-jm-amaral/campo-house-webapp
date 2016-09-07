(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('Options', Options);

  Options.$inject = ['$http','Config'];

  function Options($http, Config) {

      var url = Config.getUrlApi();

      var service = {
        getNumAcomoda: getNumAcomoda,
        getTipoImovel: getTipoImovel,
        getComodidades: getComodidades,
        getOfertaValores: getOfertaValores
      };

     return service;

     ///////////////

     function getNumAcomoda() {

       var getUrl = url + '/numacomoda';

       return $http.get(getUrl);
     };
     function getTipoImovel() {

       var getUrl = url + '/tipoimovel';

       return $http.get(getUrl);
     };
     function getComodidades() {

       var getUrl = url + '/comodidades';

       return $http.get(getUrl);
     };
     function getOfertaValores() {

       var getUrl = url + '/ofertavalores';

       return $http.get(getUrl);
     };

  };

})();
