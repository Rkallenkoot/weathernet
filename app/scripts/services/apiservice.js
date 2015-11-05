'use strict';

/**
 * @ngdoc service
 * @name weathernetApp.apiService
 * @description
 * # apiService
 * Factory in the weathernetApp.
 */
angular.module('weathernetApp')
  .factory('apiService', function ($sanitize, $http) {

    // Public API here
    return {
      getStations: function(){
        return $http.get('http://localhost:8000/station/all');
      },

      getStation: function(stn){
        return $http.get('http://localhost:8000/station/' + $sanitize(stn));
      },

      getMoscowStations: function(){
        var moscow = $http.get('http://localhost:8000/moscow/all');
        return moscow;
      },

      getMoscowTemp: function(temp) {
        var moscowTemp = $http.get('http://localhost:8000/moscow/temp/' + $sanitize(temp));
        return moscowTemp;
      },

      getTop10: function(){
        var top10 = $http.get('http://localhost:8000/top10');
        return top10;
      },

      getRainfall: function(stn){
        var rainfall = $http.get('http://localhost:8000/rainfall/' + $sanitize(stn));
        return rainfall;
      }

    };
  });
