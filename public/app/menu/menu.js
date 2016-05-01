(function(){

	function trocarLogo () {
		var largJanela = window.innerWidth;
		if (largJanela < 768) {
			$('.img-logo').attr('src','app/img/casa-marrom-transparencia.png');
		}else {
			$('.img-logo').attr('src','app/img/casa-branca-transparencia.png');
		}
	}

	$('document').ready(function(){

		trocarLogo();

		$(window).resize(function () {

			trocarLogo();
		})
	});
})();