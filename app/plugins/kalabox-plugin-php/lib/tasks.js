'use strict';

module.exports = function(kbox, app) {

  // kbox services
  kbox.tasks.add(function(task) {

    // Task metadata
    task.path = [app.name, 'services'];
    task.category = 'appAction';
    task.description = 'Display connection info for services.';
    task.func = function(done) {

      // Get our services module
      var services = require('./services.js')(kbox, app);

      // Get our services info
      return services.getServicesInfo()

      // And then print it
      .then(function(info) {
        console.log(JSON.stringify(info, null, 2));
      })

      // Finish
      .nodeify(done);

    };
  });

};
