var mapApp = angular.module('mapApp', [
  'ngRoute',
  'ngMaterial'
]);


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
mapApp.config(function($routeProvider) {
  // $routeProvider.when('/', {
  //   templateUrl: 'app/components/navigator/navigator.html',
  //   controller: 'navController'
  // });
  // $routeProvider.when('/city/:cityIndex', {
  //   templateUrl: 'views/city.html',
  //   controller: 'cityController'
  // });
  $routeProvider.otherwise({
    redirectTo: '/',
  });
});

// mapApp.controller('mainController', function($scope, $compile, $timeout,
//     $mdSidenav, $log) {
//
//     $scope.toggleLeft = buildDelayedToggler('left');
//     $scope.toggleRight = buildToggler('right');
//     $scope.isOpenRight = function() {
//       return $mdSidenav('right').isOpen();
//     };
//
//     /**
//      * Supplies a function that will continue to operate until the
//      * time is up.
//      */
//     function debounce(func, wait, context) {
//       var timer;
//
//       return function debounced() {
//         var context = $scope,
//           args = Array.prototype.slice.call(arguments);
//         $timeout.cancel(timer);
//         timer = $timeout(function() {
//           timer = undefined;
//           func.apply(context, args);
//         }, wait || 10);
//       };
//     }
//
//     /**
//      * Build handler to open/close a SideNav; when animation finishes
//      * report completion in console
//      */
//     function buildDelayedToggler(navID) {
//       return debounce(function() {
//         $mdSidenav(navID)
//           .toggle()
//           .then(function() {
//             $log.debug("toggle " + navID + " is done");
//           });
//       }, 200);
//     }
//
//     function buildToggler(navID) {
//       return function() {
//         $mdSidenav(navID)
//           .toggle()
//           .then(function() {
//             $log.debug("toggle " + navID + " is done");
//           });
//       };
//     }
//   })
//   .controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
//     $scope.close = function() {
//       $mdSidenav('right').close()
//         .then(function() {
//           $log.debug("close RIGHT is done");
//         });
//     };
//   });
