'use strict';

var test = require('tape');

var request = require('supertest');

var Inventory = require('../server/src/main/model/Inventory.js');


// beforeall

// TODO como limpar o banco

var _ = require('../server/src/main/util/util');
var AuthService = require('../server/src/main/service/AuthService');

var user = { 
    email: 'biancasllima@gmail.com',
    user_metadata: { full_name: 'Bianca Lima' },
    name: 'biancasllima@gmail.com',
    nickname: 'biancasllima',
    user_id: 'auth0|5a0c80daa392a9407758017b',
    identities: 
    [ { user_id: '5a0c80daa392a9407758017b',
        provider: 'auth0',
        connection: 'Username-Password-Authentication',
        isSocial: false } ],
    sub: 'auth0|5a0c80daa392a9407758017b' 
};

AuthService.getUserByAccessToken = function(token) {
    return Promise.resolve(user); // TODO pegar um usuario de verdade e colocar como padrao
};

AuthService.getUserById = function(id) {
    return Promise.resolve(user);
};

_.authCheck = function() {
    return function(req, res, next) {
        next();
    }
}

// END before


var app = require('../app.js');

test('Create inventory correctly', function (assert) {
    request(app)
      .post('/api/inventory')
      .set('access_token', 'TOKEN test')
      .expect('Content-Type', 'asd')
      .end(function (err, res) {
        assert.same(res.status, 201);
        assert.same(res.body.ingredients, []);
        assert.end();
      });
}); 

test('Correct brew returned', function (assert) {
    request(app)
      .get('/api/brew')
      .set('access_token', 'TOKEN test')
      .expect('Content-Type', 'asd')
      .end(function (err, res) {
        assert.same(res.status, 200);
        assert.same(res.body, []);
        assert.end();
      });
}); 
