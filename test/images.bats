#!/usr/bin/env bats

#
# Tests to build/pull the docker images we ship with this app
#

# Load up environment
load env

# Location of our dockerfiles
# PHP_DOCKERFILES_DIR=${TRAVIS_BUILD_DIR}/app/dockerfiles/

# Map pull services to repo/image:tag names
#
# @todo: eventually we want to build these instead
#
# See: https://github.com/kalabox/kalabox/issues/1174
#
PHP_DATA="busybox"
PHP_DB="mysql"

PHP_DRUPAL7_APPSERVER="drupal:7"
PHP_DRUPAL8_APPSERVER="drupal:8"
PHP_BACKDROP_APPSERVER="backdrop/backdrop:1"
PHP_WORDPRESS_APPSERVER="wordpress:4"

PHP_CLI="kalabox/cli:stable"
PHP_DRUPAL_DRUSH="drush/drush:8"
PHP_BACKDROP_DRUSH="drush/drush:backdrop"

# Check that we can pull the $PHP_DATA image without an error.
@test "Check that we can pull the busybox image without an error." {
  run $DOCKER pull $PHP_DATA
  [ "$status" -eq 0 ]
}

# Check that we can pull the $PHP_DB image without an error.
@test "Check that we can pull the db image without an error." {
  run $DOCKER pull $PHP_DB
  [ "$status" -eq 0 ]
}

# Check that we can pull the $PHP_DRUPAL7_APPSERVER image without an error.
@test "Check that we can pull the d7 appserver image without an error." {
  run $DOCKER pull $PHP_DRUPAL7_APPSERVER
  [ "$status" -eq 0 ]
}

# Check that we can pull the $PHP_DRUPAL8_APPSERVER image without an error.
@test "Check that we can pull the d8 appserver image without an error." {
  run $DOCKER pull $PHP_DRUPAL8_APPSERVER
  [ "$status" -eq 0 ]
}

# Check that we can pull the $PHP_BACKDROP_APPSERVER image without an error.
@test "Check that we can pull the backdrop appserver image without an error." {
  run $DOCKER pull $PHP_BACKDROP_APPSERVER
  [ "$status" -eq 0 ]
}

# Check that we can pull the $PHP_WORDPRESS_APPSERVER image without an error.
@test "Check that we can pull the wordpress appserver image without an error." {
  run $DOCKER pull $PHP_WORDPRESS_APPSERVER
  [ "$status" -eq 0 ]
}

# Check that we can pull the $PHP_DRUPAL_DRUSH image without an error.
@test "Check that we can pull the drupal drush image without an error." {
  run $DOCKER pull $PHP_DRUPAL_DRUSH
  [ "$status" -eq 0 ]
}

# Check that we can pull the $PHP_BACKDROP_DRUSH image without an error.
@test "Check that we can pull the backdrop drush image without an error." {
  run $DOCKER pull $PHP_BACKDROP_DRUSH
  [ "$status" -eq 0 ]
}
