'use strict';

/**
 * @ngdoc service
 * @name weathernetApp.apiService
 * @description
 * # apiService
 * Factory in the weathernetApp.
 */
angular.module('weathernetApp')
  .factory('apiService', function ($sanitize, $window, $http) {

    // Public API here
    return {
      getStations: function(){
        return $http.get('http://api.unwdmi.nl:82/station/all');
      },

      getStation: function(stn){
        return $http.get('http://api.unwdmi.nl:82/station/' + $sanitize(stn));
      },

      getMoscowStations: function(){
        var moscow = $http.get('http://api.unwdmi.nl:82/moscow/all');
        return moscow;
      },

      getMoscowTemp: function(temp) {
        var conf = {
          timeout: 15000
        };
        var moscowTemp = $http.get('http://api.unwdmi.nl:82/moscow/temp/' + $sanitize(temp), conf);
        return moscowTemp;
      },

      getMoscowTempExport: function(temp){
        return 'http://api.unwdmi.nl:82/moscow/temp/' + $sanitize(temp) + '?export=true';
      },

      getTop10: function(){
        var top10 = $http.get('http://api.unwdmi.nl:82/top10');
        return top10;
      },

      getRainfall: function(stn){
        var rainfall = $http.get('http://api.unwdmi.nl:82/rainfall/' + $sanitize(stn));
        return rainfall;
      },

      getRainfallExport: function(stn){
        return 'http://api.unwdmi.nl:82/rainfall/' + $sanitize(stn)+'?export=true';
      },

      getTop10Export: function(){
        var exportQuery = 'http://api.unwdmi.nl:82/top10?export=true';
        return exportQuery;
      }


    };
  });
