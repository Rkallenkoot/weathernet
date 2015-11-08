'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the weathernetApp
 */
 angular.module('weathernetApp')
 .controller('LoginCtrl', function ($window, $timeout, $scope, $location, AuthenticationService, SessionService) {

  $window.componentHandler.upgradeDom();
  $scope.loading = false;
  $scope.credentials = {
    email: '',
    password: ''
  };

  $scope.setName = function(){
    if(SessionService.get('user') !== null && SessionService.get('user').length > 0){
      $scope.firstname = JSON.parse(SessionService.get('user'))[0].first_name;
      $scope.lastname = JSON.parse(SessionService.get('user'))[0].last_name;
    }
  };

  $scope.login = function (){
    $scope.loading = true;
    AuthenticationService.login($scope.credentials)
    .success(function(){
      $scope.loading = false;
      $location.path('/moscow');
      console.log('Authentication successful');
    })
    .error(function(){
      $scope.loading = false;
      $scope.error = "Error Authenticating";
      $timeout(function(){
        $scope.error = '';
      }, 5000);
      console.log('Error Authenticating');
    });
  };

  $scope.loggedIn = function(){
    $scope.setName();
    return AuthenticationService.isLoggedIn();
  };

  if(AuthenticationService.isLoggedIn()){
    $scope.setName();
  }

});
