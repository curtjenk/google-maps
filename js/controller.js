var mapsApp = angular.module('mapsApp', []);
mapsApp.controller('mapsController', function($scope) {

    $scope.markers = [];
    $scope.cities = cities;

    $scope.showInfoClick = function(mNdx) {
        //trigger a click event on a particular marker
        $scope.markers[mNdx].setAnimation(google.maps.Animation.DROP);
        google.maps.event.trigger($scope.markers[mNdx], 'click');
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000)
    });


    function createMarker(city) {
        // console.log(city);
        var latLon = city.latLon.split(',', 2);
        var lat = Number(latLon[0]);
        var lon = Number(latLon[1]);
        var contentString = getContentString(city);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lon),
            map: $scope.map,
            title: city.city + ', ' + city.state,
            animation: google.maps.Animation.DROP
        });

        marker.addListener('click', function() {
            infowindow.setContent(contentString);
            infowindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
    }

    var infowindow = new google.maps.InfoWindow({
        // content: contentString
    });

    function getContentString(city) {
        var contentString = '<div id="content">' +
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
            '</div>' +
            '</div>';
        return contentString;
    }


    for (var i = 0; i < cities.length; i++) {
        createMarker(cities[i]);
    }
});
