(function () {
  'use strict';

  angular.module('campohouse')
    .config(config)
    .run(run);

    function run($rootScope, $location) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute, Login) {

          if (nextRoute.access && nextRoute.access.loginRequerido) {
            if(!Login.islogin()){
                //tratar quando não estiver logado
            }
          }

        });
    };

    function config($routeProvider) {

      // $httpProvider.interceptors.push('TokenInterceptor');

      $routeProvider.when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/cadastrousuario', {
        templateUrl: 'app/usuario/cadastrousuario.html',
        controller: 'CadastroUsuarioCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/buscaranuncio', {
        templateUrl: 'app/anuncio/buscaranuncio.html',
        controller: 'BuscarAnuncioCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/anuncio/:_id', {
        templateUrl: 'app/anuncio/anuncio.html',
        controller: 'AnuncioCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/cadastroanuncio', {
        templateUrl: 'app/anuncio/cadastroanuncio.html',
        controller: 'CadastroAnuncioCtrl',
        access: {
          loginRequerido: true
        }
      })
      ;

      $routeProvider.otherwise({redirectTo: '/home'});

      // $locationProvider.html5Mode(true);

    };

})();
