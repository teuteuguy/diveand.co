'use strict';

/**
 * @ngdoc function
 * @name diveandcoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the diveandcoApp
 */

angular.module('diveandcoApp')

.controller('MainCtrl', ['$log', '$mdSidenav', '$state', 'pageTitle', 'menuService', 
  function($log, $mdSidenav, $state, pageTitle, menuService) {

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

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectMenuItem ( menuItem ) {
      self.selected = angular.isNumber(menuItem) ? self.menuItems[menuItem] : menuItem;
      self.toggleList();
      $state.go(menuItem.go);
    }

    // *********************************
    // Setup the Controller
    // *********************************

    self.selected     = null;
    self.menuItems    = [ ];
    self.selectMenuItem   = selectMenuItem;
    self.toggleList = toggleUsersList;
    // self.share = share;
    self.pageTitle = pageTitle;


    // Load the menu
    menuService.loadMenuItems().then( function( menuItems ) {
      self.menuItems = [].concat(menuItems);
      self.selected = menuItems[0];
    });

  }
]);
