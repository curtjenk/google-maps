/*
    Jo's run live-sever in development mode
    ========================================
    dev-dependencies:
          npm install prompt live-server colors --save

    Purpose:
      Allows you to run a live-server node instance while in Development mode, else
      Connect the normal node way. This needs to be change later to run in NODE Non/Or Production mode.

    Arguments/Settings:
      1. devMode: If set, will prompt user for ...
         a. host_ip: System will check first for local LAN ip, if error, will prompt user for
                      known ip address, else it will provide the default localhost: 127.0.0.1
         b. port: Set the port of your choosing, e.g. 3000, 4000, ... Default is: 8081
         c. folder: Sets specifc folder within the __dirname / 'Current directory' e.g. ( /public /other )

      2. advanceSettings: If set, will allow the user to set additional settings for live-server functionality
         a. logLevel: System settings for log level are: 0 = errors only, 1 = some, 2 = lots
         b. waittime: Sets the refresh rate for the live-server / browser
*/
'use strict';

var prompt = require('prompt');
var colors = require('colors/safe');
var os = require('os');
var ifaces = os.networkInterfaces();

// set theme for color package
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});


prompt.message = ""; // clear default prompt: message
prompt.start();

/* WALK THROUGH USER PROMPTING ====================================
 */
prompt.get({
  properties: {
    devMode: {
      required: true,
      name: 'yesno',
      message: colors.info("Run Dev Mode"),
      validator: /y[es]*|n[o]?/,
      warning: 'Must respond yes or no',
      default: 'no'
    },
    advanceSettings: {
      required: true,
      name: 'yesno',
      message: colors.info("Enable Advance Settings"),
      validator: /y[es]*|n[o]?/,
      warning: 'Must respond yes or no',
      default: 'no',
      ask: function() {
        return prompt.history('devMode').value === 'y'
      }
    }
  }
}, function(err, result) {

  var _port, _host, _folder, _logLevel, _refreshRate;

  // Ask if user wants Dev Mode
  if (result.devMode === 'yes' || result.devMode === 'y') {

    _host = getLanIpAddress('en0'); // Initial Local Ip check

    prompt.get({
      properties: {
        host_ip: {
          message: colors.info("Host IP"),
          default: "127.0.0.1",
          ask: function() {
            // only prompt for host_ip if it is not initially found by getLanIpAddress
            return (_host === undefined || _host === '');
          }
        },
        port: {
          message: colors.info("Port #"),
          default: '8081'
        },
        folder: {
          message: colors.info("Point to a sub-folder within your current directory. (__dirname)"),
          // FIXME Unable to set __dirname as default in prompt get.folder.default
        },
        logLevel: {
          message: colors.info("Set the log level.\ne.g. 0 = errors, 1 = some, 2 = lots"),
          default: 0,
          ask: function() {
            return prompt.history('advanceSettings').value === 'y'
          }
        },
        waittime: {
          message: colors.info("Set the time in milliseconds for the browser refresh rate"),
          default: 1000,
          ask: function() {
            return prompt.history('advanceSettings').value === 'y'
          }
        }
      }
    }, function(err, result) {
      //console.log('Host: ' + result.host + " | Port: " + result.port);

      var liveServer = require("live-server");
      _port = result.port;
      _folder = (result.folder == '') ? '' : result.folder; // See FIXME in folder: object
      _logLevel = result.logLevel;
      _refreshRate = result.waittime;

      var params = {
        port: _port, // Set the server port. Defaults to 8080.
        host: _host, // Set the address to bind to. Defaults to 0.0.0.0.
        root: __dirname + _folder, // Set root directory that's being server. Defaults to cwd.
        open: true, // When false, it won't load your browser by default.
        wait: _refreshRate, // Waits for all changes, before reloading. Defaults to 0 sec.
        logLevel: _logLevel // 0 = errors only, 1 = some, 2 = lots
      };
      liveServer.start(params);
      console.log(colors.verbose("Live-Server is up and running @ " + _host + ":" + _port + "\n"));

    });

  } else {

    // Connect the normal way without live-server capabilities.
    var connect = require('connect');
    var serveStatic = require('serve-static');
    connect().use(serveStatic(__dirname)).listen(8080, function() {
      console.log(colors.verbose('Non-Live Server running on localhost:8080 ...\n'));
    });
  }

});

function getLanIpAddress(_adapter) {
  var _holdIP = '';

  // Check _adapter argument / MAC Adapter for local LAN, specifically.
  if (_adapter === 'en0') {
    // 2nd Object in en0, for ipv4
    _holdIP = ifaces[_adapter][1].address;

  } else {

    // Loop through os.networkInterfaces adapters
    Object.keys(ifaces).forEach(function(_ifName) {
      var alias = 0;

      ifaces[_ifName].forEach(function(iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }

        if (alias >= 1) {
          // this single interface has multiple ipv4 addresses
          //console.log(_ifName + ':' + alias, iface.address);
          _holdIP = _ifName + ':' + alias,
            iface.address;
        } else {
          // this interface has only one ipv4 adress
          //console.log(_ifName, iface.address);
          _holdIP = iface.address;
        }
        ++alias;
      });
    });
  }

  return (_holdIP === undefined) ? '127.0.0.1' : _holdIP; // default to localhost
}
