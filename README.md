# Brew Day!

Brew Day! is an application for home brewers.

# Development

Make sure you have [Node](https://nodejs.org) version 8.x and [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) version 3.x installed.

You're also going to need a file called `.env` inside the project root folder. This file contains sensitive information, so it's not here in the repository.

After that, clone the repository and do:

`npm install`

Now, before running the app, you need to have MongoDB up:

`sudo service mongod start`

Now you can run the app:

`node app.js`

Before you start coding, create a branch for what you're going to do so you can create a proper pull request later on. To create a new branch, do:

`git checkout -b <name-of-branch>`

After you finish your work, commit everything and then merge with the master branch so you can resolve merge conflicts before creating the pull request.

`git commit -m <message>`

`git fetch origin master`

`git merge origin master`

Commit again and then push to **your** branch:

`git commit -m <message>`

`git push origin <name-of-branch>`

Now go to GitHub and create the pull request. Wait for someone to approve your changes before merging with the master branch.
