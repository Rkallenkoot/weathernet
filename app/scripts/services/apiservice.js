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
    var stations = [];
    // Public API here
    return {
      getStations: function(){
        if(stations.length > 0){
          return stations;
        } else {
          $http.get('http://localhost:8000/station/all')
          .success(function(data){
            stations = data;
            return stations;
          });
          return stations;
        }
      },

      getMoscowStations: function(){
        var moscow = $http.get('http://localhost:8000/moscow/all');
        return moscow;
      },

      getMoscowTemp: function() {
        var moscowTemp = $http.get('http://localhost:8000/moscow/temp');
        return moscowTemp;
      }

    };
  });