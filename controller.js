var mapsApp = angular.module('mapsApp', []);
mapsApp.controller('mapsController', function($scope) {


    $scope.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000)
    });

    function createMarker(city) {
        // console.log(city);
        var latLon = city.latLon.split(',', 2);
        var lat = Number(latLon[0]);
        var lon = Number(latLon[1]);
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">' + city.city + '</h1>' +
            '<div id="bodyContent">' +
            '<p><b>' + city.city + ', ' + city.state + '</b></p>' +
            '<p>Population is ' + city.yearEstimate + ' which is ' + city.change +
            ' over the last census count of ' + city.lastCensus + '</p>' +
            '<p>' + city.city + ' occupies ' + city.landArea + ' ( density = ' + city.lastPopDensity + ')</p>' +
            '</div>' +
            '</div>';

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: $scope.map,
            title: city.city + ', ' + city.state
        });

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        marker.addListener('click', function() {
            infowindow.open($scope.map, marker);
        });
    }

    $scope.cities = cities;
    
    for (var i = 0; i < cities.length; i++) {
        createMarker(cities[i]);
    }
});
