
'use strict';

module.exports = function(kbox, app) {

  // Node modules
  var path = require('path');
  var id = kbox.core.deps.get('globalConfig').engineId;
  var group = kbox.core.deps.get('globalConfig').engineGroup;

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
        [id, group].join(':'),
        '/var/www/html'
      ];
      return kbox.engine.run(chownDrupal);
    })

    // Symlink to media
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

    // Finish up
    .nodeify(done);

  });

  /*
   * Add drupal specific CLI containers
   */
  kbox.core.events.on('cli-add-composefiles', function(composeFiles, done) {

    // Add drupal cli containers
    var drupalComp = path.resolve(__dirname, '..', 'cli', 'drupal-compose.yml');
    composeFiles.push(drupalComp);

    // Finish up
    done();

  });

  /*
   * Add drupal specific CLI tasks
   */
  kbox.core.events.on('cli-add-taskfiles', function(taskFiles, done) {

    // Add drupal specific tasks
    var drupalCli = path.resolve(__dirname, '..', 'cli', 'drupal-cli.yml');
    taskFiles.push(drupalCli);

    // Finish up
    done();

  });

};
