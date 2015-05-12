'use strict';

/**
 * @ngdoc service
 * @name diveandcoApp.menuService
 * @description
 * # menuService
 * Service in the diveandcoApp.
 */
angular.module('diveandcoApp')

.service('menuService', [
  '$q',
  function($q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    /**
     * Menu DataService
     * Menu embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    var menuItems = [{
      name: 'Map',
      avatar: 'svg-1',
      go: 'map'
    }, {
      name: 'About',
      avatar: 'svg-2',
      go: 'about'
    }];

    // Promise-based API
    return {
      loadMenuItems: function() {
        // Simulate async nature of real remote calls
        return $q.when(menuItems);
      }
    };
  }
]);
