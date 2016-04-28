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

# Check that we can build the busybox image without an error.
@test "Check that we can build the data image without an error." {
  run kbox-retry-build busybox latest $PHP_DOCKERFILES_DIR/data
  [ "$status" -eq 0 ]
}

# Check that we can build the db image without an error.
@test "Check that we can build the db image without an error." {
  run kbox-retry-build mysql latest $PHP_DOCKERFILES_DIR/db
  [ "$status" -eq 0 ]
}

# Check that we can build the cli image without an error.
@test "Check that we can build the cli image without an error." {
  run kbox-retry-build kalabox/cli stable $PHP_DOCKERFILES_DIR/cli
  [ "$status" -eq 0 ]
}

# Check that we can build the drupal7 image without an error.
@test "Check that we can build the d7 appserver image without an error." {
  run kbox-retry-build drupal 7 $PHP_DOCKERFILES_DIR/drupal7
  [ "$status" -eq 0 ]
}

# Check that we can build the drupal8 image without an error.
@test "Check that we can build the d8 appserver image without an error." {
  run kbox-retry-build drupal 8 $PHP_DOCKERFILES_DIR/drupal8
  [ "$status" -eq 0 ]
}

# Check that we can build the backdrop image without an error.
@test "Check that we can build the backdrop appserver image without an error." {
  run kbox-retry-build backdrop 1 $PHP_DOCKERFILES_DIR/backdrop1
  [ "$status" -eq 0 ]
}

# Check that we can build the wordpress image without an error.
@test "Check that we can build the wordpresss appserver image without an error." {
  run kbox-retry-build wordpress 4 $PHP_DOCKERFILES_DIR/wordpress4
  [ "$status" -eq 0 ]
}

# Check that we can build the drush image without an error.
@test "Check that we can build the drush image without an error." {
  run kbox-retry-build drush/drush 8 $PHP_DOCKERFILES_DIR/drush
  [ "$status" -eq 0 ]
}

# Check that we can build the backdrush image without an error.
@test "Check that we can build the backdrush image without an error." {
  run kbox-retry-build drush/drush backdrop $PHP_DOCKERFILES_DIR/backdrush
  [ "$status" -eq 0 ]
}

#
# BURN IT TO THE GROUND!!!!
# Add a small delay before we run other things
#
teardown() {
  sleep 1
}
