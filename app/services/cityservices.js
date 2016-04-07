mapApp.factory('mapService', function() {
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
