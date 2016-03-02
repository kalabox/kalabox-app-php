
'use strict';

module.exports = function(kbox) {

  // Node modules
  var _ = require('lodash');

  // Kbox modules
  var events = kbox.core.events.context('6e086c59-20d2-46b5-84ce-44d2de1f58c6');

  /*
   * Add our drupal settings to the ENV and also
   */
  kbox.whenAppRegistered(function(app) {

    // Set our drupal stuff into the env
    var identifier = 'app_drupal_config';
    kbox.core.env.setEnvFromObj(app.config.pluginconfig.drupal, identifier);

    /*
     * We don't want to uninstall our data container on a rebuild
     * so remove the data container from here
     *
     * NOTE: this is a nifty implementation where we inception some events
     * to target exactly what we want
     */
    events.on('pre-app-rebuild', function(app) {

      // We want to edit our engine remove things
      events.on('pre-engine-destroy', function(data) {

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

  });

};
