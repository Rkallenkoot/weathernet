'use strict';

describe('Controller: RainfallCtrl', function () {

  // load the controller's module
  beforeEach(module('weathernetApp'));

  var RainfallCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RainfallCtrl = $controller('RainfallCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
