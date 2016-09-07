(function () {
  'use strict';

  angular
    .module('campohouse')
    .factory('Login', Login);

  Login.$inject = ['$http', '$window', 'Config'];

  function Login($http, $window, Config) {

      var url = Config.getUrlApi() + '/login';

      var service = {
        login: login,
        logout: logout,
        islogin: islogin
      };

     return service;

     ///////////////

     function login(email, senha) {
       return $http.post(url, {email: email, senha: senha});
     };

     function logout(){
       if($window.sessionStorage.token)
         delete $window.sessionStorage.token;
         if($window.sessionStorage.nome)
         delete $window.sessionStorage.nome;
         if($window.sessionStorage.senha)
         delete $window.sessionStorage.senha;
     };

     function islogin(){
      //  console.log(1);
       if($window.sessionStorage.token){
         return true;
       }else{
         return false;
       }
     };

  };

})();
