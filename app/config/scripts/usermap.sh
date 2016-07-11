#!/bin/bash
set -e

# Set defaults
: ${KALABOX_UID:='1000'}
: ${KALABOX_GID:='50'}

# Move any config over and git correct perms
chown -Rf $KALABOX_UID:$KALABOX_GID $HOME

# Add local user to match host
addgroup --force-badname --gecos "" "$KALABOX_GID" > /dev/null || true
adduser --force-badname --quiet --gecos "" --disabled-password --home $HOME --gid "$KALABOX_GID" "$KALABOX_UID" > /dev/null

# Run the command
echo "$KALABOX_UID ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
su -s "/bin/bash" -m -c "$(echo $@)" "$KALABOX_UID"
