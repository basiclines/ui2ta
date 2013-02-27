echo "Generating build/package.zip"
cd ../
zip -r package.zip shared js css gphx app.html manifest.webapp
mv package.zip build/package.zip
echo "Finished"
