'use strict';

describe('Service: pageTitle', function () {

  // load the service's module
  beforeEach(module('diveandcoApp'));

  // instantiate service
  var pageTitle;
  beforeEach(inject(function (_pageTitle_) {
    pageTitle = _pageTitle_;
  }));

  it('should do something', function () {
    expect(!!pageTitle).toBe(true);
  });

});
