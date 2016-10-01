(function () {
  'use strict';

  angular.module('campohouse').controller('MensagensCtrl',MensagensCtrl);

  MensagensCtrl.$inject = ['$scope', 'Mensagem', '$http', 'toaster'];

  function MensagensCtrl($scope, Mensagem, $http, toaster) {

    $scope.mensagens = [];
    // $scope.textos = [];
    $scope.meuid = '';

    $http.get('/meuid')
      .then(function (res) {

        $scope.meuid = res.data._id;

        Mensagem.get()
        .then(function (res) {
          $scope.mensagens = res.data;
        }).catch(function (err) {
          console.log(err);
        });
      })
      .catch(function (err) {
        console.log(err);
      });


    $scope.isOpen = function (_id) {
      Mensagem.getById(_id)
        .then(function (res) {

          // console.log(res.data);

          for (var i = 0; i < $scope.mensagens.length; i++) {
            if($scope.mensagens[i]._id == _id){
              $scope.mensagens[i].textos = res.data;
              // console.log($scope.mensagens[i]);
            }
          }

          // $scope.textos = res.data;
        }).catch(function (err) {
          console.log(err);
        });
    };

    $scope.isMyMessage = function (_id) {
      // console.log(_id == $scope.meuid);
      return _id == $scope.meuid;
    };

    $scope.responseMessage = function (mensagem) {
      $http.post('/mensagem/resposta/' + mensagem._id, {texto: mensagem.resposta})
        .then(function (res) {

          for (var i = 0; i < $scope.mensagens.length; i++) {
            if($scope.mensagens[i]._id == mensagem._id){
              $scope.mensagens[i].textos = res.data;
              $scope.mensagens[i].resposta = '';
              // console.log($scope.mensagens[i]);
            }
          }

          toaster.pop({
            type:'info',
            title: 'Mensagem',
            body: "Sua mensagem foi enviada com sucesso.",
            showCloseButton: true
          });

        })
        .catch(function (err) {
          console.log(err);
        });
    };

    // $scope.dataAtualFormatada = function (d){
    //   var data = new Date(d);
    //   var dia = data.getDate();
    //   if (dia.toString().length == 1)
    //     dia = "0"+dia;
    //   var mes = data.getMonth()+1;
    //   if (mes.toString().length == 1)
    //     mes = "0"+mes;
    //   var ano = data.getFullYear();
    //   return dia+"/"+mes+"/"+ano+' '+data.getHours() + '.' + data.getMinutes()+'h';
    // }

  };

})();
