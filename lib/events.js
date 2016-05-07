
'use strict';

module.exports = function(kbox) {

  // NPM modules
  var _ = require('lodash');

  /*
   * Add some other important things to our kalabox.yml before
   * configin it
   */
  kbox.core.events.on('pre-create-configure', function(data) {

    // Grab the config from teh data
    var config = data.config;
    var results = data.results;
    var pkg = data.pkg;

    // Only run if this is a php app
    if (config.type === 'php') {

      // Get the created app type
      var created = results._type;

      // Get the framework and version in various ways
      // For drupal
      if (_.includes(created, 'drupal')) {
        config.pluginconfig.php.framework = 'drupal';
        config.pluginconfig.php.version = created.replace('drupal', '');
        config.pluginconfig.php.image = [
          config.pluginconfig.php.framework,
          config.pluginconfig.php.version
        ].join(':');
      }

      // For wordpress
      else if (created === 'wordpress') {
        config.pluginconfig.php.framework = 'wordpress';
        config.pluginconfig.php.version = '4';
        config.pluginconfig.php.image = [
          config.pluginconfig.php.framework,
          config.pluginconfig.php.version
        ].join(':');
      }

      // For backdrop
      else if (created === 'backdrop') {
        config.pluginconfig.php.framework = 'backdrop';
        config.pluginconfig.php.version = '1';
        config.pluginconfig.php.image = [
          config.pluginconfig.php.framework,
          config.pluginconfig.php.version
        ].join(':');
      }

      // Set the version
      config.version = pkg.version;

    }

  });

};