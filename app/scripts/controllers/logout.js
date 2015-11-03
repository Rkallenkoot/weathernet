'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the weathernetApp
 */
angular.module('weathernetApp')
  .controller('LogoutCtrl', function ($scope, $location, AuthenticationService) {

    $scope.logout = function(){
      AuthenticationService.logout();
    };

    // instantly logout when controller is invoked
    $scope.logout();
    // Redirect to homepage
    $location.path('/');
  });
