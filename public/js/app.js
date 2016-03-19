angular.module('campushouse', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngFileUpload','ui.bootstrap'])
  .config(function ($routeProvider) {

    // $httpProvider.interceptors.push('TokenInterceptor');

    $routeProvider.when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/cadastrousuario', {
        templateUrl: 'partials/cadastrousuario.html',
        controller: 'CadastroUsuarioCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/buscaranuncio', {
        templateUrl: 'partials/buscaranuncio.html',
        controller: 'BuscarAnuncioCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/anuncio/:_id', {
        templateUrl: 'partials/anuncio.html',
        controller: 'AnuncioCtrl',
        access: {
          loginRequerido: false
        }
      })
      .when('/cadastroanuncio', {
          templateUrl: 'partials/cadastroanuncio.html',
          controller: 'CadastroAnuncioCtrl',
          access: {
            loginRequerido: true
          }
      })
      ;

    $routeProvider.otherwise({redirectTo: '/home'});

    // $locationProvider.html5Mode(true);

  });
