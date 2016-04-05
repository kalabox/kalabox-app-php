
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
        services: ['appserver']
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

  });

  /*
   * Add drupal specific CLI containers
   */
  kbox.core.events.on('cli-add-composefiles', function(composeFiles, done) {

    // Add drupal cli containers
    var backComp = path.resolve(__dirname, '..', 'cli', 'backdrop-compose.yml');
    composeFiles.push(backComp);

    // Finish up
    done();

  });

  /*
   * Add drupal specific CLI tasks
   */
  kbox.core.events.on('cli-add-taskfiles', function(taskFiles, done) {

    // Add drupal specific tasks
    var backCli = path.resolve(__dirname, '..', 'cli', 'backdrop-cli.yml');
    taskFiles.push(backCli);

    // Finish up
    done();

  });

};
