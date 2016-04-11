#!/usr/bin/env bats

#
# Basic sanity checks for our commands
#

# Load up environment
load ../env

#
# Setup some things
#
setup() {

  # Create a directory to put our test builds
  mkdir -p "$KBOX_APP_DIR"

  # We need to actually go into this app dir until
  # https://github.com/kalabox/kalabox/issues/1221
  # is resolved
  cd $KBOX_APP_DIR/$PHP_WORDPRESS_NAME

  # Version to check
  BOWER_VERSION=1.7
  GIT_VERSION=2.6
  GRUNT_VERSION=0.1
  GULP_VERSION=1.2
  NODE_VERSION=4.4
  NPM_VERSION=2.14
  RSYNC_VERSION=3.1
}

#
# Command sanity checks
#
#  bower            Run a bower command
#  git              Run a git command on your codebase
#  grunt            Run a grunt command
#  gulp             Run a gulp command
#  node             Run a node command
#  npm              Run a npm command
#  rsync            Run a rsync command on your files directory
#  terminal         'ssh' into your appserver
#
@test "Check that '$KBOX bower' returns the correct major version without an error." {
  run $KBOX bower --version
  [ "$status" -eq 0 ]
  [[ $output == *"$BOWER_VERSION"* ]]
}
@test "Check that '$KBOX git' returns the correct major version without an error." {
  run $KBOX git --version
  [ "$status" -eq 0 ]
  [[ $output == *"$GIT_VERSION"* ]]
}
@test "Check that '$KBOX grunt' returns the correct major version without an error." {
  run $KBOX grunt --version
  [ "$status" -eq 0 ]
  [[ $output == *"$GRUNT_VERSION"* ]]
}
@test "Check that '$KBOX gulp' returns the correct major version without an error." {
  run $KBOX gulp --version
  [ "$status" -eq 0 ]
  [[ $output == *"$GULP_VERSION"* ]]
}
@test "Check that '$KBOX node' returns the correct major version without an error." {
  run $KBOX node --version
  [ "$status" -eq 0 ]
  [[ $output == *"$NODE_VERSION"* ]]
}
@test "Check that '$KBOX npm' returns the correct major version without an error." {
  run $KBOX npm --version
  [ "$status" -eq 0 ]
  [[ $output == *"$NPM_VERSION"* ]]
}
@test "Check that '$KBOX rsync' returns the correct major version without an error." {
  run $KBOX rsync --version
  [ "$status" -eq 0 ]
  [[ $output == *"$RSYNC_VERSION"* ]]
}

#
# BURN IT TO THE GROUND!!!!
#
teardown() {
  echo;
  #$KBOX $PHP_WORDPRESS_NAME destroy -- -y
  #rm -rf $KBOX_APP_DIR
}
