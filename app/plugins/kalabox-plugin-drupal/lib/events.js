
'use strict';

module.exports = function(kbox) {

  // Node modules
  var fs = require('fs');
  var path = require('path');

  // NPM modules
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
     * Pull down correct drupal version, set up permissions correctly
     * and symlink sdf
     */
    events.on('post-create-app', function(app, done) {

      /*
       * Helper to get a appserver run def template
       */
      var getAppRunner = function() {
        return {
          compose: app.composeCore,
          project: app.name,
          opts: {
            services: ['appserver']
          }
        };
      };

      // Construct our extract definition
      var curlRun = getAppRunner();
      curlRun.opts.entrypoint = ['bash', '-c'];
      var drupalUrl =
        'http://ftp.drupal.org/files/projects/drupal-${DRUPAL_VERSION}.tar.gz';
      curlRun.opts.cmd = [
        'curl',
        '-fSL',
        drupalUrl,
        '-o',
        'drupal.tar.gz'
      ];
      // Grab our drupal project
      return kbox.engine.run(curlRun)

      // Verify MD5 hash
      .then(function() {
        var md5Verify = getAppRunner();
        md5Verify.opts.entrypoint = 'echo';
        md5Verify.opts.cmd = [
          '"${DRUPAL_MD5} *drupal.tar.gz"',
          '|',
          'md5sum',
          '-c',
          '-'
        ];
        return kbox.engine.run(md5Verify);
      })

      // Extract to webroot
      .then(function() {
        var untarDrupal = getAppRunner();
        untarDrupal.opts.entrypoint = 'tar';
        untarDrupal.opts.cmd = [
          '-xz',
          '--strip-components=1',
          '-f',
          'drupal.tar.gz'
        ];
        return kbox.engine.run(untarDrupal);
      })

      // Extract to webroot
      .then(function() {
        var untarDrupal = getAppRunner();
        untarDrupal.opts.entrypoint = 'rm';
        untarDrupal.opts.cmd = [
          '-f',
          'drupal.tar.gz'
        ];
        return kbox.engine.run(untarDrupal);
      })

      // Chown sites directory
      .then(function() {
        var chownDrupal = getAppRunner();
        chownDrupal.opts.entrypoint = 'chown';
        chownDrupal.opts.cmd = [
          '-R',
          'www-data:www-data',
          'sites'
        ];
        return kbox.engine.run(chownDrupal);
      })

      // Symlink s/d/f to media
      .then(function() {
        var linkRun = getAppRunner();
        linkRun.opts.entrypoint = 'ln';
        linkRun.opts.cmd = [
          '-nsf',
          '/media',
          '/var/www/html/sites/default/files'
        ];
        return kbox.engine.run(linkRun);
      })

      // Hacky way to get our /media directory writable by
      // the webserver
      // @todo: has to be a better way
      .then(function() {
        fs.chmodSync(path.join(app.root, 'files'), '0777');
      })

      // Finish up
      .nodeify(done);

    });

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
