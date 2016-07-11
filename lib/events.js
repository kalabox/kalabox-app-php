
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

    /*
     * Returns the filemount based on the framework
     */
    var getFilemount = function(framework) {
      switch (framework) {
        case 'drupal': return 'sites/default/files';
        case 'wordpress': return 'wp-content/uploads';
        case 'backdrop': return 'files';
      }
    };

    // Only run if this is a php app
    if (config.type === 'php') {

      // Get the created app type
      var created = results._type;

      // Get the framework and version in various ways
      // For drupal
      if (_.includes(created, 'drupal')) {
        config.pluginconfig.php.framework = 'drupal';
        config.pluginconfig.php.version = created.replace('drupal', '');
        config.pluginconfig.php.filemount = getFilemount(
          config.pluginconfig.php.framework
        );
        config.pluginconfig.php.image = [
          config.pluginconfig.php.framework,
          config.pluginconfig.php.version
        ].join(':');
      }

      // For wordpress
      else if (created === 'wordpress') {
        config.pluginconfig.php.framework = 'wordpress';
        config.pluginconfig.php.version = '4';
        config.pluginconfig.php.filemount = getFilemount(
          config.pluginconfig.php.framework
        );
        config.pluginconfig.php.image = [
          config.pluginconfig.php.framework,
          config.pluginconfig.php.version
        ].join(':');
      }

      // For backdrop
      else if (created === 'backdrop') {
        config.pluginconfig.php.framework = 'backdrop';
        config.pluginconfig.php.version = '1';
        config.pluginconfig.php.filemount = getFilemount(
          config.pluginconfig.php.framework
        );
        config.pluginconfig.php.image = [
          config.pluginconfig.php.framework,
          config.pluginconfig.php.version
        ].join(':');
      }

      // Get the filemount from the framework and add it to our list of ignores
      // NOTE: on Pantheon apps the filemount should be a symlink ie "Name"
      // not "Path"
      var filemount = config.pluginconfig.php.filemount;
      var ignores = config.pluginconfig.sharing.ignore || [];
      ignores.push('Name ' + filemount);
      config.pluginconfig.sharing.ignore = ignores;

      // Set the version
      config.version = pkg.version;

    }

  });

};
