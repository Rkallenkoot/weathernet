'use strict';

/**
 * @ngdoc function
 * @name weathernetApp.controller:RainfallCtrl
 * @description
 * # RainfallCtrl
 * Controller of the weathernetApp
 */

 angular.module('weathernetApp')
 .controller('RainfallCtrl', function ($scope) {
 	$scope.title = 'dikke pik!';
 	$scope.chartObject = {
 		'type': 'LineChart',
 		'displayed': true,
 		'data': {
 			'cols': [
 			{
 				'id': 'month',
 				'label': 'Month',
 				'type': 'string',
 				'p': {}
 			},

 			{
 				'id': 'desktop-id',
 				'label': 'Rainfall (mm)',
 				'type': 'number',
 				'p': {}
 			}
 			],
 			'rows': [
 			{
 				'c': [
 				{
 					'v': 'January'
 				},
 				{
 					'v': 19
 				}
 				]
 			},
 			{
 				'c': [
 				{
 					'v': 'February'
 				},
 				{
 					'v': 13
 				}
 				]
 			},
 			{
 				'c': [
 				{
 					'v': 'March'
 				},
 				{
 					'v': 24
 				}
 				]
 			}
 			]
 		},
 		'options': {
 			'title': 'Rainfall for stn',
 			'isStacked': 'true',
 			'fill': 20,
 			'displayExactValues': true,
 			'vAxis': {
 				'title': 'Rainfall in mm',
 				'gridlines': {
 					'count': 10
 				}
 			},
 			'hAxis': {
 				'title': 'Date'
 			}
 		},
 		'formatters': {}
 	};

 });
