'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:MoscowCtrl
 * @description
 * # MoscowCtrl
 * Controller of the weathernetApp
 */
 angular.module('weathernetApp')
 .controller('MoscowCtrl', function ($scope, uiGmapGoogleMapApi, apiService) {
  $scope.map = {
    center: {
      latitude: 55.7522222,
      longitude: 37.6155556
    },
    zoom: 6
  };
  $scope.weerstations = [];

  $scope.circle = {
    id: 1,
    center: {
      // Moscow weatherstations
      // TODO?: Change to centre of Moscow
      latitude: 55.7522222,
      longitude: 37.6155556
    },
    radius: 200000,
    stroke: {
      color: '#08B21F',
      weight: 2,
      opacity: 1
    },
    fill: {
      color: '#08B21F',
      opacity: 0.4
    },
  };
  /*
   * Wordt gebruikt voor de marker Windows
   */
  $scope.windowOptions = {
    visible: false
  };
  $scope.closeClick = function(){
    $scope.windowOptions.visible = false;
  };
  $scope.onClick = function(){
    $scope.windowOptions.visible = true;
  };

  uiGmapGoogleMapApi.then(function(){
    if($scope.weerstations.length === 0){
      apiService.getMoscowStations().success(function(data){
        $scope.weerstations = data;
      });
    }
  });
});
