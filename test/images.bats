#!/usr/bin/env bats

#
# Tests to build/pull the docker images we ship with this app
#

# Load up environment
load env

#
# Setup some things
#
setup() {
  echo
}

#
# Function to rety docker builds if they fail
#
kbox-retry-build() {

  # Get args
  IMAGE=$1
  TAG=$2
  DOCKERFILE=$3

  # Try a few times
  NEXT_WAIT_TIME=0
  until $DOCKER build -t $IMAGE:$TAG $DOCKERFILE || [ $NEXT_WAIT_TIME -eq 5 ]; do
    sleep $(( NEXT_WAIT_TIME++ ))
  done

  # If our final try has been met we assume failure
  #
  # @todo: this can be better since this could false negative
  #        on the final retry
  #
  if [ $NEXT_WAIT_TIME -eq 5 ]; then
    exit 666
  fi

}

#
# Map pull services to repo/image:tag names
#
# @todo: eventually we want to build these instead
#
# See: https://github.com/kalabox/kalabox/issues/1174
#

PHP_DRUPAL7_APPSERVER="drupal:7"
PHP_DRUPAL8_APPSERVER="drupal:8"
PHP_BACKDROP_APPSERVER="backdrop:1"
PHP_WORDPRESS_APPSERVER="wordpress:4"
PHP_DRUPAL_DRUSH="drush/drush:8"
PHP_BACKDROP_DRUSH="drush/drush:backdrop"

# Check that we can build the busybox image without an error.
@test "Check that we can pull the data image without an error." {
  run kbox-retry-build busybox latest $PHP_DOCKERFILES_DIR/data
  [ "$status" -eq 0 ]
}

# Check that we can pull the db image without an error.
@test "Check that we can pull the db image without an error." {
  run kbox-retry-build mysql latest $PHP_DOCKERFILES_DIR/db
  [ "$status" -eq 0 ]
}

# Check that we can build the cli image without an error.
@test "Check that we can build the cli image without an error." {
  IMAGE=cli
  run kbox-retry-build kalabox/$IMAGE stable $PANTHEON_DOCKERFILES_DIR/$IMAGE
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

#
# BURN IT TO THE GROUND!!!!
# Add a small delay before we run other things
#
teardown() {
  sleep 1
}
