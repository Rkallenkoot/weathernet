'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:MoscowCtrl
 * @description
 * # MoscowCtrl
 * Controller of the weathernetApp
 */
 angular.module('weathernetApp')
 .controller('MoscowCtrl', function ($window, $scope, $location, uiGmapGoogleMapApi, apiService) {

  $window.componentHandler.upgradeDom();
  $scope.temp = 10;
  $scope.map = {
    center: {
      latitude: 55.7522222,
      longitude: 37.6155556
    },
    zoom: 6
  };

  $scope.weerstations = [];
  $scope.moscowData = [];

  $scope.data = [];
  $scope.labels = [];
  $scope.series = [];

  $scope.options = {
      labelsFilter: function(label){
        console.log('swag: ' + label);
        return label % 5 !== 0;
    }
  };

  $scope.getExport = function(){
    return apiService.getMoscowTempExport($scope.temp);
  };

  $scope.circle = {
    id: 1,
    center: {
      // Moscow weatherstations
      // TODO?: Change to centre of Moscow
      latitude: 55.751244,
      longitude: 37.618423
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

  $scope.updateChartInfo = function(){
    console.log("Updating chart");
    var bami = [];
    var arr = [];
    $scope.labels = [];

    for(var i = 0; i < $scope.moscowData.length; i++){
      // als de key nog niet bestaat, maken we nieuwe array aan
      if(typeof bami[$scope.moscowData[i].stn] === 'undefined') {
        bami[$scope.moscowData[i].stn] = [];
      }
      bami[$scope.moscowData[i].stn].push($scope.moscowData[i].temp);
      if(!$scope.labels.indexOf($scope.moscowData[i].date + '_' + $scope.moscowData[i].time) > -1){
        console.log('asd');
        $scope.labels.push($scope.moscowData[i].date + '_' + $scope.moscowData[i].time);
      }
    }

    $scope.data = [];
    $scope.series = [];
    for(var k in bami){
      $scope.series.push(k);
      var tmp = bami[k];
      var tmpData = [];
      for(var a = 0; a < tmp.length; a++){
        tmpData.push(tmp[a]);
      }
      $scope.data.push(tmpData);
    }
    console.log($scope.data);
  };

  $scope.refreshMoscowTemp = function(){
    if($scope.temp == null || $scope.temp.length < 1){
      $scope.moscowData = [];
      return;
    }
    $scope.moscowData = apiService.getMoscowTemp($scope.temp).then(function(data){
      $scope.moscowData = data.data;
      $scope.updateChartInfo();
    }, function(err){
      // logout when 401
      $location.path('/logout');
    });
    console.log('refreshed moscow temp');
  };
  $scope.refreshMoscowTemp();


  uiGmapGoogleMapApi.then(function(){
    if($scope.weerstations.length === 0){
      apiService.getMoscowStations().success(function(data){
        $scope.weerstations = data;
      })
      .error(function(){
        $location.path('logout');
      });
    }
  });
});
