mapsApp.directive('modal', function() {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

mapsApp.factory('directionsFactory', function() {
    var service = {};
    var _directionsService = {}; //directionsService;
    var _directionsDisplay = {}; //directionsDisplay;
    var _latLonValue = {};

    service.setLatLon = function(latLonValue) {
       _latLonValue = latLonValue;
    };
    service.getLatLon = function() {
        return _latLonValue;
    };

    service.setDirectionsService = function(directionsService) {
      _directionsService = directionsService;
    };
    service.getDirectionsService = function() {
        return _directionsService;
    };

     service.setDirectionsDisplay = function(directionsDisplay) {
      _directionsDisplay = directionsDisplay;
    };
    service.getDirectionsDisplay = function() {
        return _directionsDisplay;
    };

    return service;
});

