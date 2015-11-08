'use strict';

/**
 * @ngdoc overview
 * @name weathernetApp
 * @description
 * # weathernetApp
 *
 * Main module of the application.
 */
 var weathernetApp = angular
 .module('weathernetApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'uiGmapgoogle-maps',
  'SessionService',
  'AuthenticationService',
  'chart.js'
  ]);


 weathernetApp.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
})
  .when('/moscow', {
    templateUrl: 'views/moscow.html'
  })
  .when('/peakTemperatures', {
   templateUrl: 'views/peaktemperatures.html'
 })
  .when('/rainfall', {
   templateUrl: 'views/rainfall.html'
 })
  .when('/login', {
    templateUrl: 'views/login.html'
  })
  .when('/logout', {
    // Do we need a logout view?
    templateUrl: 'views/logout.html',
    controller: 'LogoutCtrl',
    controllerAs: 'logout'
  })
  .otherwise({
    redirectTo: '/'
  });
});

 weathernetApp.config(
   ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProvider){
    GoogleMapApiProvider.configure({
     key: 'AIzaSyCUqUI7UekwprMCzWGvXuB3FznXNqTfLKk'
   });
  }]);

 weathernetApp.config(
  ['$httpProvider', function($httpProvider){
    $httpProvider.defaults.withCredentials = true;
  }]);

 weathernetApp.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252', '#FF8A80']
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
  }]);


 weathernetApp.run(function($rootScope, $location, AuthenticationService) {
  $rootScope.$on('$routeChangeStart', function(){
    if(!AuthenticationService.isLoggedIn()){
      $location.path('/login');
    }
  });
});
