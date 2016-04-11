#!/usr/bin/env bats

#
# Basic tests to verify basic Drupal 8 app actions
#

# Load up environment
load ../env

#
# Setup some things
#
setup() {
  # Create a directory to put our test builds
  mkdir -p "$KBOX_APP_DIR"
}

#
# Basic non-interactive action verification
#
#   config           Display the kbox application's configuration.
#   restart          Stop and then start a running kbox application.
#   services         Display connection info for services.
#   start            Start an installed kbox application.
#   stop             Stop a running kbox application.
#
@test "Check that we can run '$KBOX config' without an error." {
  $KBOX $PHP_DRUPAL8_NAME config
}
@test "Check that we can run '$KBOX stop' without an error." {
  $KBOX $PHP_DRUPAL8_NAME stop
}
@test "Check that we can run '$KBOX start' without an error." {
  $KBOX $PHP_DRUPAL8_NAME start
}
@test "Check that we can run '$KBOX restart' without an error." {
  $KBOX $PHP_DRUPAL8_NAME restart
}
@test "Check that we can run '$KBOX services' without an error." {
  $KBOX $PHP_DRUPAL8_NAME services
}

#
# Do a deeper dive on some commands
#
#    restart          Stop and then start a running kbox application.
#
# Verify DNS
#
@test "Check that after '$KBOX restart' DNS is set correctly." {
  run \
  $KBOX $PHP_DRUPAL8_NAME restart && \
  $DOCKER exec kalabox_proxy_1 redis-cli -p 8160 lrange frontend:http://${PHP_DRUPAL8_NAME}.kbox 0 5 | grep 10.13.37.100
  [ "$status" -eq 0 ]
}

#
# BURN IT TO THE GROUND!!!!
#
teardown() {
  echo;
  #$KBOX $PHP_DRUPAL8_NAME destroy -- -y
  #rm -rf $KBOX_APP_DIR
}
