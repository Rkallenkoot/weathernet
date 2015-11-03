'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the weathernetApp
 */
 angular.module('weathernetApp')
 .controller('LoginCtrl', function ($window, $scope, $location, AuthenticationService) {

  $window.componentHandler.upgradeDom();

  $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.login = function (){
    AuthenticationService.login($scope.credentials)
    .success(function(){
      $location.path('/moscow');
      console.log('Authentication successful');
    })
    .error(function(){
      console.log('Error Authenticating');
    });
  };

});
