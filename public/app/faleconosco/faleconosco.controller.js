(function() {
    'use strict';

    angular.module('campohouse').controller('FaleConoscoCtrl', FaleConoscoCtrl);

    FaleConoscoCtrl.$inject = ['$scope', '$location', 'FaleConosco', 'toaster'];

    function FaleConoscoCtrl($scope, $location, FaleConosco, toaster) {

        $scope.mensagem = {};

        $scope.enviarMensagem = function (){
          console.log($scope.mensagem);
          console.log($scope.formFaleConosco.$valid);
          if($scope.formFaleConosco.$valid){
            FaleConosco.save($scope.mensagem)
            .then(function (res) {

              $scope.mensagem = {};

              $scope.formFaleConosco.nome.$touched = false;
              $scope.formFaleConosco.email.$touched = false;
              $scope.formFaleConosco.mensagem.$touched = false;
              $scope.formFaleConosco.telefone.$touched = false;

              toaster.pop({
                type:'success',
                title: 'Mensagem',
                body: "Mensagem enviada com sucesso.",
                showCloseButton: true
              });

            }).catch(function (err) {
              // console.log(err);

              toaster.pop({
                type:'error',
                title: 'Mensagem',
                body: "Ocorreu um erro ao enviar a mensagem.",
                showCloseButton: true
              });

            });
          }
        };

    };

})();
