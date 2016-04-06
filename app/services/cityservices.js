//This is a factory that we can use to pass data back and forth in between our controllers
//It has both a set and a get function
//When the user chooses a city, we will call the set function on the way out and get on the way in
//When the user goes to the base map, we don't need to do anything
angular.module('dcCities', [])
  .factory('mapService', function() {
    var selectedCity = {}

    function set(map) {
      masterMap = map;
    }

    function setCities(citees) {
      citeesMap = citiees;
    }

    function getCities() {
      return citeesMap;
    }

    function get() {
      // console.log(typeof(masterMap));
      if (typeof(masterMap) === 'undefined') {
        return 'noMap';
      } else {
        return masterMap;
      }
    }

    return {
      set: set,
      get: get,
      setCities: setCities,
      getCities: getCities
    }
  });
