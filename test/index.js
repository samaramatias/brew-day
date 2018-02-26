'use strict';

var test = require('tape');

var request = require('supertest');


// beforeall

// TODO como limpar o banco

var _ = require('../server/src/main/util/util');
var AuthService = require('../server/src/main/service/AuthService');

var user = { 'userId': 1234};

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
