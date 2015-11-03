'use strict';

describe('Filter: capitalize', function () {

  // load the filter's module
  beforeEach(module('weathernetApp'));

  // initialize a new instance of the filter before each test
  var capitalize;
  beforeEach(inject(function ($filter) {
    capitalize = $filter('capitalize');
  }));

});
