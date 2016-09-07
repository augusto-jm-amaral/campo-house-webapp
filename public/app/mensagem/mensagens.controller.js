(function () {
  'use strict';

  angular.module('campohouse').controller('MensagensCtrl',MensagensCtrl);

  MensagensCtrl.$inject = ['$scope', 'Mensagem'];

  function MensagensCtrl($scope, Mensagem) {

    $scope.mensagens = [];

    Mensagem.get()
      .then(function (res) {
        $scope.mensagens = res.data;
      }).catch(function (err) {
        console.log(err);
      });

    $scope.dataAtualFormatada = function (d){
      var data = new Date(d);
      var dia = data.getDate();
      if (dia.toString().length == 1)
        dia = "0"+dia;
      var mes = data.getMonth()+1;
      if (mes.toString().length == 1)
        mes = "0"+mes;
      var ano = data.getFullYear();
      return dia+"/"+mes+"/"+ano+' '+data.getHours() + '.' + data.getMinutes()+'h';
    }

  };

})();
