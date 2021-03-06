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

    if (is_production) {
        dbConn = mongoose.connect(process.env.MONGODB_ADDRESS + '/BREWDAY', {useMongoClient: true});
    } else {
        dbConn = mongoose.connect('mongodb://127.0.0.1:27017/BREWDAY-TESTDB', {useMongoClient: true});
        mongoose.set('debug', true);

        app.use(errorHandler());
    }

    dbConn.once('error', function (e) {
        console.error(e);
    });
    dbConn.once('open', function () {
        console.log('DB connection established.');
    });

    app.use(cors());
    app.use(morgan('combined'));
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
})();
