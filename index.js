
'use strict';

module.exports = function(kbox) {

  // Node modules
  var path = require('path');

  // NPM modules
  var _ = require('lodash');

  /*
   * App package location
   */
  var packageData = function() {

    // Return our pkg data
    return {
      dir: path.join(__dirname, 'app')
    };

  };

  // List of viable frameworks
  var frameworks = [
    'backdrop',
    'drupal7',
    'drupal8',
    'wordpress'
  ];

  // Load our events and create modules
  require('./lib/create.js')(kbox, frameworks);
  require('./lib/events.js')(kbox);

  _.forEach(frameworks, function(framework) {
    // Declare our apps to the world
    kbox.create.add(framework, {
      task: {
        name: _.capitalize(framework),
        description: ['Creates a', framework, 'app'].join(' '),
        pkg: packageData()
      }
    });

    // Task to create kalabox apps
    kbox.tasks.add(function(task) {
      kbox.create.buildTask(task, framework);
    });
  });

};
