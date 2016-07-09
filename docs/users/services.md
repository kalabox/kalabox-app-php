Services
========

Each PHP app runs a number of services (each in their own Docker container) to approximate the Pantheon environment.

If you are not already familiar with the basics of how Kalabox Apps work please take some time to [read about it](http://docs.kalabox.io/en/stable/users/started).

appserver
---------

The `appserver` service depends on the framework you've selected. Here is a breakdown of the different appservers we provide.

 * **Drupal 7** - [php 5.6 with apache](https://github.com/docker-library/drupal/tree/master/7/apache)
 * **Drupal 8** - [php 7 with apache](https://github.com/docker-library/drupal/tree/master/8/apache)
 * **Backdrop** - [php 5.6 with apache](https://github.com/backdrop-ops/backdrop-docker/tree/master/1/apache)
 * **WordPress** - [php 5.6 with apache](https://github.com/docker-library/wordpress/tree/master/apache)

The service is responsible for processing `php` files and serving the result to the user.

### Extensions

We provide the minimal extensions required to run each PHP framework. Please consult with the docs for each framework for a list of the extensions required. That list should hopefully match up wth:

  * curl
  * gd
  * mbstring **(not on WordPress)**
  * mcrypt
  * mysqli **(WordPress only)**
  * pdo **(not on WordPress)**
  * pdo_mysql **(not on WordPress)**
  * pdo_pgsql **(not on WordPress)**
  * Zend OPcache **(Not on Drupal 7 or Backdrop)**
  * zip **(not on WordPress)**

### Accessing your site

You should be able to access your PHP site at:

  * `http://MYAPP.kbox`

data
----

The `data` service runs a [busybox](https://github.com/docker-library/busybox) container and exists so that valuable application data can persist between rebuilds and be shared amongst other containers.

The volumes of this container are shared with all the other containers which means that every container will have the following directories:

```bash
|-- /var/www/html   Contains the PHP frameworks applicaton codebase
|-- /media          Contains your applications files, ie `sites/default/files` for Drupal 7
|-- /var/lib/mysql  Contains the `mysql` database
```
* The `/media` directory should be synced to the `files` directory inside of your local app.

!!! note "Data service shows as not running"
    Data containers always show up as not running when inspected with Docker.

db
--

The `db` service runs a the latest official [mysql](https://github.com/docker-library/mysql/tree/master/5.7) container. This service stores your applications `sql` data.

### Accessing your database

You can access your database from an external or internal service by using the `kbox services` command. Please review the [services command](./cli/#services) to find out more.
