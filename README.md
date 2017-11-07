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
