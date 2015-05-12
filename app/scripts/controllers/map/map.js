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
  '$scope',
  '$log',
  '$mdBottomSheet',
  'uiGmapGoogleMapApi',
  'uiGmapIsReady',
  'mapStyleApple',
  'pageTitle',

  function($window, $scope, $log, $mdBottomSheet, uiGmapGoogleMapApi, uiGmapIsReady, mapStyleApple, pageTitle) {

    var tag = 'MapCtrl:';
    $log.debug(tag, 'load');

    pageTitle.title = 'Map';

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

    self.searchbox = {
      template: 'searchbox.tpl.html',
      // template: 'views/map/mapSearchBox.html',
      events: {
        place_changed: function(autocomplete) {

          var result = autocomplete.getPlace();
          if (typeof result.address_components == 'undefined') {} else {

            // self.PlacesService.getDetails(result, function(place, status) {
            //   // console.log(status);
            //   if (status == google.maps.places.PlacesServiceStatus.OK) {
            //     // console.log(place);
            //     // var marker = new google.maps.Marker({
            //     //   map: self.actualMapObject,
            //     //   position: place.geometry.location
            //     // });
            //     // google.maps.event.addListener(marker, 'click', function() {
            //     //   infowindow.setContent(place.name);
            //     //   infowindow.open(map, this);
            //     // });
            //   }
            // });

            var location = result.geometry.location;
            self.map.center = {
              latitude: location.lat(),
              longitude: location.lng()
            };

          }
        }
      },
      options: {
        autocomplete: true
      }
    };

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

        },
        events: {
          tilesloaded: function(map) {
            self.actualMapObject = map;
            self.PlacesService = new google.maps.places.PlacesService(map);
          }
        }
      };

      self.googleMapsObject = maps;
      // console.log(angular.element('.angular-google-map-container'));
      // var placeService = new google.maps.places.PlacesService();

    });

    // uiGmapIsReady.promise(1).then(function(instances) {
    //   console.log(instances);
    //   var placeService = self.googleMapsObject.places.PlacesService(instances[0].map);
    // });

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



// if (typeof result.address_components == 'undefined') {
//   var autocompleteService = new google.maps.places.AutocompleteService();
//   autocompleteService.getPlacePredictions({
//     'input': result.name,
//     'offset': result.name.length,
//     // I repeat the options for my AutoComplete here to get
//     // the same results from this query as I got in the 
//     // AutoComplete widget
//     'componentRestrictions': {
//       'country': 'es'
//     },
//     'types': ['(cities)']
//   }, function listentoresult(list, status) {
//     if (list == null || list.length == 0) {
//       // There are no suggestions available.
//       // The user saw an empty list and hit enter.
//       console.log("No results");
//     } else {
//       // Here's the first result that the user saw
//       // in the list. We can use it and it'll be just
//       // as if the user actually selected it
//       // themselves. But first we need to get its details
//       // to receive the result on the same format as we
//       // do in the AutoComplete.
//       // var placesService = new google.maps.places.PlacesService(document.getElementById('placesAttribution'));
//       // placesService.getDetails(
//       //     {'reference': list[0].reference},
//       //     function detailsresult(detailsResult, placesServiceStatus) {
//       //         // Here's the first result in the AutoComplete with the exact
//       //         // same data format as you get from the AutoComplete.
//       //         console.log("We selected the first item from the list automatically because the user didn't select anything");
//       //         console.log(detailsResult);
//       //     }
//       // );
//       console.log('Success', list, status);
//     }
//   });
//   console.log('here');
// }
