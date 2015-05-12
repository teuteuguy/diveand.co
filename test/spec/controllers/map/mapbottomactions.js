'use strict';

describe('Controller: MapMapbottomactionsCtrl', function () {

  // load the controller's module
  beforeEach(module('diveandcoApp'));

  var MapMapbottomactionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapMapbottomactionsCtrl = $controller('MapMapbottomactionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
