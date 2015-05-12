'use strict';

/**
 * @ngdoc overview
 * @name diveandcoApp
 * @description
 * # diveandcoApp
 *
 * Main module of the application.
 */
var app = angular.module('diveandcoApp', [
  'ngMaterial',
  'ui.router',
  'uiGmapgoogle-maps'
]);


app.config(['$mdThemingProvider', '$mdIconProvider',
  function($mdThemingProvider, $mdIconProvider) {
    $mdIconProvider
      .defaultIconSet('./images/icons/avatars.svg', 128)
      .icon('menu', 'images/icons/menu.svg', 24);
    //   .icon("share", "./assets/svg/share.svg", 24)
    //   .icon("google_plus", "./assets/svg/google_plus.svg", 512)
    //   .icon("hangouts", "./assets/svg/hangouts.svg", 512)
    //   .icon("twitter", "./assets/svg/twitter.svg", 512)
    //   .icon("phone", "./assets/svg/phone.svg", 512);
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('red');
  }
]);

app.config(['uiGmapGoogleMapApiProvider',
  function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBTflAWAg7irIzzACpc1gdn2rfLzIJ2s8E',
      v: '3.19',
      libraries: 'weather,geometry,visualization,places'
    });
  }
]);

app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /map
    $urlRouterProvider.otherwise('/map');
    //
    // Now set up the states
    $stateProvider.state('map', {
      url: '/map',
      templateUrl: 'views/map/map.html',
      controller: 'MapCtrl as MapCtrl'
    })
    .state('about', {
      url: '/about',
      template: '<div layout-padding>Welcome to Dive and Co.<br/>Your friendly diving social network.</div>',
      controller: ['pageTitle', function(pageTitle) {
        pageTitle.title = 'About';
      }]
    });
    // .state('state1.list', {
    //     url: "/list",
    //     templateUrl: "partials/state1.list.html",
    //     controller: function($scope) {
    //       $scope.items = ["A", "List", "Of", "Items"];
    //     }
    //   })
    //   .state('state2', {
    //     url: "/state2",
    //     templateUrl: "partials/state2.html"
    //   })
    //   .state('state2.list', {
    //     url: "/list",
    //     templateUrl: "partials/state2.list.html",
    //     controller: function($scope) {
    //       $scope.things = ["A", "Set", "Of", "Things"];
    //     }
    //   });
  }
]);
