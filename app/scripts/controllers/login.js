'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the weathernetApp
 */
 angular.module('weathernetApp')
 .controller('LoginCtrl', function ($window, $scope, $location, AuthenticationService, SessionService) {

  $window.componentHandler.upgradeDom();

  $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.setFirstName = function(){
    $scope.firstname = JSON.parse(SessionService.get('user'))[0].first_name;
    $scope.lastname = JSON.parse(SessionService.get('user'))[0].last_name;
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

  $scope.loggedIn = function(){
    return AuthenticationService.isLoggedIn();
  };

  if(AuthenticationService.isLoggedIn()){
    $scope.setFirstName();
  }

});
