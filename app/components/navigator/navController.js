// create the controller and inject Angular's $scope, as well as our service.
// mapApp.config(function(uiGmapGoogleMapApiProvider) {
//   uiGmapGoogleMapApiProvider.configure({
//     key: 'AIzaSyCBuUUpMKUWS4jAbgJeognBWlIH3U0XUgk',
//     v: '3.20',
//     libraries: 'weather,geometry,visualization,spaces'
//   });
// });

mapApp.controller("navController", function($scope, $rootScope, $timeout,
    $mdSidenav, $log, MapProvider) {

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function() {
      return $mdSidenav('right').isOpen();
    };


    $rootScope.$on('mpStore', function(e, _data) {
      // console.log(_data);
      //
      // $scope.map = {
      //   center: _data[0].center,
      //   zoom: _data[0].zoom
      // };
      // $scope.options = {
      //   scrollwheel: _data[1].scrollwheel
      // };
      //
      // $scope.searchbox = {
      //   template: _data[2].template,
      //   events: _data[2].events
      // };
    });



    $scope.place = {
      selected: ''
    }

    $scope.onInputChange = function() {
      //MapProvider.store('placeSelected', $scope.placeselect);
    }
    $scope.onInputSubmit = function() {
      MapProvider.store('placeSubmit', $scope.place.select);
    }


    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function() {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function() {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
  })
  .controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
      $mdSidenav('right').close()
        .then(function() {
          $log.debug("close RIGHT is done");
        });
    };
  });
