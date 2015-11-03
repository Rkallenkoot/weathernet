'use strict';

/**
 * @ngdoc service
 * @name weathernetApp.SessionService
 * @description
 * # SessionService
 * Factory in the weathernetApp.
 */
 angular.module('SessionService',[])
 .factory('SessionService', function ($window) {
  return {
    get: function(key) {
      return $window.sessionStorage.getItem(key);
    },
    set: function(key, val) {
      return $window.sessionStorage.setItem(key, val);
    },
    unset: function(key) {
      return $window.sessionStorage.removeItem(key);
    }
  };
});
