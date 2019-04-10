git checkout --orphan gh-pages
git add --all
git commit -m 'init'
git push -f origin gh-pages
git checkout master
