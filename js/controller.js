var mapsApp = angular.module('mapsApp', []);
mapsApp.controller('mapsController', function($scope) {

    var originalCenter = new google.maps.LatLng(40.0000, -98.0000);
    var originalZoom = 4;
    var clickZoom = 6;
    var finalZoom = 11;

    $scope.markers = [];
    $scope.cities = cities;

    $scope.map = new google.maps.Map(document.getElementById('map'), {
        zoom: originalZoom,
        center: originalCenter
    });

    $scope.showInfoClick = function(mNdx) {
        //trigger a click event on a particular marker
        $scope.markers[mNdx].setAnimation(google.maps.Animation.DROP);
        google.maps.event.trigger($scope.markers[mNdx], 'click');
    };

    var easingAnimator = new EasingAnimator({
        easingInterval: 500,
        duration: 2000,
        step: 100,
        callBack: function(latLng) {
            $scope.map.setCenter(latLng);
            $scope.map.setZoom(clickZoom);
        },
        finalCallBack: function() {
            console.log("all done!!!!");
             $scope.map.setZoom(11);
        }
    });

    // var easingAnimator = EasingAnimator.makeFromCallback(function(latLng) {
    //     $scope.map.setCenter(latLng);
    //     $scope.map.setZoom(4);
    // });

    $scope.zoomClick = function(mNdx) {
        //trigger a click event on a particular marker
        // $scope.map.panTo($scope.markers[mNdx].position);

        // var point = originalCenter;
        var point = $scope.map.getCenter();
        var destinationPoint = { lat: $scope.markers[mNdx].position.lat(), lng: $scope.markers[mNdx].position.lng() };
        $scope.map.setZoom(clickZoom);

        easingAnimator.easeProp({
            lat: point.lat(),
            lng: point.lng()
        }, destinationPoint);

    };



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
