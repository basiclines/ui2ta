#!/bin/bash

# -------------------------------------------------------
# Usage:
# cd build/
# ./update.sh ( downloads latest versions of shared/style & shared/style_unstable Gaia folders )
# This process may take  time as it has to fetch the whole Gaia repo
# -------------------------------------------------------

TMP_FETCH=.tmp_fetch
GAIA=https://github.com/mozilla-b2g/gaia.git

# Fetch
git fetch GAIA master

# Read desired dirs
git read-tree --prefix=$TMP_FETCH/style/ -u GAIA/master:shared/style
git read-tree --prefix=$TMP_FETCH/style_unstable/ -u GAIA/master:shared/style_unstable

# update
git pull -s subtree GAIA master

# Set working dir
cd ../

# Remove old copies
rm -rf shared/style_unstable
rm -rf shared/style

# Move to desired locations
git mv $TMP_FETCH/style_unstable shared/
git mv $TMP_FETCH/style shared/

# Clean
rm -rf $TMP_FETCH/

git add -u shared/
git commit -m "Updated latest shared/style folders"
