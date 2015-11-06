'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:PeaktemperaturesCtrl
 * @description
 * # PeaktemperaturesCtrl
 * Controller of the weathernetApp
 */
angular.module('weathernetApp')
  .controller('PeaktemperaturesCtrl', function ($scope, $window, apiService) {

    $scope.chartData = [];
    $scope.labels = [];
    $scope.data = [];

    $scope.options = {
      scaleBeginAtZero : false
    };

    $scope.getExport = function(){
      return apiService.getTop10Export();
    };

    $scope.getPeakTemperatures = function(){
      $scope.chartData = [];
      $scope.data = [];
      $scope.labels = [];
      apiService.getTop10().then(function(data){
        var tmpData = [];
        var tmpLabels = [];
        $scope.chartData = data.data;
        for(var i = 0; i < $scope.chartData.length; i++){
          tmpLabels.push($scope.chartData[i].name);
          tmpData.push($scope.chartData[i].temp);
        }
        $scope.labels = tmpLabels;
        $scope.data.push(tmpData);
      }, function(err){
        console.log("Err: " + err);
      });
    };

    $scope.getPeakTemperatures();

  });
