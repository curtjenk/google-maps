var mapsApp = angular.module('mapsApp', []);
mapsApp.controller('mapsController', function($scope, $compile) {

  $scope.markers = [];
  $scope.cities = cities;
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  $scope.showInfoClick = function(mNdx) {
    //trigger a click event on a particular marker
    $scope.markers[mNdx].setAnimation(google.maps.Animation.DROP);
    google.maps.event.trigger($scope.markers[mNdx], 'click');
    console.log(mNdx);
  };

  $scope.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(40.0000, -98.0000)
  });

  directionsDisplay.setMap($scope.map);

  $scope.onChangeHandler = function(_latLonValue) {
    calculateAndDisplayRoute(directionsService, directionsDisplay, _latLonValue);
  };


  function createMarker(city) {
    // console.log(city);
    var _latLon = city.latLon.split(',', 2);
    var lat = Number(_latLon[0]);
    var lon = Number(_latLon[1]);
    var contentString = getContentString(city);

    //console.log(latLon);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lon),
      map: $scope.map,
      title: city.city + ', ' + city.state,
      animation: google.maps.Animation.DROP
    });

    marker.addListener('click', function() {
      infowindow.setContent(contentString[0]);
      infowindow.open($scope.map, marker);
    });

    $scope.markers.push(marker);
  }

  var infowindow = new google.maps.InfoWindow({
    // content: contentString
  });

  function getContentString(city) {

    var _content = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 class="firstHeading">' + city.city + '</h1>' +
      '<div class="bodyContent">' +
      '<div><strong>Total Population : </strong>' + city.yearEstimate + '</div> ' +
      '<div><strong>2010 Census : </strong>' + city.lastCensus + '</div> ' +
      '<div><strong>Population Change : </strong>' + city.change + ' </div> ' +
      '<div><strong>Population Density : </strong>' + city.lastPopDensity + ' </div> ' +
      '<div><strong>State : </strong>' + city.state + ' </div> ' +
      '<div><strong>Land Area : </strong>' + city.landArea + '</div>' +
      '<div><a href="#" ng-click="onChangeHandler(\'' + city.latLon + '\')">Directons To</a></div>' +
      '</div>' +
      '</div>';
    return $compile(_content)($scope); //contentString;
  }


  for (var i = 0; i < cities.length; i++) {
    createMarker(cities[i]);
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay, _latLonValue) {
    console.log(_latLonValue);

    var _latLon = _latLonValue.split(',', 2);

    console.log(_latLon);

    var lat = Number(_latLon[0]);
    var lon = Number(_latLon[1]);

    var _destination = new google.maps.LatLng(lat, lon);
    var _origin = new google.maps.LatLng(33.7629, -84.4227);

    directionsService.route({
      // origin: document.getElementById('start').value,
      // destination: document.getElementById('end').value,
      origin: _origin,
      destination: _destination,
      travelMode: google.maps.TravelMode.DRIVING

    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
});
