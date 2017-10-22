'use strict';

(function () {
    const express = require('express');
    const morgan = require('morgan');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const errorHandler = require('errorhandler');
    const mongoose = require('mongoose');

    const server_port = process.env.PORT || 8080;
    const is_production = process.env.NODE_ENV === 'production';

    const client_main_path = `${__dirname}/client/src/main/`;
    const client_dist_path = `${__dirname}/client/dist/`;
    const client_path = `${__dirname}/client/`;
    const img_path = `${__dirname}/img/`;

    const client_files_path = is_production ? client_dist_path : client_main_path;

    const app = express();

    let dbConn;

    if (is_production) {
        dbConn = mongoose.connect(`${process.env.MONGODB_ADDRESS}/BREWDAY`, {useMongoClient: true});
    } else {
        dbConn = mongoose.connect('mongodb://127.0.0.1:27017/BREWDAY-TESTDB', {useMongoClient: true});
        mongoose.set('debug', true);

        app.use(errorHandler());
    }

    dbConn.once('error', (e) => {
        console.error(e);
    });
    dbConn.once('open', () => {
        console.log('DB connection established.');
    });

    app.use(cors());
    app.use(morgan('combined'));
    app.use(bodyParser.json({limit: '30mb'}));
    app.use(bodyParser.urlencoded({extended: true}));

    app.set('port', server_port);
    app.set('address', process.env.ADDRESS || '127.0.0.1');

    app.use('/js', express.static(`${client_files_path}/js`));
    app.use('/css', express.static(`${client_files_path}/css`));
    app.use('/fonts', express.static(`${client_main_path}/fonts`));
    app.use('/view', express.static(`${client_main_path}/view`));
    app.use('/resources', express.static(`${client_path}/resources`));
    app.use('/img', express.static(img_path));

    app.use('/node_modules', express.static(`${__dirname}/node_modules`));

    /* TODO: Configure express sessions. */
    /* TODO: Configure REST routes. */

    app.get('/app*', (req, res) => {
        res.sendFile(`${client_files_path}/index.html`);
    });

    app.get('/', (req, res) => {
        res.sendFile(`${client_files_path}/index.html`);
    });

    app.post('/', (req, res) => {
        res.sendFile(`${client_files_path}/index.html`);
    });

    app.listener = app.listen(server_port, () => {
        console.log(`Server listening on port ${app.listener.address().port}.`);
    });
})();
