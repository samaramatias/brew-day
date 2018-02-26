'use strict';

(function () {
    require('dotenv').config();

    var express = require('express');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var cors = require('cors');
    var errorHandler = require('errorhandler');
    var mongoose = require('mongoose');

    var routesMiddleware = require('./server/src/main/middleware/routesMiddleware');

    var server_port = process.env.PORT || 8080;
    var is_production = process.env.NODE_ENV === 'production';

    var client_main_path = __dirname + '/client/src/main/';
    var client_path = __dirname + '/client/';
    var img_path = __dirname + '/img/';

    var app = express();

    var dbConn;

    function getConfig() {
        var PROFILE = process.env.PROFILE;

        if (!(PROFILE === 'prod' || PROFILE === 'dev' || PROFILE === 'test')) {
            console.error('Deveria passar o PROFILE: prod | dev | test');
            process.exit(1);
        }
        return require('./config/' + PROFILE + '.json');
    }

    if (process.env.PROFILE !== 'prod') {
        mongoose.set('debug', true);
    }

    var config = getConfig();

    dbConn = mongoose.connect(config.DBHost, {useMongoClient: true});
        
    app.use(errorHandler());

    dbConn.once('error', function (e) {
        console.error(e);
    });
    dbConn.once('open', function () {
        console.log('DB connection established.');
    });

    app.use(cors());
    app.use(morgan('combined'));

    //don't show the log when it is test
    //if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    //app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
    //}

    app.use(bodyParser.json({limit: '30mb'}));
    app.use(bodyParser.urlencoded({extended: true}));

    app.set('port', server_port);
    app.set('address', process.env.ADDRESS || '127.0.0.1');

    app.use('/js', express.static(client_main_path + '/js'));
    app.use('/css', express.static(client_main_path + '/css'));
    app.use('/view', express.static(client_main_path + '/view'));
    app.use('/config', express.static(client_main_path + 'config'));
    app.use('/lib', express.static(client_path + '/lib'));
    app.use('/img', express.static(img_path));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));

    routesMiddleware.set(app, client_main_path);

    app.listener = app.listen(server_port, function () {
        console.log('Server listening on port ' + app.listener.address().port + '.');
    });

    module.exports = app; // for testing
})();
