'use strict';

/**
 * @ngdoc function
 * @name diveandcoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the diveandcoApp
 */

angular.module('diveandcoApp')

.controller('MainCtrl', ['$log', '$mdSidenav', 'pageTitle',
  function($log, $mdSidenav, pageTitle) {

    var self = this;

	var tag = 'MainCtrl:';
	$log.debug(tag, 'load');

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    // self.selected     = null;
    // self.users        = [ ];
    // self.selectUser   = selectUser;
    self.toggleList = toggleUsersList;
    // self.share = share;
    self.pageTitle = pageTitle;

  }
]);
