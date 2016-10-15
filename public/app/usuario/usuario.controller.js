(function () {
  'use strict';
  
  angular.module('campohouse').controller('UsuarioCtrl', UsuarioCtrl);

  UsuarioCtrl.$inject = ['Usuario', 'Login', 'toaster'];

  function UsuarioCtrl(Usuario, Login, toaster) {

  	var vm = this;

  	vm.isAtualizar = false;
  	vm.usuario = {};

  	Usuario.get(Login.getUserLogged()._id)
  		.then(function (res) {

  			vm.usuario = res.data;

  		}).catch(function  (err) {
  			console.log(err);
  		});


    vm.alterarDados = function  () {
  		vm.isAtualizar = true;
  		vm.usuario.senha = '';
  		vm.usuario.repetirSenha = '';
    };

    vm.voltar = function  () {
    	vm.isAtualizar = false;
    };

    vm.atualizarDados = function  () {

    	if(vm.formCadastro.$valid || (vm.usuario.repetirSenha === vm.usuario.senha)){

    		Usuario.save(vm.usuario)
    		.then(function  (res) {
    			toaster.pop({
	                type:'success',
	                title: 'Perfil',
	                body: "Sucesso atualizar seus dados",
	                showCloseButton: true
              	});
    			vm.voltar();
    		}).catch(function  (err) {
    			toaster.pop({
	                type:'error',
	                title: 'Perfil',
	                body: "Ocorreu ao atualizar seus dados",
	                showCloseButton: true
              	});
    		});

    	}else{
    		// if(vm.usuario.repetirSenha === vm.usuario.senha){
    		// 	toaster.pop({
	     //            type:'error',
	     //            title: 'Perfil',
	     //            body: "Senha não confirmada",
	     //            showCloseButton: true
      //         	});
    		// }

    		// console.log(vm.formCadastro);
    	}
    };




  };

})();