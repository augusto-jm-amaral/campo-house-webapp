

// Quando carregado a página
$(function($) {
	
	// Iniciando biblioteca
	var resize = new window.resize();
	resize.init();

	// Declarando variáveis
	var imagens;
	var imagem_atual;

	// Quando selecionado as imagens
	$('#imagem').on('change', function() {
		enviar();
	});

	/*
	 * Envia os arquivos selecionados
	 */
	function enviar() {
		// Verificando se o navegador tem suporte aos recursos para
		// redimensionamento
		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
			alert('O navegador não suporta os recursos utilizados pelo aplicativo');
			return;
		}

		// Alocando imagens selecionadas
		imagens = $('#imagem')[0].files;

		// Se selecionado pelo menos uma imagem
		if (imagens.length > 0) {
			// Definindo progresso de carregamento
			$('#progresso').attr('aria-valuenow', 0).css('width', '0%');

			// Escondendo campo de imagem
			$('#imagem').hide();

			// Iniciando redimensionamento
			imagem_atual = 0;
			redimensionar();
		}
	}

	/*
	 * Redimensiona uma imagem e passa para a próxima recursivamente
	 */
	function redimensionar() {
		// Se redimensionado todas as imagens
		if (imagem_atual > imagens.length) {
			// Definindo progresso de finalizado
			$('#progresso').html('Imagen(s) enviada(s) com sucesso');

			// Limpando imagens
			limpar();

			// Exibindo campo de imagem
			$('#imagem').show();

			// Finalizando
			return;
		}

		// Se não for um arquivo válido
		if ((typeof imagens[imagem_atual] !== 'object')
				|| (imagens[imagem_atual] == null)) {
			// Passa para a próxima imagem
			imagem_atual++;
			redimensionar();
			return;
		}

		// Redimensionando
		resize.photo(imagens[imagem_atual], 800, 'dataURL', function(imagem) {
			
			console.log(imagem);
			
			$('#container-img').append(
				$('<img/>',{'src':imagem})
			);

			// Salvando imagem no servidor
			/*$.post('ajax/salvar.php', {
				imagem : imagem
			}, function() {

				// Definindo porcentagem
				var porcentagem = (imagem_atual + 1) / imagens.length * 100;

				// Atualizando barra de progresso
				$('#progresso').text(Math.round(porcentagem) + '%').attr(
						'aria-valuenow', porcentagem).css('width',
						porcentagem + '%');

				// Aplica delay de 1 segundo
				// Apenas para evitar sobrecarga de requisições
				// e ficar visualmente melhor o progresso
				setTimeout(function() {
					// Passa para a próxima imagem
					imagem_atual++;
					redimensionar();
				}, 1000);

			});*/

		});
	}

	/*
	 * Limpa os arquivos selecionados
	 */
	function limpar() {
		var input = $("#imagem");
		input.replaceWith(input.val('').clone(true));
	}

});
