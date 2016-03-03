# Kalabox Drupal App

## Overview

By default Kalabox can create simple Drupal 7/8 apps.

Here are some of the things you can do

```bash

Global commands that can be run from anywhere
  create
      drupal7      Creates a drupal7 app
      drupal8      Creates a drupal8 app
      pantheon     Creates a Pantheon app.
  env              Print Kalabox environmental vars.
  list             Display list of apps.
  update           Run this after you update your Kalabox code.
  version          Display the kbox version.

Actions that can be performed on this app
  config           Display the kbox application's configuration.
  destroy          Completely destroys and removes an app.
  rebuild          Rebuilds your app while maintaining your app data.
  restart          Stop and then start a running kbox application.
  services         Display connection info for services.
  start            Start an installed kbox application.
  stop             Stop a running kbox application.

Commands and tools this app can use
  bower            Run a bower command
  composer         Run a composer cli command
  drush            Run a drush command on your codebase
  git              Run a git command on your codebase
  grunt            Run a grunt command
  gulp             Run a gulp command
  mysql            Drop into a mysql shell
  node             Run a node command
  npm              Run a npm command
  php              Run a php cli command
  rsync            Run a rsync command on your files directory
  terminal         'ssh' into your appserver

Options:
  -h, --help     Display help message.                                 [boolean]
  -v, --verbose  Use verbose output.                                   [boolean]

```

## Creating a Drupal app

```
cd /my/apps/directory

# Create drupal 7 app
kbox create drupal7

# Create drupal 8 app
kbox create drupal8
```

## Options you can use during a create

```
Options:
  -h, --help     Display help message.                                 [boolean]
  -v, --verbose  Use verbose output.                                   [boolean]
  --name         The name of your app.                                  [string]
  --dir          Creates the app in this directory. Defaults to CWD.    [string]
```

## Getting to your Database

To get connection info so you can access your database from an external tool
like SequelPro do the following:

```
cd /path/to/app
kbox services
[
  {
    "name": "appserver",
    "project": "test",
    "url": [
      "http://test.kbox"
    ]
  },
  {
    "name": "db",
    "project": "test",
    "credentials": {
      "database": "drupal",
      "user": "drupal",
      "password": "drupal",
      "host": "10.13.37.100",
      "port": "32836"
    }
  }
]
```

Or to drop into a mysql shell

```
cd /path/to/app
kbox mysql

# Import DB
kbox mysql drupal < /path/to/db.sql
```

## Other Resources

* [Kalabox](http://kalabox.io/)
* [API docs](http://api.kalabox.io/)
* [Test coverage reports](http://coverage.kalabox.io/)
* [Mountain climbing advice](https://www.youtube.com/watch?v=tkBVDh7my9Q)
* [Docker](https://github.com/docker/docker)

-------------------------------------------------------------------------------------
(C) 2016 Kalabox Inc and friends


