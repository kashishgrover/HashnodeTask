angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    // home page
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'NerdController'
    })

  // // nerds page that will use the NerdController
  // .when('/nerds', {
  //   templateUrl: 'views/nerd.html',
  //   controller: 'NerdController'
  // })
  //
  // // register page that will use the RegistrationController
  // .when('/register', {
  //   templateUrl: 'views/register.html',
  //   controller: 'RegController'
  // })
  //
  // // login page that will use the LoginController
  // .when('/login', {
  //   templateUrl: 'views/login.html',
  //   controller: 'NerdController'
  // });

  $locationProvider.html5Mode(true);

}]);
