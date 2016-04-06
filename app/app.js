var mapApp = angular.module('mapApp', [
  'ngRoute',
  'ngMaterial',
  'am.multiselect',
  'dcCities'
]);


//This code will run as soon as the route changes.
//We will run our service update here.
//We need to remember to call our service in so that run can use it!
//routeParams is also important so we can see whats in the url
mapApp.run(function($rootScope, $location, $routeParams, mapService) {
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
mapApp.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/front.html',
    controller: 'mapController'
  });
  $routeProvider.when('/city/:cityIndex', {
    templateUrl: 'views/city.html',
    controller: 'cityController'
  });
  $routeProvider.otherwise({
    redirectTo: '/',
  });
});

// mapApp.controller('mainController', function($scope) {
// 	// MAIN CONTROLLER - PLACEHOLDER
// 	$scope.dirClick = function(lat, lon){
// 		console.log('here');
// 	}
// });
