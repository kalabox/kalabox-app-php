Kalabox CLI for PHP Apps
========================

"PHP on Kalabox" adds and extends a number of commands beyond the [core command set](http://docs.kalabox.io/en/stable/users/cli/). With the exception of `kbox create` commands, all of these commands must be run from inside of an existing Pantheon site.

If you are not already familiar with the basic Kalabox commands or how the Kalabox CLI works in general please take some time to [read about it](http://docs.kalabox.io/en/stable/users/cli).

create drupal7
--------------

Creates a vanilla Drupal 7 site.

`kbox create drupal7`

```
Options:
  -h, --help     Display help message.                                      [boolean]
  -v, --verbose  Use verbose output.                                        [boolean]
  --debug        Use debug output.                                          [boolean]
  --name         The name of your app.                                      [string]
  --dir          Creates the app in this directory. Defaults to CWD.        [string]
  --from         Local path to override app skeleton (be careful with this) [string]

```

```bash
# Creates a drupal7 site with interactive prompts
kbox create drupal7

# Completely non-interactively create a drupal7 site
kbox create drupal7 -- --name=mydrupalsite

# Create a site but specify an alternate directory to create it in
kbox create drupal7 -- --dir=~/test/testapp
```

!!! danger "Must run `create` from your `USERS` directory"
    Because of a file sharing restriction placed on us by [Boot2Docker](http://github.com/boot2docker/boot2docker) you **must** create your app inside of the `USERS` directory for your OS. Those directories are...

      * **OSX** - `/Users`
      * **Linux** - `/home`
      * **Windows** - `C:\Users`

create drupal8
--------------

Creates a vanilla Drupal 8 site.

`kbox create drupal8`

```
Options:
  -h, --help     Display help message.                                      [boolean]
  -v, --verbose  Use verbose output.                                        [boolean]
  --debug        Use debug output.                                          [boolean]
  --name         The name of your app.                                      [string]
  --dir          Creates the app in this directory. Defaults to CWD.        [string]
  --from         Local path to override app skeleton (be careful with this) [string]

```

```bash
# Creates a drupal8 site with interactive prompts
kbox create drupal8

# Completely non-interactively create a drupal8 site
kbox create drupal8 -- --name=mydrupalsite

# Create a site but specify an alternate directory to create it in
kbox create drupal8 -- --dir=~/test/testapp
```

!!! danger "Must run `create` from your `USERS` directory"
    Because of a file sharing restriction placed on us by [Boot2Docker](http://github.com/boot2docker/boot2docker) you **must** create your app inside of the `USERS` directory for your OS. Those directories are...

      * **OSX** - `/Users`
      * **Linux** - `/home`
      * **Windows** - `C:\Users`

create backdrop
---------------

Creates a vanilla Backdrop site.

`kbox create backdrop`

```
Options:
  -h, --help     Display help message.                                      [boolean]
  -v, --verbose  Use verbose output.                                        [boolean]
  --debug        Use debug output.                                          [boolean]
  --name         The name of your app.                                      [string]
  --dir          Creates the app in this directory. Defaults to CWD.        [string]
  --from         Local path to override app skeleton (be careful with this) [string]

```

```bash
# Creates a backdrop site with interactive prompts
kbox create backdrop

# Completely non-interactively create a backdrop site
kbox create backdrop -- --name=mybackdropsite

# Create a site but specify an alternate directory to create it in
kbox create backdrop -- --dir=~/test/testapp
```

!!! danger "Must run `create` from your `USERS` directory"
    Because of a file sharing restriction placed on us by [Boot2Docker](http://github.com/boot2docker/boot2docker) you **must** create your app inside of the `USERS` directory for your OS. Those directories are...

      * **OSX** - `/Users`
      * **Linux** - `/home`
      * **Windows** - `C:\Users`

create wordpress
----------------

Creates a vanilla WordPress site.

`kbox create wordpress`

```
Options:
  -h, --help     Display help message.                                      [boolean]
  -v, --verbose  Use verbose output.                                        [boolean]
  --debug        Use debug output.                                          [boolean]
  --name         The name of your app.                                      [string]
  --dir          Creates the app in this directory. Defaults to CWD.        [string]
  --from         Local path to override app skeleton (be careful with this) [string]

```

```bash
# Creates a wordpress site with interactive prompts
kbox create wordpress

# Completely non-interactively create a wordpress site
kbox create wordpress -- --name=mywordpresssite

# Create a site but specify an alternate directory to create it in
kbox create wordpress -- --dir=~/test/testapp
```

!!! danger "Must run `create` from your `USERS` directory"
    Because of a file sharing restriction placed on us by [Boot2Docker](http://github.com/boot2docker/boot2docker) you **must** create your app inside of the `USERS` directory for your OS. Those directories are...

      * **OSX** - `/Users`
      * **Linux** - `/home`
      * **Windows** - `C:\Users`

rebuild
-------

Completely rebuilds your PHP site. This command is identical to the [core rebuild command](http://docs.kalabox.io/en/stable/users/cli/#rebuild) except that it is slightly extended here so that the rebuild preserves your applications data.

`kbox rebuild`

```bash
Options:
  -h, --help     Display help message.                                 [boolean]
  -v, --verbose  Use verbose output.                                   [boolean]
  --debug        Use debug output.                                     [boolean]
```

```bash
# Rebuild my app with verbose mode on so I can see WTF is happening!
kbox rebuild -- -v
```

services
--------

Displays relevant connection information for your PHP services. You can use this information to connect to your database from an external DB client like [SQLPro](http://www.sequelpro.com/) or to enter correct DB credentials during the setup of PHP sites.

`kbox services`

```
Options:
  -h, --help     Display help message.                                 [boolean]
  -v, --verbose  Use verbose output.                                   [boolean]
  --debug        Use debug output.                                     [boolean]
```

```
# Get external db connection info for SequelPro or other sqlClient
kbox services
[
  {
    "name": "appserver",
    "project": "date",
    "url": [
      "http://date.kbox"
    ]
  },
  {
    "name": "db",
    "project": "date",
    # Use these settings for external connections
    "external_connection_info": {
      "database": "drupal",
      "user": "drupal",
      "password": "drupal",
      "host": "date.kbox",
      "port": "32768"
    },
    # Ignore these settings for external connections
    "internal_connection_info": {
      "database": "drupal",
      "user": "drupal",
      "password": "drupal",
      "host": "database",
      "port": 3306
    }
  },
  {
    "name": "unison",
    "project": "date"
  }
]

# Get internal db connection info for settings up a drupal, backdrop or wordpress site
kbox services
[
  {
    "name": "appserver",
    "project": "date",
    "url": [
      "http://date.kbox"
    ]
  },
  {
    "name": "db",
    "project": "date",
    # Do not use these settings for internal connections
    "external_connection_info": {
      "database": "drupal",
      "user": "drupal",
      "password": "drupal",
      "host": "date.kbox",
      "port": "32768"
    },
    # use these settings for internal connections
    "internal_connection_info": {
      "database": "drupal",
      "user": "drupal",
      "password": "drupal",
      "host": "database",
      "port": 3306
    }
  },
  {
    "name": "unison",
    "project": "date"
  }
]
```
