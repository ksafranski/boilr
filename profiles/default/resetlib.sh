#!/bin/sh
echo "removing ./node_modules"
rm -rf ./node_modules
echo "removing ./src/js/vendor"
rm -rf ./src/js/vendor
echo "running npm install"
npm install