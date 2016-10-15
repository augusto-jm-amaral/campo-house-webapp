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

    $scope.dataAtualFormatada = function (d){

      // console.log(d);

      var data = new Date(d);

      console.log(data);

      // var dataMensagem = data.getTime();
      // var dataAgora = new Date().getTime();

      // var data = new Date(dataAgora - dataMensagem);

      var dataInicio = new Date(d);
      var dataFim = new Date();

      var diffMilissegundos = dataFim - dataInicio;

      var diffMeses = diffMilissegundos / (30 * 86400000);
      if(Math.trunc(diffMeses))
      var diffMilissegundos = diffMilissegundos - (diffMeses * (30 * 86400000));

      var diffDias = diffMilissegundos / 86400000;
      if(Math.trunc(diffDias))
        var diffMilissegundos = diffMilissegundos - (diffDias * 86400000);

      var diffHoras = diffMilissegundos / (60000 * 60);
      if(Math.trunc(diffHoras))
        var diffMilissegundos = diffMilissegundos - (diffHoras * (60000 * 60));

      var diffMinutos = diffMilissegundos / 60000;
      if(Math.trunc(diffMinutos))
      var diffMilissegundos = diffMilissegundos - (diffMinutos * 60000);

      // var rAno = ano ? ano + ' ano(s)' : '';
      var rMes = Math.trunc(diffMeses) ? Math.trunc(diffMeses) + ' mes(es) ' : '' ;
      var rDia = Math.trunc(diffDias) ? Math.trunc(diffDias) + ' dia(s) ' : '';
      var rhora = Math.trunc(diffHoras) ? Math.trunc(diffHoras) + ' hora(s) ' : '';
      var rMin = Math.trunc(diffMinutos) ? Math.trunc(diffMinutos) + ' minuto(s) ' : '';
      //
      console.log(diffHoras);

      if(!(rMes ||  rDia || rhora || rMin))
        rMin = 0 + ' minuto(s)';

      return rMes + rDia + rhora + rMin;

      // return '';
    };

  };

})();
