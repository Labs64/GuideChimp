#!/bin/sh

# install dependencies
npm install

# check outdated dependencies
npm outdated

# execute tests
npm run test

# prepare distribution
npm run build

# version prompt
echo Enter release version:
read version
if [ "$version" = "" ]; then
  echo "Error! Version cannot be empty."
  exit 1
fi

# start release
git commit -a -m "Prepare for release $version"
npm config set tag-version-prefix ''
npm version $version -m "Release $version"
git tag $version
git push origin master $version
