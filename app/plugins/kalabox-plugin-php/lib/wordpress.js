
'use strict';

module.exports = function(kbox, app) {

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
   * Wordpress post-create setup function
   */
  app.events.on('post-create', function(done) {

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
