'use strict';

/**
 * @ngdoc service
 * @name weathernetApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Factory in the weathernetApp.
 */
angular.module('AuthenticationService', ['SessionService'])
  .factory('AuthenticationService', function($http, $sanitize, SessionService) {

  var cacheSession = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
    };
  };

  return {
    login: function(credentials) {
      var login = $http.post('http://localhost:8000/login', sanitizeCredentials(credentials));
      login.success(cacheSession);
      return login;
    },
    logout: function() {
      var logout = $http.get('http://localhost:8000/logout');
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
  });
