
'use strict';

module.exports = function(kbox, app) {

  // Node modules
  var path = require('path');
  var fs = require('fs');

  // NPM modules
  var _ = require('lodash');

  /*
   * Add our drupal settings to the ENV and also
   */

  // Set our drupal stuff into the env
  var identifier = 'app_php_config';
  app.env.setEnvFromObj(app.config.pluginconfig.php, identifier);

  /*
   * Get framework specific events if applicable
   */
  var framework = app.config.pluginconfig.php.framework;
  var frameworkEvents = path.join(__dirname, framework + '.js');
  if (fs.existsSync(frameworkEvents)) {
    require(frameworkEvents)(kbox, app);
  }

  /*
   * We don't want to uninstall our data container on a rebuild
   * so remove the data container from here
   *
   * NOTE: this is a nifty implementation where we inception some events
   * to target exactly what we want
   */
  app.events.on('pre-rebuild', function() {

    // We want to edit our engine remove things
    kbox.core.events.on('pre-engine-destroy', function(data) {

      // Get our services
      var services = _.flatten(_.map(app.composeCore, function(file)  {
        return _.keys(kbox.util.yaml.toJson(file));
      }));

      // Remove the data element
      var withoutData = _.remove(services, function(service) {
        return service !== 'data';
      });

      // Update data to note remove data services on rebuilds
      data.opts = {services: withoutData};

    });

  });

  /*
   * build an object of services to use
   */
  app.events.on('services', function() {

    // Get our services module
    var services = require('./services.js')(kbox, app);

    // Get our services info
    return services.getServicesInfo()

    // And then define it
    .then(function(services) {
      app.services = services;
    });

  });

};
