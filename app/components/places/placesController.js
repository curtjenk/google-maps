mapApp.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCBuUUpMKUWS4jAbgJeognBWlIH3U0XUgk',
    v: '3.20',
    libraries: 'weather,geometry,visualization,places'
  });
});

mapApp.controller("placesController", function($scope, $rootScope, $timeout,
  $mdSidenav, $log, MapProvider) {
  $scope.map = {
    center: {
      latitude: 34.1207,
      longitude: -84.0044
    },
    zoom: 10
  };
  $scope.options = {
    autocomplete: true
  };
  var events = {
    places_changed: function(searchBox) {}
  }
  $scope.searchbox = {
    template: 'searchbox.tpl.html',
    events: events
  };

  //MapProvider.store('placesData', [$scope.map, $scope.options, $scope.searchbox]);
  $rootScope.$on('mpStore', function(e, _data) {
    console.log(_data);
  });
});
