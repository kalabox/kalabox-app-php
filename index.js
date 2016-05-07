
'use strict';

module.exports = function(kbox) {

  // Node modules
  var path = require('path');

  // NPM modules
  var _ = require('lodash');

  /*
   * App package location.
   * NOTE: if in dev mode and not in a binary this should be internal. Internal
   * locations are relative to the node_modules folder
   * All
   * other modes should be an URL to an archive and then the path location of the app
   * relative to the archive root
   */
  var packageData = function() {

    // Get relevant config options
    var version = require(path.join(__dirname, 'package.json')).version;
    var locked = kbox.core.deps.get('globalConfig').locked;

    // Define our download versions
    var devUrl = 'http://apps.kalabox.io/kalabox-app-php-latest.tar.gz';
    var prodUrl = [
      'https://github.com',
      'kalabox/kalabox-app-php/releases/download',
      'v' + version,
      'kalabox-app-php-' + version + '.tar.gz'
    ];

    // Return our pkg data
    return {
      url: (locked) ? prodUrl.join('/') : devUrl
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
