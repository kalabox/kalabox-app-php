
'use strict';

module.exports = function(kbox, app) {

  // Node modules
  var id = kbox.core.deps.get('globalConfig').engineId;
  var group = kbox.core.deps.get('globalConfig').engineGid;

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

  /*
   * Drupal post-create setup function
   */
  kbox.core.events.on('post-create-app', function(app, done) {

    // Only run when app type is php.
    if (app.config.type === 'php') {

      // Construct our extract definition
      var curlRun = getAppRunner();
      curlRun.opts.entrypoint = ['bash', '-c'];
      var backdropUrl =
        'https://github.com/backdrop/backdrop/archive/1.3.4.tar.gz';
      curlRun.opts.cmd = [
        'curl',
        '-fSL',
        backdropUrl,
        '-o',
        'backdrop.tar.gz'
      ];
      // Grab our drupal project
      return kbox.engine.run(curlRun)

      // Extract to webroot
      .then(function() {
        var untarDrupal = getAppRunner();
        untarDrupal.opts.entrypoint = 'tar';
        untarDrupal.opts.cmd = [
          '-xz',
          '--strip-components=1',
          '-f',
          'backdrop.tar.gz'
        ];
        return kbox.engine.run(untarDrupal);
      })

      // Extract to webroot
      .then(function() {
        var untarDrupal = getAppRunner();
        untarDrupal.opts.entrypoint = 'rm';
        untarDrupal.opts.cmd = [
          '-f',
          'backdrop.tar.gz'
        ];
        return kbox.engine.run(untarDrupal);
      })

      // Remove files
      .then(function() {
        var untarDrupal = getAppRunner();
        untarDrupal.opts.entrypoint = 'rm';
        untarDrupal.opts.cmd = [
          '-rf',
          '/var/www/html/files'
        ];
        return kbox.engine.run(untarDrupal);
      })

      // Symlink to media
      .then(function() {
        var linkRun = getAppRunner();
        linkRun.opts.entrypoint = 'ln';
        linkRun.opts.cmd = [
          '-nsf',
          '/media',
          '/var/www/html/files'
        ];
        return kbox.engine.run(linkRun);
      })

      // Chown sites directory
      .then(function() {
        var chownDrupal = getAppRunner();
        chownDrupal.opts.entrypoint = 'chown';
        chownDrupal.opts.cmd = [
          '-R',
          [id, group].join(':'),
          '/var/www/html'
        ];
        return kbox.engine.run(chownDrupal);
      })

      // Finish up
      .nodeify(done);

    } else {

      // Made sure to return a promise and respect done callback.
      return kbox.Promise.resolve().nodeify(done);

    }

  });

};
