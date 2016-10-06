(function() {
    'use strict';

    angular.module('campohouse').controller('EntrarCtrl', EntrarCtrl);

    EntrarCtrl.$inject = ['$scope', '$rootScope', '$location', '$http', 'Config', 'Usuario', 'toaster', 'Login', '$window'];

    function EntrarCtrl($scope, $rootScope, $location, $http, Config, Usuario, toaster, Login, $window) {

        $scope.cadastro = {};
        $scope.login = {};
        $scope.autologin = false;

        $scope.aceite = false;

        // $scope.planos = [{
        //     value: 1,
        //     label: 'Mensal'
        // }, {
        //     value: 2,
        //     label: 'Semestral'
        // }, {
        //     value: 3,
        //     label: 'Anual'
        // }];

        // $scope.cadastro.plano = $scope.planos[0].value;

        $scope.cadastrar = function() {

            if ($scope.formCadastro.$valid && $scope.aceite && ($scope.cadastro.senhaCadastro === $scope.cadastro.repetirSenhaCadastro)) {

                Usuario.save({
                    nome: $scope.cadastro.nomeCadastro,
                    plano: $scope.cadastro.plano,
                    email: $scope.cadastro.emailCadastro,
                    telefone: $scope.cadastro.telefoneCadastro,
                    senha: $scope.cadastro.senhaCadastro
                }).then(function(res) {

                    $scope.formCadastro.nome.$touched = false;
                    $scope.formCadastro.email.$touched = false;
                    $scope.formCadastro.telefone.$touched = false;
                    $scope.formCadastro.senhaCadastro.$touched = false;
                    $scope.formCadastro.repetirSenhaCadastro.$touched = false;

                    toaster.pop({
                        type: 'success',
                        title: 'Cadastro',
                        body: "Cadastro realizado com sucesso",
                        showCloseButton: true
                    });

                    $scope.login = {
                        emailLogin: $scope.cadastro.emailCadastro,
                        senhaLogin: $scope.cadastro.senhaCadastro
                    }

                    $scope.cadastro = {};
                    // $scope.cadastro.plano = $scope.planos[0].value;

                    $scope.autologin = true;

                    $scope.logar();

                }).catch(function(err) {
                    if (err.status == 412) {
                        toaster.pop({
                            type: 'info',
                            title: 'Cadastro',
                            body: "Este e-mail já está sendo utilizado",
                            showCloseButton: true
                        });
                    }
                });
            }else{

              if(!$scope.formCadastro.$valid){

                toaster.pop({
                  type: 'info',
                  title: 'Cadastro',
                  body: "Faltam alguns campos",
                  showCloseButton: true
                });

              }else if($scope.cadastro.senhaCadastro != $scope.cadastro.repetirSenhaCadastro){

                toaster.pop({
                  type: 'info',
                  title: 'Cadastro',
                  body: "Falta confirmar sua senha",
                  showCloseButton: true
                });

              }else{

                toaster.pop({
                  type: 'info',
                  title: 'Cadastro',
                  body: "Falta aceitar os termos de uso",
                  showCloseButton: true
                });

              }
            }
        };

        $scope.logar = function() {

            if ($scope.loginForm.$valid || $scope.autologin) {


                Login.login($scope.login.emailLogin, $scope.login.senhaLogin)
                    .then(function(res) {

                        $scope.loginForm.emailLogin.$touched = false;
                        $scope.loginForm.senhaLogin.$touched = false;

                        $scope.login = {};

                        $rootScope.nome = res.data.nome;

                        $window.sessionStorage.token = res.data.token;
                        $window.sessionStorage.nome = res.data.nome;
                        $window.sessionStorage._id = res.data._id;

                        $location.path('/home');

                    }).catch(function(err) {
                        toaster.pop({
                            type: 'info',
                            title: 'Login',
                            body: "E-mail ou senha incorretos. Tente novamente",
                            showCloseButton: true
                        });
                    });

            }
        };

    }
})();
