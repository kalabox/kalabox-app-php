v2.1.0-rc.1
===========

* No changes! Bumping for version parity across major projects.

v2.0.1
======

* Updated documentation to better reflect how to use `db` connection info. [#1600](https://github.com/kalabox/kalabox/issues/1600)

v2.0.0
======

* No changes! Bumping for version parity across major projects.

v0.13.0-rc.2
============

* No changes! Bumping for version parity across major projects.

v0.13.0-rc.1
============

* Updated `kbox services` output to be more helpful. [#1551](https://github.com/kalabox/kalabox/issues/1551)

v0.13.0-beta.2
==============

* Rebooted documentation. [#1322](https://github.com/kalabox/kalabox/issues/1322)
* Improved app to better work with new `unison` file sharing. [#1440](https://github.com/kalabox/kalabox/issues/1440)
* Enforce Unix line endings for `bash` scripts. [#1437](https://github.com/kalabox/kalabox/issues/1437)
* Fixed CI so it actually uses our CI code in `sysConfRoot`
* Fixed broken links in main `README.md` and `RTD` index.

v0.13.0-alpha.1
===============

* Upgraded to 0.13.x. [#1409](https://github.com/kalabox/kalabox/issues/1409)
* Refactored app to include connectors previously found in core. [#1223](https://github.com/kalabox/kalabox/issues/1223)
* Improved deployment [#1223](https://github.com/kalabox/kalabox/issues/1223)

v0.12.0-beta1
=============

#### New Features

#### Bug fixes

* Fixed bug where `kbox drush up` was not able to create a backups directory [#1297](https://github.com/kalabox/kalabox/issues/1297)
* Added test to verify that `kbox drush dl` works on Backdrop [#1284](https://github.com/kalabox/kalabox/issues/1284)
* Fixed bug where `kbox drush uli` was returning `http://default` instead of the correct hostname. [#1287](https://github.com/kalabox/kalabox/issues/1287)
* Added tests to verify drush is customizable at `config/drush` [#1298](https://github.com/kalabox/kalabox/issues/1298)

v0.12.0-alpha9
==================

#### Enhancements

* Improved testing framework to minimize Travis noise [#1275](https://github.com/kalabox/kalabox/issues/1275)
* Removed problematic `kbox terminal` command [#1174](https://github.com/kalabox/kalabox/issues/1174)

#### New Features

* Added more Dockerfiles to help extend existing services [#1174](https://github.com/kalabox/kalabox/issues/1174)
* Updated our development process with new contribution guidelines and standards [#1236](https://github.com/kalabox/kalabox/issues/1236)

#### Big fixes

* Fixed testing to use new `cgroup-bin` pkg instead of `cgroup-lite`
