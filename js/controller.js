var mapsApp = angular.module('mapsApp', [
    'ngRoute',
    'angularjs-dropdown-multiselect'
]);

mapsApp.controller('mapsController', function($scope, $compile) {


    var originalCenter = new google.maps.LatLng(40.0000, -98.0000);
    var originalZoom = 4;
    var clickZoom = 6;
    var finalZoom = 11;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;


    $scope.markers = [];
    $scope.cities = cities;

    $scope.map = new google.maps.Map(document.getElementById('map'), {
        zoom: originalZoom,
        center: originalCenter
    });

    directionsDisplay.setMap($scope.map);

    $scope.example1model = [];
    $scope.example1data = normalizedPlaces(); //[ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];
    $scope.example5customTexts = { buttonDefaultText: 'Place Types' };
    $scope.example10settings = { selectionLimit: 5 };

    var clickedOnMarker = new google.maps.Marker({});

    $scope.getWeatherHandler = function(cityYearRank) {
        var apiKey = '7496eb8b9ef9616cf145982ce0a992fe';
        var cityNdx = Number(cityYearRank) - 1;
        var city = cities[cityNdx];
        // console.log(city);
        weatherSearchByCity(city.city, apiKey, function(weatherData) {
          // console.log(weatherData);
          // console.log(weatherData.sunriseToDate());
            var contentString = getContentStringWeather(city, weatherData);
            infowindow.setContent(contentString[0]);
            infowindow.open($scope.map, clickedOnMarker);
        });

    };

    $scope.onChangeHandler = function(_latLonValue) {
        calculateAndDisplayRoute(directionsService, directionsDisplay, _latLonValue);
    };

    $scope.showInfoClick = function(mNdx) {
        var _aPlaceTypes = [];

        for (i = 0; i < $scope.example1model.length; i++) {
            _aPlaceTypes.push($scope.example1data[$scope.example1model[i].id].original);
        }

        //console.log(_aPlaceTypes);

        if (_aPlaceTypes.length > 0) {
            // what we want to do?
            placesSearch(mNdx, _aPlaceTypes);
        } else {
            //trigger a click event on a particular marker
            $scope.markers[mNdx].setAnimation(google.maps.Animation.DROP);
            google.maps.event.trigger($scope.markers[mNdx], 'click');
        }
    };

    function placesSearch(ndxOfCityClicked, _arr) {
        //pyrmont should be the location/city selected,
        var cityLocation = {
            lat: $scope.markers[ndxOfCityClicked].position.lat(),
            lng: $scope.markers[ndxOfCityClicked].position.lng()
        };

        ///???? do we really need to create a new map?
        $scope.map = new google.maps.Map(document.getElementById('map'), {
            center: cityLocation,
            zoom: 10
        });

        // $scope.map.setCenter(cityLocation);
        // $scope.map.setZoom(10);

        var service = new google.maps.places.PlacesService($scope.map);

        console.log(_arr);
        service.nearbySearch({
            location: cityLocation,
            radius: 50000,
            type: _arr //use array of selected placesTypes
        }, placesSearchcallback);
    }

    function placesSearchcallback(results, status) {
        //console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createPlacesMarker(results[i]);
            }
        }
    }

    function createPlacesMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: place.geometry.location
        });

        //  google.maps.event.addListener(marker, 'click', function() {
        //      infowindow.setContent(place.name);
        //      infowindow.open($scope.map, this);
        //  });

        marker.addListener('click', function() {
            infowindow.setContent(place.name); //contentString[0]);
            infowindow.open($scope.map, marker);
        });
    }

    var zoomAnimator = new ZoomAnimator({
        zoomInterval: 500,
        duration: 100
    });

    var easingAnimator = new EasingAnimator({
        easingInterval: 500,
        duration: 2000,
        step: 100,
        callBack: function(latLng) {
            $scope.map.setCenter(latLng);
            $scope.map.setZoom(clickZoom);
        },
        finalCallBack: function() {
            console.log("Zooming in");
            zoomAnimator.zoomIn(
                $scope.map.getZoom(),
                11,
                function(zoom) {
                    console.log("IN = " + zoom);
                    $scope.map.setZoom(zoom);
                },
                function() {}
            );
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
        var destinationPoint = {
            lat: $scope.markers[mNdx].position.lat(),
            lng: $scope.markers[mNdx].position.lng()
        };
        //$scope.map.setZoom(clickZoom);

        // easingAnimator.easeProp({
        //   lat: point.lat(),
        //   lng: point.lng()
        // }, destinationPoint);
        console.log("Starting the zoom out at " + $scope.map.getZoom() + " End=6");
        zoomAnimator.zoomOut(
            $scope.map.getZoom(),
            6,
            function(zoom) {
                console.log("OUT = " + zoom);
                $scope.map.setZoom(zoom);
            },
            function() {
                easingAnimator.easeProp({
                    lat: point.lat(),
                    lng: point.lng()
                }, destinationPoint);
            }
        );

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
            clickedOnMarker = marker;
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
            '<div><a href="#" ng-click="onChangeHandler(\'' + city.latLon + '\')">Directons</a></div>' +
            '<div id="weather-info"><a href="#" ng-click="getWeatherHandler(\'' + city.yearRank + '\')">Weather</a></div>' +
            '</div>' +
            '</div>';
        return $compile(_content)($scope); //contentString; RETURN'd as ARRAY!!
    }

    function getContentStringWeather(city, weather) {

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
            '<div><a href="#" ng-click="onChangeHandler(\'' + city.latLon + '\')">Directons</a></div>' +
            '<div class="weather-info"><h3>Weather Conditions</h3></div>' +
            '<div><div class="left-side"><strong>&nbsp;Temp : </strong>' + weather.currTemp + '</div><div class="right-side"><img ng-src="' + weather.weatherIconURL + '"> </div></div> ' +
            '</div>' +
            '</div>';
        return $compile(_content)($scope); //contentString; RETURN'd as ARRAY!!
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
