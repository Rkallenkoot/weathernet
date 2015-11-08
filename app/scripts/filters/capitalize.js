'use strict';

/**
 * @ngdoc filter
 * @name weathernetApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the weathernetApp.
 */
 angular.module('weathernetApp')
 .filter('capitalize', function () {
  return function(input) {
    if (input!=null){
      input = input.toLowerCase();
      return input.substring(0,1).toUpperCase()+input.substring(1);
    }
  };
});



