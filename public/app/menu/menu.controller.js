(function () {
  'use strict';

  angular.module('campohouse').controller('MenuCtrl', MenuCtrl);

  MenuCtrl.$inject = ['$scope', '$location', '$window', 'Login', 'Usuario', 'toaster'];

  function MenuCtrl($scope, $location, $window, Login, Usuario, toaster) {

    $scope.showEntrarOuCriarConta = false;
    $scope.showOpcoes = false;

    $scope.nomeUsuario = '';
    $scope._id = 0;

    $scope.emailLogin = '';
    $scope.senhaLogin = '';
    $scope.runLogin = false;
    $scope.loginOuSenhaInvalidos = false;

    $scope.nomeCadastro = '';
    $scope.sobreNomeCadastro = '';
    $scope.emailCadastro = '';
    $scope.telefoneCadastro = '';
    $scope.senhaCadastro = '';
    $scope.repetirSenhaCadastro = '';
    $scope.runCadastro = false;
    $scope.erroCadastro = false;
    $scope.sucessoCadastro = false;

    function isLogin() {

      if(Login.islogin()){
        $scope.showEntrarOuCriarConta = false;
        $scope.showOpcoes = true;

        $scope.nomeUsuario = $window.sessionStorage.nome;
        $scope._id = $window.sessionStorage._id;

      }else{
        $scope.showEntrarOuCriarConta = true;
        $scope.showOpcoes = false;
      }
    };
    isLogin();

    $('.menuUsuario').removeClass('hidden');

    $scope.anunciar = function () {

      if(Login.islogin()){
        $location.path('/cadastroanuncio');
      }else{
        $('#modalCadLogin').modal('show');
      }
    };

    $scope.login = function () {

      $scope.runLogin = true;
      $scope.loginOuSenhaInvalidos = false;

      if($scope.loginForm.$valid){
        //logar usuario
        $scope.runLogin = false;

        Login.login($scope.emailLogin,$scope.senhaLogin)
        .then(function (res) {

          $scope.loginForm.emailLogin.$touched = false;
          $scope.loginForm.senhaLogin.$touched = false;

          $('#modalCadLogin').modal('hide');

          toaster.pop({
            type:'success',
            title: 'Login',
            body: "Login realizado com sucesso.",
            showCloseButton: true
          });

          $scope.emailLogin = '';
          $scope.senhaLogin = '';

          $window.sessionStorage.token = res.data.token;
          $window.sessionStorage.nome = res.data.nome;
          $window.sessionStorage._id = res.data._id;

          isLogin();

        }).catch(function (err) {
          toaster.pop({
            type:'info',
            title: 'Login',
            body: "Login ou senha incorretos. Tente novamente",
            showCloseButton: true
          });
          // $scope.loginOuSenhaInvalidos = true;
        });

      }
    };

    $scope.logout = function () {
      Login.logout();
      toaster.pop({
        type:'success',
        title: 'Logout',
        body: "Logout realizado com sucesso.",
        showCloseButton: true
      });
      isLogin();
    };

    $scope.cadastro = function () {

      $scope.runCadastro = true;

      if($scope.formCadastrousuario.$valid){
        $scope.erroCadastro = false;
        $scope.runCadastro = false;

        Usuario.save({
          nome: $scope.nomeCadastro,
          sobreNome: $scope.sobreNomeCadastro,
          email: $scope.emailCadastro,
          telefone: $scope.telefoneCadastro,
          senha: $scope.senhaCadastro
        }).then(function (res) {

          $('#modalCadLogin').modal('hide');

          $scope.formCadastrousuario.nomeCadastro.$touched = false;
          $scope.formCadastrousuario.sobreNomeCadastro.$touched = false;
          $scope.formCadastrousuario.emailCadastro.$touched = false;
          $scope.formCadastrousuario.telefoneCadastro.$touched = false;
          $scope.formCadastrousuario.senhaCadastro.$touched = false;
          $scope.formCadastrousuario.repetirSenhaCadastro.$touched = false;

          toaster.pop({
            type:'success',
            title: 'Cadastro',
            body: "Cadastro realizado com sucesso.",
            showCloseButton: true
          });

          $scope.nomeCadastro = '';
          $scope.sobreNomeCadastro = '';
          $scope.emailCadastro = '';
          $scope.telefoneCadastro = '';
          $scope.senhaCadastro = '';
          $scope.repetirSenhaCadastro = '';

          // $scope.sucessoCadastro = true;

        }).catch(function (err) {
          $scope.erroCadastro = true;
        });
      }

    };

  };

})();
