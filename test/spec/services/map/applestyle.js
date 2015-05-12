'use strict';

describe('Service: map/AppleStyle', function () {

  // load the service's module
  beforeEach(module('diveandcoApp'));

  // instantiate service
  var map/AppleStyle;
  beforeEach(inject(function (_map/AppleStyle_) {
    map/AppleStyle = _map/AppleStyle_;
  }));

  it('should do something', function () {
    expect(!!map/AppleStyle).toBe(true);
  });

});
