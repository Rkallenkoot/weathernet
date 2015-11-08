'use strict';

/**
 * @ngdoc service
 * @name weathernetApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Factory in the weathernetApp.
 */
angular.module('AuthenticationService', ['SessionService'])
  .factory('AuthenticationService', function($window, $http, $sanitize, SessionService) {

    $window.componentHandler.upgradeDom();
  var cacheSession = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
    SessionService.unset('user');
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
    };
  };

  var cacheUserInfo = function(info){
    SessionService.set('user', info);
  };

  return {
    login: function(credentials) {
      var login = $http.post('http://api.unwdmi.nl:82/login', sanitizeCredentials(credentials));
      login.success(function(data){
        cacheUserInfo(data.data);
        cacheSession();
      });
      return login;
    },
    logout: function() {
      var logout = $http.get('http://api.unwdmi.nl:82/logout');
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    },
    getUserInfo: function(){
      return SessionService.get('user');
    }
  };
  });
