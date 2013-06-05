#!/bin/bash

# -------------------------------------------------------
# Usage:
# cd build/
# ./build.sh ( generates just package.zip )
# ./build.sh HIDPI ( generates both package.zip and package@2x.zip )
# -------------------------------------------------------

# Constants
APP_FILES="css gphx js shared app.html manifest.webapp"
HIDPI="HIDPI"
TMP_PATHS="tmp_paths.txt"
TMP_HIDPI_DIR="tmp_hidpi/"

# Initial feedback
if [ "$1" == "$HIDPI" ];
then
	echo "Generating application packages..."
else
	echo "Generating application package..."
fi

# Set working directory
cd ../

# Create base zip package
zip -r package.zip $APP_FILES

# Get all the images paths and store it in a temporal file
find * -name "*.png" -o -name "*.jpg" -o -name "*.gif" > $TMP_PATHS

# Read line by line images paths files
while read excluded
do
	# Remove all images from base zip
	zip -r package.zip -d $excluded
done < $TMP_PATHS


if [ "$1" == "$HIDPI" ];
then
	# Generate base @2x package
	cp package.zip package@2x.zip
fi

echo "Base application packages: DONE"

# Generate raw folders to store the files
mkdir $TMP_HIDPI_DIR

# Read the paths file line by line
while read path
do
	# Only 'normal' paths
	if [[ "$path" != *@2x* ]]
	then
		# Fill 'normal' package with normal images
		zip -r package.zip $path

		if [ "$1" == "$HIDPI" ];
		then
			# Convert @2x path in 'normal' path
			hidpi_path=${path//.png/@2x.png}

			# Get path structure of each file
			dir_structure=$TMP_HIDPI_DIR${path%/*}

			# Check if folder exist, if not create all the internal directories
			test -d "$dir_structure" || mkdir -p "$dir_structure"

			# Check if there is an equivalent @2x image
			if [ -f $hidpi_path ];
			then
				# Copies the @2x file in to temporal folder with 'normal' name
				cp $hidpi_path $TMP_HIDPI_DIR$path
			else
				# Copies the normal file in to the temporal folder
				cp $path $TMP_HIDPI_DIR$path
			fi
		fi
	fi
done < "$TMP_PATHS"

# Overwrites base files in package@2x.zip with the correct ones
if [ "$1" == "$HIDPI" ];
then
	cd $TMP_HIDPI_DIR
	zip -r ../package@2x.zip *
	cd ..
fi
echo "Cleaning..."

# Remove temporal folder
rm -rf $TMP_PATHS
if [ "$1" == "$HIDPI" ];
then
	rm -rf $TMP_HIDPI_DIR
fi

# Move to build/ directory
mv package.zip build/package.zip
if [ "$1" == "$HIDPI" ];
then
	mv package@2x.zip build/package@2x.zip
fi

# FInal feedback
if [ "$1" == "$HIDPI" ];
then
	echo "Done. You can find your packages in build/package@2x.zip & build/package.zip"
else
	echo "Done. You can find your package in build/package.zip"
fi
