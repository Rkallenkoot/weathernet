'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:RainfallCtrl
 * @description
 * # RainfallCtrl
 * Controller of the weathernetApp
 */

 angular.module('weathernetApp')
 .controller('RainfallCtrl', function ($scope, $timeout, $window, $compile, uiGmapGoogleMapApi, apiService) {

  $window.componentHandler.upgradeDom();
  $scope.maps = {};

  $scope.data = [];
  $scope.labels = [];
  $scope.series = ['Rainfall in mm'];

  $scope.loading = false;

  $scope.stationInfo = {};

  $scope.weerstations = [];
  $scope.map = {
    center: {
      latitude: 55.7522222,
      longitude: 37.6155556
    },
    zoom: 6,
    control: {}
  };

  $scope.getExport = function(){
    if($scope.stationInfo.stn > 0){
      return $window.open(apiService.getRainfallExport($scope.stationInfo.stn), '__target');
    }
    $scope.error = 'No station selected, please click on a station.';
    $timeout(function(){
      $scope.error = '';
    }, 4000);
  };

  // window information
  var infoWindow = {};

  function initInfoWindow(){
    infoWindow = new google.maps.InfoWindow({
      content: "<div><p>Station Info</p></div>"
    });
  };

  // Marker information
  var icon = -1;
  var previousMarker = -1;
  // lmsu color
  var pinColor = "03963d";
  var pinImage = -1;

  // Markerclick only works when google api is ready
  // you should only be able to click a marker when the map is loaded
  function markerClick(marker, mouseargs){
    infoWindow.close();
    if(pinImage === -1){
      pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    }
    if(icon === -1){
      icon = marker.getIcon();
    }
    if(previousMarker !== -1){
      previousMarker.setIcon(icon);
    }
    // set the previous marker so we know which one to reset;
    previousMarker = marker;
    $scope.getRainfall(marker.key);
    $scope.getStationInfo(marker.key);
    marker.setIcon(pinImage);
    infoWindow.open($scope.map.control.getGMap(), marker);
  };

  this.markerClick = markerClick.bind(this);

  var setInfoWindowContent = function(info){
    var string = '<div><p>Station Info</p><b>'+info.stn+'</b><br>'+info.title+', '+info.country +'<br>Lat:\t'+info.latitude+'<br>Long:\t'+info.longitude+'</div>';
    infoWindow.setContent(string);
  };

  var setInfoWindowLoading = function(){
    var string = 'Loading info';
    infoWindow.setContent(string);
  };

  $scope.getRainfall = function(stn){
    $scope.loading = true;
    apiService.getRainfall(stn).then(function(data){
      $scope.data = [];
      $scope.labels = [];
      var temp = [];
      var mod = 0;
      var len = data.data.length;
      if(len > 10){
        // divide by 2 for extra results except when more than 4 digit number
        mod = (len >> len.toString().length) / 2
        for(var i = 0; i < len; i++){
          if(i % mod === 0){
            temp.push(data.data[i].prcp);
            $scope.labels.push(data.data[i].time);
          }
        }
      }
      $scope.data.push(temp);
      $scope.loading = false;
    }, function(err){
      console.log(err);
      $scope.loading = false;
    });
  };

  $scope.getStationInfo = function(stn){
    $scope.loading = true;
    // unable to use ng-show in infoWindow for the moment
    setInfoWindowLoading();
    apiService.getStation(stn).then(function(data){
      if(data.data.length > 0){
        $scope.stationInfo = data.data[0];
        setInfoWindowContent($scope.stationInfo);
      }
      $scope.loading = false;
    }, function(err){
      console.log(err);
      $scope.loading = false;
    });
  };

  uiGmapGoogleMapApi.then(function(maps){
    initInfoWindow();
    if($scope.weerstations.length === 0){
      apiService.getStations().success(function(data){
        $scope.weerstations = data;
      });
    }
  });


});
