Development Tools
=================

Each PHP app you create also comes with a number of development tools you can use. Remember that these development tools run inside of their own containers so the experience will be slightly different than running the same tools natively. Please see the documentation below for some the differences for each command.

If you are interested in read more about how this all works, check out the core Kalabox docs on [tooling](http://docs.kalabox.io/en/stable/users/config/#tooling).

General considerations
----------------------

Here are a couple of small things to take into consideration for all your commands.

  * Your entire app directory is mounted inside each container at `/src`
  * Your entire `HOME` directory is mounted inside each container at `/user`

Here are a few examples of how these can be used:

```bash
# Export your database with drush to a files called dump.sql in your app root
kbox drush sql-dump --result-file=/src/test.sql

# Use an alternate SSH key with rsync
kbox rsync -Pav -e 'ssh -i /user/.ssh/mykey.rsa' username@hostname:/from/dir/ /to/dir/
```

bower
-----

Runs [bower](https://bower.io/) commands.

```bash
# Install bower packages
kbox bower install

# Get the bower version
kbox bower --version
```

composer
--------

Runs [composer](https://getcomposer.org/doc/) commands.

`kbox composer`

```bash
# Install dependencies with composer
kbox composer install

# Get the composer version
kbox composer --version
```

drush
-----

Runs [drush](http://www.drush.org/en/master/) commands.

  * We user either Drush 8 or Drush for Backdrop
  * The `config/drush` directory in your app will map to `~/.drush` inside the container.
  * You can add custom command files or aliases in `config/drush`.
  * There is a `drushrc.php` you can configure in `config/drush`.

`kbox drush`

```bash
# Get the status of your drupal site
kbox drush status

# See all my Pantheon and custom aliases
kbox drush sa

# Download views
kbox drush dl views -y

# Get the drush version
kbox drush --version
```

git
---

Runs [git](https://git-scm.com/documentation) commands.

`kbox git`

```bash
# Check the status of my git repo
kbox git status

# Stage all changes
kbox git add --all

# Commit all changes
kbox git commit -m "My amazing commit"

# Push master branch changes to some remote called origin
kbox git push origin master

# Get the git version
kbox git --version
```

!!! note "Can I use my normal git?"
    We only **officially** support using `kbox git` but you may find it faster and more convenient to run your own local `git`.

grunt
-----

Runs [grunt](http://gruntjs.com/getting-started) commands.

`kbox grunt`

```bash
# Run a grunt task called "grunt harder"
kbox grunt harder

# Get the grunt version
kbox grunt --version
```

gulp
----

Runs [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) commands.

`kbox gulp`

```bash
# Run a gulp task called "gulp quietly"
kbox gulp quietly

# Get the gulp version
kbox gulp --version
```

mysql
-----
**Not Available on WordPress apps**

Drops you into a [mysql](http://dev.mysql.com/doc/refman/5.7/en/mysql-commands.html) shell.

  * This command actually runs against the `drush` container.
  * By default we run commands as the `root` mysql user and against your application database.

`kbox mysql`

```bash
# Drop into a mysql shell
kbox mysql

# Get the mysql version
kbox mysql --version
```

node
----

Runs [node](https://nodejs.org/api/repl.html) commands.

  * We use node 4+

`kbox node`

```bash
# Run an arbitrary node script located locally at `~/myscript.js`
kbox node /src/myscript.js

# Get the node version
kbox node --version
```

npm
---

Runs [npm](https://docs.npmjs.com/) commands.

`kbox npm`

```bash
# Install dependencies
kbox npm install

# Get the npm version
kbox npm --version
```

php
---

Runs [php](http://php.net/manual/en/features.commandline.php) commands.

`kbox php`

```bash
# Print out a list of enabled php modules
kbox php -m

# Run an arbitrary php script located in your code root
# We assume you are actually in your code root for this
kbox php hamsterdance.php

# Get the php version
kbox php --version
```

rsync
-----

Runs [rysnc](http://linux.die.net/man/1/rsync) commands on your files directory.

  * This command always runs relative to your `files` directory.

`kbox rsync`

```bash
# Get the rsync version
kbox rsync --version

# Sync down pantheon files manually
kbox rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' dev.3ef6264e-51d9-43b9-a60b-6cc22c3129308as83@appserver.dev.3ef6264e-51d9-43b9-a60b-6cc22c3129308as83.drush.in:code/sites/default/files/ /media
```
