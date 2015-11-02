'use strict';

/**
 * @ngdoc service
 * @name weathernetApp.apiService
 * @description
 * # apiService
 * Factory in the weathernetApp.
 */
angular.module('weathernetApp')
  .factory('apiService', function ($http) {
    // Service logic
    // ...
    var stations = [];

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },

      getStations: function(){
        if(stations.length > 0){
          return stations;
        } else {
          $http.get('http://localhost:8000/station/all')
          .success(function(data){
            stations = data;
          });
          return stations;
        }
      }
    };
  });
