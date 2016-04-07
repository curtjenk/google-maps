mapApp.controller("mapController", function($scope, $location, $mdSidenav, NgMap) {

  $scope.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCBuUUpMKUWS4jAbgJeognBWlIH3U0XUgk';

  NgMap.getMap('placesmap').then(function(map) {
    var latLng = new google.maps.LatLng(40.74, -74.18);
    var marker = new google.maps.Marker({
      position: latLng,
      draggable: true
    });
    marker.setMap(map);

    $scope.location = [latLng.lat(), latLng.lng()];

    $scope.showInfoClick = function(cityYearRank) {
      var mNdx = Number(cityYearRank) - 1;
      var _aPlaceTypes = [];
      //NOTE: if selectionLimit is 1, example1model will be an object not an array
      //https://github.com/dotansimha/angularjs-dropdown-multiselect/issues/151
      if ($scope.example1model.length === 0 && $scope.example1model.id !==
        undefined) {
        _aPlaceTypes.push($scope.example1data[$scope.example1model.id].original);
      } else {
        for (i = 0; i < $scope.example1model.length; i++) {
          _aPlaceTypes.push($scope.example1data[$scope.example1model[i].id]
            .original);
        }
      }

      $mdSidenav('right').close();
      // console.log(typeof($scope.example1model));
      // console.log($scope.example1model);
      // console.log($scope.example1model.id);
      // console.log($scope.example1model.length);
      // console.log(_aPlaceTypes);

      if (_aPlaceTypes.length > 0) {
        // what we want to do?
        placesSearch(mNdx, _aPlaceTypes);
      } else {
        //trigger a click event on a particular marker
        $scope.markers[mNdx].setAnimation(google.maps.Animation.DROP);
        google.maps.event.trigger($scope.markers[mNdx], 'click');
      }
    };


  })

});
