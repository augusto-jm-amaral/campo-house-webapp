(function () {

  angular.module('campohouse').controller('CadastroAnuncioCtrl', CadastroAnuncioCtrl);

  function CadastroAnuncioCtrl($scope, $location) {

  	$scope.eventsWizard = function() {

      $('#btnGravarGeral').on('click', function(){
        $("#tabs-anuncio a[aria-controls='localizacao']").tab('show');
      });


      $('#btnGravarLocal').on('click', function(){
        $("#tabs-anuncio a[aria-controls='espaco']").tab('show');
      });

      $('#btnVoltarLocal').on('click', function(){
        $("#tabs-anuncio a[aria-controls='geral']").tab('show');
      });


      $('#btnGravarEspaco').on('click', function(){
        $("#tabs-anuncio a[aria-controls='comodidade']").tab('show');
      });

      $('#btnVoltarEspaco').on('click', function(){
        $("#tabs-anuncio a[aria-controls='localizacao']").tab('show');
      });


      $('#btnGravarComodidade').on('click', function(){
        $("#tabs-anuncio a[aria-controls='ofertavalor']").tab('show');
      });

      $('#btnVoltarComodidade').on('click', function(){
        $("#tabs-anuncio a[aria-controls='espaco']").tab('show');
      });


      $('#btnGravarOfertaValor').on('click', function(){
        $("#tabs-anuncio a[aria-controls='preco']").tab('show');
      });

      $('#btnVoltarOfertaValor').on('click', function(){
        $("#tabs-anuncio a[aria-controls='comodidade']").tab('show');
      });


      $('#btnGravarPreco').on('click', function(){
        $("#tabs-anuncio a[aria-controls='fotos']").tab('show');
      });

      $('#btnVoltarPreco').on('click', function(){
        $("#tabs-anuncio a[aria-controls='ofertavalor']").tab('show');
      });


      $('#btnVoltarFotos').on('click', function(){
        $("#tabs-anuncio a[aria-controls='preco']").tab('show');
      });

  	};

  	$scope.eventsWizard();

  };

})();