(function () {

  angular.module('campohouse').controller('CadastroAnuncioCtrl', CadastroAnuncioCtrl);

  function CadastroAnuncioCtrl($scope, $location) {

  	$scope.eventsWizard = function() {
  		$("#tabs-anuncio a[aria-controls='geral']").on('click', function(){
  			$("#geral").tab("show");
  		});
  		$("#tabs-anuncio a[aria-controls='localizacao']").on('click', function(){
  			$("#localizacao").tab("show");
  		});
  		$("#tabs-anuncio a[aria-controls='espaco']").on('click', function(){
  			$("#espaco").tab("show");
  		});
  		$("#tabs-anuncio a[aria-controls='comodidade']").on('click', function(){
  			$("#comodidade").tab("show");
  		});
  		$("#tabs-anuncio a[aria-controls='ofertavalor']").on('click', function(){
  			$("#ofertavalor").tab("show");
  		});
  		$("#tabs-anuncio a[aria-controls='preco']").on('click', function(){
  			$("#preco").tab("show");
  		});
  		$("#tabs-anuncio a[aria-controls='fotos']").on('click', function(){
  			$("#fotos").tab("show");
  		});
  	};

  	$scope.eventsWizard();

  };

})();