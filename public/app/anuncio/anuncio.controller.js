var lat = 0;
var lng = 0;
var title = '';

(function () {
  'use strict';

  angular.module('campohouse').controller('AnuncioCtrl',AnuncioCtrl);

  AnuncioCtrl.$inject = ['$scope', '$location', '$routeParams', 'Anuncio', 'Mensagem', 'toaster', 'Logradouro'];

  function AnuncioCtrl($scope, $location, $routeParams, Anuncio, Mensagem, toaster, Logradouro) {

    $('.carousel').carousel();

    // console.log($routeParams._id);

    $scope.anuncio = {};

    $scope.fotoPrincipal = {};

    $scope.mensagem = {
      texto: ''
    };

    $scope.map = '';

    $scope.logradouro = {};

    $scope.map = null;
    $scope.marker = null;

    Logradouro.get($routeParams._id,'')
      .then(function (res) {
        $scope.logradouro = res.data;

        if($scope.logradouro){

          // lat = $scope.logradouro.lat;
          // lng = $scope.logradouro.lng;

          $scope.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: $scope.logradouro.lat, lng: $scope.logradouro.lng},
            zoom: 15
          });

          $scope.marker = new google.maps.Marker({
              map: $scope.map,
              position: {lat: $scope.logradouro.lat, lng: $scope.logradouro.lng},
              title: "Minha CampuHouse"
            });

        }

      })
      .catch(function (err) {

      });

    Anuncio.get($routeParams._id,'')
      .then(function (res) {

        $scope.fotoPrincipal = res.data.listaArquivos.shift();

        for (var i = 0; i < res.data.listaArquivos.length; i++) {
          res.data.listaArquivos[i].num = i + 1;
        }

        $scope.anuncio = res.data;
        $scope.mensagem.anuncio = $scope.anuncio._id;
        title = $scope.anuncio.sobreTitulo;

      })
      .catch(function () {

        toaster.pop({
          type:'error',
          title: 'Anúncio',
          body: "Erro ao carregar, tente novamente.",
          showCloseButton: true
        });

      });

      $scope.formatTeleone = function (telefone) {

        if(!telefone)
          return '';

        return '(' + telefone.substr(0,2) + ') ' + ((telefone.length - 2) > 8 ? (telefone.substr(2,5) ) : ((telefone.substr(2,4) ))) + '-' + ((telefone.length - 2) > 8 ? (telefone.substr(7,4) ) : ((telefone.substr(6,4) )));

      };

      $scope.enviarMensagem = function () {
        if($scope.mensagem.texto){
          Mensagem.save($scope.mensagem)
          .then(function (res) {
            toaster.pop({
              type:'success',
              title: 'Mensagem',
              body: "Mensagem enviada com sucesso.",
              showCloseButton: true
            });

            $scope.mensagem.texto = '';
          }).catch(function (err) {
            toaster.pop({
              type:'error',
              title: 'Mensagem',
              body: "Erro ao enviar a mensagem.",
              showCloseButton: true
            });
          });
        }
      };
  };


})();
