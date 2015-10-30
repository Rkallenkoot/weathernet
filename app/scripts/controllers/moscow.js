'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:MoscowCtrl
 * @description
 * # MoscowCtrl
 * Controller of the weathernetApp
 */
 angular.module('weathernetApp')
 .controller('MoscowCtrl', function ($scope, uiGmapGoogleMapApi) {
  $scope.map = {
    center: {
      latitude: 55.7522222,
      longitude: 37.6155556
    },
    zoom: 6
  };

  $scope.weerstations = [
  {"stn":"10010","name":"JAN MAYEN","country":"JAN MAYEN","latitude":"70.933","longitude":"-8.667","elevation":"9"},{"stn":"10015","name":"BRINGELAND","country":"NORWAY","latitude":"61.383","longitude":"5.867","elevation":"327"},{"stn":"10030","name":"HORNSUND","country":"SVALBARD","latitude":"77","longitude":"15.5","elevation":"12"},{"stn":"10080","name":"SVALBARD LUFTHAVN","country":"SVALBARD","latitude":"78.25","longitude":"15.467","elevation":"29"}];

$scope.models = [];
$scope.circle = {
                id: 1,
                center: {
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

uiGmapGoogleMapApi.then(function(maps){
  console.log('google maps is ready');
});
});
