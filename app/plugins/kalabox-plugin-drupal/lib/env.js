'use strict';

module.exports = function(kbox) {

  // Node
  var path = require('path');

  // Constants
  var confPath = path.resolve(__dirname, '..', '..', '..', 'kalabox.yml');

  kbox.ifApp(function(app) {

    /*
     * Load our app config
     */
    var getConfig = function() {
      return app.pluginconfig.drupal;
    };

    // Set some fun ENV action
    kbox.core.env.setEnvFromObj(getConfig(), 'app_drupal');

  });

};
