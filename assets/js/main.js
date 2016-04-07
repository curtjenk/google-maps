var unique = require('uniq');

var data = [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.min.js",
  "node_modules/lodash/dist/lodash.min.js",
  "node_modules/angular/angular.min.js",
  "node_modules/angular-route/angular-route.min.js",
  "node_modules/angular-animate/angular-animate.js",
  "node_modules/angular-aria/angular-aria.min.js",
  "node_modules/angular-material/angular-material.min.js",
  "node_modules/angular-simple-logger/dist/angular-simple-logger.min.js",
  "node_modules/angular-google-maps/dist/angular-google-maps.min.js",

  "node_modules/angular-multiselect/dist/multiselect.js",
  "assets/js/cities.js",
  "assets/js/EasingAnimator.js",
  "assets/js/WeatherInfoByCity.js",
  "assets/js/googleplacestypes.js",
  "assets/js/reInitMap.js",

  "app/app.module.js",
  "app/services/cityservices.js",
  "app/components/navigator/navController.js",
  "app/components/mapviewport/mapController.js"
];

console.log(unique(data));
