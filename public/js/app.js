angular.module('campushouse', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngFileUpload','ui.bootstrap'])
  .config(function ($routeProvider) {

    // $httpProvider.interceptors.push('TokenInterceptor');

    $routeProvider.when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      access: {
        loginRequerido: false
      }
    });

    $routeProvider.otherwise({redirectTo: '/home'});

    // $locationProvider.html5Mode(true);

  });
