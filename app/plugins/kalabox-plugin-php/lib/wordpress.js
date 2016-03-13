
'use strict';

module.exports = function(kbox, app) {

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
   * Wordpress post-create setup function
   */
  kbox.core.events.on('post-create-app', function(app, done) {

    // Chown wp directory
    var chownDrupal = getAppRunner();
    chownDrupal.opts.entrypoint = 'chown';
    chownDrupal.opts.cmd = [
      '-R',
      [id, group].join(':'),
      '/usr/src/wordpress'
    ];
    return kbox.engine.run(chownDrupal)

    // Finish up
    .nodeify(done);

  });

};
