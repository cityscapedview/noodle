#!/bin/sh

set -e

rm -rf build/
mkdir -p build/zipped build/bundled

npx parcel build --no-source-maps --dist-dir build/bundled src/index.html

bin/zip.js
