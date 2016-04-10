mapApp.factory('MapProvider', function($rootScope) {

  var data = {};

  return {
    store: function(key, value) {
      data[key] = value;
      $rootScope.$broadcast('mpStore', data[key]);
    },
    get: function(key) {
      return data[key];
    },
    getAll: function() {
      return data;
    }
  }
});
