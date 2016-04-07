var mapApp = angular.module('mapApp', [
  'ngRoute',
  'ngMaterial',
  'ngMap',
  'ui.router'
]);

//$scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCBuUUpMKUWS4jAbgJeognBWlIH3U0XUgk';


//This code will run as soon as the route changes.
//We will run our service update here.
//We need to remember to call our service in so that run can use it!
//routeParams is also important so we can see whats in the url
mapApp.run(function($rootScope, $location, $routeParams, $controller,
  mapService) {
  $rootScope.$watch(function() {
      return $location.path();
    },
    function(a) {
      if (a !== '/') {
        console.log('url has changed: ' + a);
      }
    });
});

//We add a second route for /city/*
//Angular will take any parameter with a : in front of it as a wildcard
//That wildcard, is what the $routeParams will use above as it's property
mapApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/mapview")
  $stateProvider
    .state('mapviewport', {
      url: "/mapview",
      templateUrl: "app/components/mapviewport/placesmap.html",
      controller: 'mapController'
    })


  // $routeProvider.when('/:template', {
  //   templateUrl: 'app/components/mapviewport/mapview.html',
  //   controller: 'mapController'
  // });


  // $routeProvider.when('components/mapviewport/:viewport', {
  //   controller: 'mainController',
  //   templateUrl: function($routeParams) {
  //     templateFileName = 'viewport' + $routeParams.viewport + ".html";
  //     return templateFileName;
  //   }
  // }).otherwise({
  //   redirectTo: '/0'
  // });


});

// mapApp.controller("mainController", function($scope, $location, NgMap) {
//
//   $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCBuUUpMKUWS4jAbgJeognBWlIH3U0XUgk';
//
//   NgMap.getMap().then(function(map) {
//     console.log(map.getCenter());
//     console.log('markers', map.markers);
//     console.log('shapes', map.shapes);
//   });
//
// });
