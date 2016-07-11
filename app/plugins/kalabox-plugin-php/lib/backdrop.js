
'use strict';

module.exports = function(kbox, app) {

  // Node modules
  var path = require('path');
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
        services: ['appserver'],
        app: app
      }
    };
  };

  /*
   * Drupal post-create setup function
   */
  app.events.on('post-create', function(done) {

    // Construct our extract definition
    var curlRun = getAppRunner();
    curlRun.opts.entrypoint = ['bash', '-c'];
    var backdropUrl = 'https://github.com/backdrop/backdrop/archive/' +
      '${BACKDROP_VERSION}.tar.gz';
    curlRun.opts.cmd = [
      'curl',
      '-fSL',
      backdropUrl,
      '-o',
      'backdrop.tar.gz'
    ];
    // Grab our backdrop project
    return kbox.engine.run(curlRun)

    // Verify MD5 hash
    .then(function() {
      var md5Verify = getAppRunner();
      md5Verify.opts.entrypoint = 'echo';
      md5Verify.opts.cmd = [
        '"${BACKDROP_MD5} *backdrop.tar.gz"',
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

    // chmod sites directory
    .then(function() {
      var chownDrupal = getAppRunner();
      chownDrupal.opts.entrypoint = 'chmod';
      chownDrupal.opts.cmd = [
        '755',
        '-Rv',
        '/var/www/html'
      ];
      return kbox.engine.run(chownDrupal);
    })

    // Finish up
    .nodeify(done);

  });

  /*
   * Add drupal specific CLI containers
   */
  app.events.on('post-app-load', function(app) {

    // Add backdrop cli containers
    var backComp = path.resolve(__dirname, '..', 'cli', 'backdrop-compose.yml');
    app.composeCore.push(backComp);

    // Add backdrop specific tasks
    var backCli = path.resolve(__dirname, '..', 'cli', 'backdrop-cli.yml');
    app.taskFiles.push(backCli);

  });

};
