(function() {
    'use strict';

    angular.module('campohouse').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$location', '$http', 'Config'];

    function HomeCtrl($scope, $location, $http, Config) {

        $scope.nomeCidade = '';
        $scope.cidades = [];
        $scope.anuncioshome = [];

        $http.get(Config.getUrlApi() + '/cidades')
            .then(function(res) {
                $scope.cidades = res.data;
                $scope.nomeCidade = $scope.cidades[0];
            }).catch(function(err) {

            });

        $http.get(Config.getUrlApi() + '/anunciosrecentes')
            .then(function(res) {
                $scope.anuncioshome = res.data;
            }).catch(function(err) {

            });

            $scope.obterData = function (data) {
              var data = new Date(data);
              var tempo = new Date(new Date().getTime() - data.getTime());

              var minutos = tempo.getMinutes();
              var horas = tempo.getHours();
              var dias = tempo.getDate();

              var dataFormat = '';

              dataFormat += (dias ? dias + 'd' : '');
              dataFormat += (horas ? ' ' + horas + 'h' : '');
              dataFormat += (minutos ? ' ' + minutos + 'm' : '');

              return dataFormat;
            }

    };

})();
