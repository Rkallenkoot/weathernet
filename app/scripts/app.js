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
    'AuthenticationService'
  ]);


weathernetApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/moscow', {
        templateUrl: 'views/moscow.html',
        controller: 'MoscowCtrl',
        controllerAs: 'moscow'
      })
      .when('/peakTemperatures', {
      	templateUrl: 'views/peaktemperatures.html',
      	controller: 'PeaktemperaturesCtrl',
      	controllerAs: 'peakTemperatures'
      })
      .when('/rainfall', {
      	templateUrl: 'views/rainfall.html',
      	controller: 'RainfallCtrl',
      	controllerAs: 'rainfall'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
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


weathernetApp.run(function($rootScope, $location, AuthenticationService) {
  $rootScope.$on('$routeChangeStart', function(){
    if(!AuthenticationService.isLoggedIn()){
      $location.path('/login');
    }
  });
});
