'use strict';

/**
 * @ngdoc function
 * @name diveandcoApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the diveandcoApp
 */

angular.module('diveandcoApp')

.controller('MapCtrl', [
  '$window',
  '$rootScope',
  '$log',
  '$mdBottomSheet',
  'uiGmapGoogleMapApi',
  'uiGmapIsReady',
  'mapStyleApple',

  function($window, $rootScope, $log, $mdBottomSheet, uiGmapGoogleMapApi, uiGmapIsReady, mapStyleApple) {

    var tag = 'MapCtrl:';
    $log.debug(tag, 'load');

    var self = this;

    /**
     * Show the bottom sheet
     */
    function bottomActions($event) {

      $log.debug(tag, 'bottomActions clicked!');
      /**
       * Bottom Sheet controller for the Map Actions
       */
      function MapBottomActionsController($mdBottomSheet) {
        // this.user = user;
        // this.items = [{
        //   name: 'Phone',
        //   icon: 'phone',
        //   icon_url: 'assets/svg/phone.svg'
        // }, {
        //   name: 'Twitter',
        //   icon: 'twitter',
        //   icon_url: 'assets/svg/twitter.svg'
        // }, {
        //   name: 'Google+',
        //   icon: 'google_plus',
        //   icon_url: 'assets/svg/google_plus.svg'
        // }, {
        //   name: 'Hangout',
        //   icon: 'hangouts',
        //   icon_url: 'assets/svg/hangouts.svg'
        // }];
        // this.performAction = function(action) {
        //   $mdBottomSheet.hide(action);
        // };
      }

      // var user = self.selected;
      $mdBottomSheet.show({
        parent: angular.element(document.getElementById('content')),
        templateUrl: '/views/map/mapBottomActions.html',
        controller: 'MapBottomActionsCtrl', //['$mdBottomSheet', MapBottomActionsController],
        controllerAs: "mba",
        bindToController: true,
        targetEvent: $event
      }).then(function(clickedItem) {
        $log.debug(tag, clickedItem.name + ' clicked!');
      });
    }

    uiGmapGoogleMapApi.then(function(maps) {
      $log.debug(tag, 'in uiGmapGoogleMapApi.then');

      self.map = {
        center: {
          latitude: 1.348842, //@1.348842,103.8172953,12z
          longitude: 103.8172953
        },
        zoom: 11,
        options: {
          styles: mapStyleApple,
          disableDefaultUI: true

        }
      };

    });

    self.bottomActions = bottomActions;

  }

])

.directive('angularGoogleMapContainer', ['$window', '$timeout', function($window, $timeout) {
  return {
    restrict: 'C',
    link: function link(scope, element, attrs) {

      function reSetHeight() {
        $timeout(function() {
          element.css('height', ($window.innerHeight - 64) + 'px');
        });
      }

      reSetHeight();
      $window.addEventListener('resize', reSetHeight);

      scope.$on('$destroy', function() {
        $window.removeEventListener('resize', reSetHeight);
      });

    }
  };
}]);
