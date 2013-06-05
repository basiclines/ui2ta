#!/bin/bash

# -------------------------------------------------------
# Usage:
# cd build/
# ./update.sh ( downloads latest versions of shared/style & shared/style_unstable Gaia folders )
# -------------------------------------------------------

TMP_FETCH=.tmp_fetch

# Fetch
git remote add -f gaia https://github.com/mozilla-b2g/gaia.git master

# Read desired dirs
git read-tree --prefix=$TMP_FETCH/style/ -u gaia/master:shared/style
git read-tree --prefix=$TMP_FETCH/style_unstable/ -u gaia/master:shared/style_unstable

# update
git pull -s subtree gaia master

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

# Remove remote in order to avoid increase repo weight
git remote rm gaia
