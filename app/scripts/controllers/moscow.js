'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:MoscowCtrl
 * @description
 * # MoscowCtrl
 * Controller of the weathernetApp
 */
 angular.module('weathernetApp')
 .controller('MoscowCtrl', function ($window, $scope, $timeout, $location, uiGmapGoogleMapApi, apiService) {

  $window.componentHandler.upgradeDom();
  $scope.temp = 10;
  $scope.map = {
    center: {
      latitude: 55.7522222,
      longitude: 37.6155556
    },
    zoom: 6,
    options: {
      minZoom: 6,
      maxZoom: 6
    }
  };

  $scope.weerstations = [];
  $scope.moscowData = [];

  $scope.data = [];
  $scope.labels = [];
  $scope.series = [];

  var tmpLabels = [];
  var tmpData = [];

  $scope.options = {
    animationSteps: 10
  };

  $scope.getExport = function(){
    $window.open(apiService.getMoscowTempExport($scope.temp), '__target');
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
    // function used to reduce the amount of data shown on chart
    var mod = 0;
    var len = tmpLabels.length;
    var lbls = [];
    var tmpArr = [];
    if(len > 10){
      mod = (len >> len.toString().length) / 2;

      for(var i = 0; i < len; i++){
        if(i % mod === 0){
          lbls.push(tmpLabels[i]);
          for(var s =0; s < tmpData.length;s++){
            if(typeof tmpArr[s] === 'undefined'){
              tmpArr[s] = [];
            }
            tmpArr[s].push(tmpData[s][i]);
          }
        }
      }
    } else {
      $scope.dataError = 'No data to show with current temperature of ' + $scope.temp + '°C';
      tmpArr = tmpData;
      $timeout(function(){
        $scope.dataError = '';
      },4000);
    }
    $scope.labels = lbls;
    $scope.data = tmpArr;
  };

  $scope.refreshMoscowTemp = function(){
    if($scope.temp == null || $scope.temp.length < 1){
      tmpLabels = [];
      tmpData = [];
      $scope.series = [];
      $scope.updateChartInfo();
      return;
    }
    $scope.loading = true;
    $scope.moscowData = apiService.getMoscowTemp($scope.temp).then(function(data){
      $scope.loading = false;
      if(data.data.series.length === 0){
        tmpLabels = [''];
        tmpData = [0];
      }
      else {
        // heard you like data
        $scope.series = data.data.series;
        tmpLabels = data.data.labels
        tmpData = [];
        for(var key in data.data.data){
          tmpData.push(data.data.data[key]);
        }
    }
    $scope.updateChartInfo();
    }, function(err){
      $scope.loading = false;
      // logout when 401
      console.log(err);
      if(err.status !== -1){
        $location.path('/logout');
      }
      $scope.error = "Request taking too long";
      $timeout(function(){
        $scope.error = '';
      }, 4000);
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
