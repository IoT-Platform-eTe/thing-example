#!/usr/bin/env bash
# stop script on error
set -e

# run pub/sub sample app using certificates downloaded in package
printf "\nRunning device sample application...\n"
node main.js
