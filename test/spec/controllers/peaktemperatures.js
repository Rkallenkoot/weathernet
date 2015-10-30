'use strict';

describe('Controller: PeaktemperaturesCtrl', function () {

  // load the controller's module
  beforeEach(module('weathernetApp'));

  var PeaktemperaturesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PeaktemperaturesCtrl = $controller('PeaktemperaturesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
