cd ../
echo "Deploying...."
git checkout gh-pages
git pull origin master
git push origin gh-pages
git checkout master
echo "Finished"
