(function(){

	function trocarLogo () {
		var largJanela = window.innerWidth;
		if (largJanela < 768) {
			/*$('.img-logo').attr('src','app/img/casa-marrom-transparencia.png');*/
			$('.img-logo').attr('src','app/img/logoverde.png');
		}else {
			/*$('.img-logo').attr('src','app/img/casa-marrom-transparencia.png');*/
			$('.img-logo').attr('src','app/img/logobranca-casa.png');
		}
	}

	$('document').ready(function(){

		trocarLogo();

		$(window).resize(function () {

			trocarLogo();
		})
	});
})();