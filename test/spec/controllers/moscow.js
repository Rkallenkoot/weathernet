'use strict';

describe('Controller: MoscowCtrl', function () {

  // load the controller's module
  beforeEach(module('weathernetApp'));

  var MoscowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoscowCtrl = $controller('MoscowCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
