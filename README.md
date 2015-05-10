# Kalabox Drupal App

## Overview

By default Kalabox can create Drupal 6/7/8 apps. They are relatively optimized for Drupal with a multi-version php appserver and mariadb both running in separate containers.

Our default Drupal app has some nice config for APC (php 5.3 && php 5.4), OPCache (php 5.5), xdebug and other tools. It also ships with git, drush, rsync and some environmental plugins so you can:

* Run drush, git and rsync commands (with ssh key forwarding) right on your app. 
* Specify the php version you want your app to use.

## Creating a Drupal app

_If you want to add your $conf information to your pressflow / kalabox.json settings add them prior to running the commands below, otherwise you will need to run kbox rebuild on your app_

```
cd /dir/i/want/my/app/to/live (usually ~/kalabox/apps)
kbox create drupal -- --name="My App" -is
Select your version of Drupal
Select your version of PHP (defaults to what is standard for picked Drupal Version)
Enter your GIT name / email
cd my-app
```

## Importing your Drupal site or app into Kalabox

Eventually we will have easy commands so the robots do this for you but until now you can follow the manual import method:

### Import your code **(required)**

The easiest way to do this is with the git plugin but you can also directly extract an archive into your `code` directory.

#### Git

```
cd my-app
kbox git clone https://your.git.path/repo.git ./
```

If you are adding a large amount of code you might want to check on the status of syncthing over at `10.13.37.42:60008`

#### Ye Olde Tyme DL

1. Download an archive of [drupal](https://www.drupal.org/project/drupal) or your site 
2. Extract the contents of the archive into `my-app/code`.

## Getting to your Database

This app will start with a database called `kalabox` and user `kalabox` with no password.

If you are importing a site and want to directly access the database you will need to find the outside port to use. You can do this by running `kbox containers`.

```json
{
  "id": "f6d4cf60f1bbd8623806b9d15ef646d4812cab6331e0015e5e034d858b02f307",
  "name": "kb_drupal_db",
  "app": "drupal",
  "ports": [
    "3306/tcp=>32785"
  ],
  "running": true
}
{
  "id": "7c8abbd6721af984e1f2bd71d212516406f77bf3f2e1481b0420235bb78614f3",
  "name": "kb_drupal_appserver",
  "app": "drupal",
  "ports": [
    "443/tcp=>32783",
    "80/tcp=>32784"
  ],
  "running": true
}
```

With this you can access your database from the outside with

```
host: drupal.kbox
user: kalabox
password:
database: kalabox
port: 32785
```

You can import the DB via the CLI like this (when you have a local copy of said DB as well):
Make sure that you run kbox containers prior to this to get the port number as they change.

```
mysql -u kalabox -h example.kbox -P 32785 kalabox < ~/path/to/db.sql
```

If you are importing an especially large DB you may want to consider doing something like this
instead

```
gunzip < ~/path/to/db.sql | mysql -u kalabox -h example.kbox -P 32785 kalabox
```

_You could also use your favorite mysql client like SQLPro._

### Import your files (optional)

The easiest way to do this right now is with the `rsync` plugin. Here is how you would get files from Pantheon.

```
# Download Drupal files directory from pantheon
export ENV=dev
# Usually dev, test, or live
export SITE=[YOUR SITE UUID]
# Site UUID from dashboard URL: https://dashboard.pantheon.io/sites/<UUID>

# To Download
cd my-app
kbox rsync -rlvz --size-only --ipv4 --progress -e 'ssh -p 2222' $ENV.$SITE@appserver.$ENV.$SITE.drush.in:files/ files
```

### FIN!

Now visit `http://drupal.kbox` in your browser. To add or edit code to your project you should now have a directory at called `code` inside of your app directory. 

## Drupal plugins

Drupal ships with five basic plugins.

1. [DB Environment](https://github.com/kalabox/kalabox-plugin-dbenv)
2. [Git](https://github.com/kalabox/kalabox-plugin-git)
3. [Drush](https://github.com/kalabox/kalabox-plugin-drush)
4. [Rsync](https://github.com/kalabox/kalabox-plugin-rsync)
5. [php](https://github.com/kalabox/kalabox-plugin-php)

Please read about each to see the fun config options they have!

## Debugging

xdebug is set up on your php appserver. Here is an example SublimeText 2 config.
You may need to launch it in the browser the first time.

```json
{
  "folders":
  [
    {
      "path": "/local/path/to/my/code"
    }
  ],
  "settings":
  {
    "xdebug":
    {
      "max_children": 32,
      "max_depth": 16,
      "pretty_output": true,
      "path_mapping":
      {
        "/code/": "/local/path/to/my/code/"
      },
      "port": 9000,
      "url": "http://mysite.kbox/"
    }
  }
}
```

## Other Resources

* [API docs](http://api.kalabox.me/)
* [Test coverage reports](http://coverage.kalabox.me/)
* [Kalabox CI dash](http://ci.kalabox.me/)
* [Mountain climbing advice](https://www.youtube.com/watch?v=tkBVDh7my9Q)
* [Boot2Docker](https://github.com/boot2docker/boot2docker)
* [Syncthing](https://github.com/syncthing/syncthing)
* [Docker](https://github.com/docker/docker)

-------------------------------------------------------------------------------------
(C) 2015 Kalamuna and friends


