#!/bin/bash
# push master to gh-pages which in effect publishes the site

# Check if the gh-pages branch exists
if git show-ref --verify --quiet "refs/heads/gh-pages"; then
  # If the branch exists, switch to it
  git checkout gh-pages
else
  # If the branch doesn't exist, create it as an orphan branch
  git checkout --orphan gh-pages
fi

# Add all files (including untracked) to the staging area
git add --all

# Commit the changes
git commit -m 'init'

# Push the changes to the remote gh-pages branch with force
git push -f origin gh-pages

# Switch back to the master branch
git checkout master

