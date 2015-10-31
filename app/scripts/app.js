'use strict';

/**
 * @ngdoc overview
 * @name weathernetApp
 * @description
 * # weathernetApp
 *
 * Main module of the application.
 */
angular
  .module('weathernetApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'googlechart'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/moscow', {
        templateUrl: 'views/main.html',
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
      .otherwise({
        redirectTo: '/'
      });
  });
