#!/usr/bin/env bats

#
# Basic tests to verify drush things
#

# Load up environment
load env

#
# Setup some things
#
setup() {

  # Create a directory to put our test builds
  mkdir -p "$KBOX_APP_DIR"

  # We need to actually go into this app dir until
  # https://github.com/kalabox/kalabox/issues/1221
  # is resolved
  if [ -d "$KBOX_APP_DIR/$PHP_BACKDROP_NAME" ]; then
    cd $KBOX_APP_DIR/$PHP_BACKDROP_NAME
  fi

}

#
# Create a Backdrop Site for our purposes
#

#
#  Create a backdrop site
#
@test "Create a Backdrop site without an error." {

  # Check to see if our site exists already
  BACKDROP_SITE_EXISTS=$("$KBOX" list | grep "$PHP_BACKDROP_NAME" > /dev/null && echo $? || true)

  # Run the create command if our site doesn't already exist
  if [ ! $BACKDROP_SITE_EXISTS ]; then

    # Create a backdrop site
    run $KBOX create backdrop \
      -- \
      --name $PHP_BACKDROP_NAME \
      --dir $KBOX_APP_DIR \
      --from $TRAVIS_BUILD_DIR/app

    # Check status code
    [ "$status" -eq 0 ]

  # We already have what we need so lets skip
  else
    skip "Looks like we already have a Backdrop site ready to go!"
  fi

}

#
# Do the site install
#
@test "Install our Backdrop site." {

  # Skip until resolution of
  # https://github.com/backdrop-contrib/drush/issues/34
  skip ("Skip until we have https://github.com/backdrop-contrib/drush/issues/34")

  # Install a Backdrop site
  run $KBOX drush si --db-url=mysql://root@database/backdrop -y
  [ "$status" -eq 0 ]
  [[ $output == *"Installation complete"* ]]

}

#
# Backdrush command checks
#

##
#
# Make sure we can run `drush dl`
#
# See: https://github.com/kalabox/kalabox/issues/1284
#
#
@test "kbox drush dl should work" {

  # Skip until resolution of
  # https://github.com/backdrop-contrib/drush/issues/34
  skip ("Skip until we have https://github.com/backdrop-contrib/drush/issues/34")

  # Install a Drupal 7 site
  run $KBOX drush dl webform -y
  [ "$status" -eq 0 ]
  [[ $output != *"[error]"* ]]

}

#
# BURN IT TO THE GROUND!!!!
#
teardown() {
  sleep 1
}
