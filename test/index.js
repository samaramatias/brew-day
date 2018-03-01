'use strict';

var test = require('tape');

var request = require('supertest');

var Inventory = require('../server/src/main/model/Inventory.js');


// beforeall

// TODO clean the DB before running tests

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

test('Create inventory correctly and add ingredient', function (assert) {
    request(app)
      .post('/api/inventory')
      .set('access_token', 'TOKEN test')
      .expect('Content-Type', 'asd')
      .end(function (err, res) {
        assert.same(res.status, 201);
        assert.same(res.body.ingredients, []);
      });

    var inventoryPut = { 
        _id: '5a94c61b990ffc47a5ffb04a',
        ingredients: 
        [ { name: 'water', quantity: 10, unit: 'L' } ],
        userId: user.user_id,
        __v: 4
    };  

    request(app)
        .get('/api/inventory')
        .set('access_token', 'TOKEN test')
        .expect('Content-Type', 'asd')
        .end(function(err, res){
            request(app)
            .put('/api/inventory/'+res.body._id)
            .set('access_token', 'TOKEN test')
            .send({ 
                _id: inventoryPut._id,
                ingredients: 
                [ { name: 'water',quantity: 10, unit: 'L' } ],
                userId: user.user_id,
                __v: 4
            })
            .end(function(error, response){
                assert.same(response.status, 200);
                assert.same(response.json);
                assert.same(response.body.ingredients.length, 1);
                assert.end();
      });
    });
}); 

test('Correct recipe created', function (assert) {
    request(app)
      .post('/api/recipe')
      .set('access_token', 'TOKEN test')
      .expect('Content-Type', 'asd')
      .send({ name: 'Test recipe',
        directions: 'Try and try again',
        ingredients: [ 
            { name: 'water', quantity: 500, unit: 'ML', searchText: 'water' },
            { name: 'flower', quantity: 200, unit: 'G', searchText: 'flower' } ],
        equipment: { volume: 5, unit: 'L' } })
      .end(function (err, res) {
        assert.same(res.status, 201);
        assert.notEqual(res.body._id, null);
        assert.end();
      });
});

test('Create brew based on valid recipe', function (assert) {
    var idInventory = "";
    var recipeDb;
    request(app)
      .post('/api/inventory')
      .set('access_token', 'TOKEN test')
      .expect('Content-Type', 'asd')
      .end(function (err, res) {
        idInventory = res.body._id;
        assert.same(res.status, 201);
        assert.same(res.body.ingredients, []);
      });

    var inventoryPut = { 
        _id: idInventory,
        ingredients: 
        [ { name: 'sugar', quantity: 20, unit: 'KG' },
          {name: 'honey', quantity: 10, unit: 'L'},
          {name: 'barley', quantity: 15, unit: 'KG'},
          {name: 'special water', quantity: 50, unit: 'L'} ],
        userId: user.user_id,
        __v: 4
    };  

    request(app)
        .get('/api/inventory')
        .set('access_token', 'TOKEN test')
        .expect('Content-Type', 'asd')
        .end(function(err, res){
            request(app)
            .put('/api/inventory/'+res.body._id)
            .set('access_token', 'TOKEN test')
            .send({ 
                _id: inventoryPut._id,
                ingredients: 
                [ { name: 'sugar', quantity: 2, unit: 'KG' },
                {name: 'honey', quantity: 8, unit: 'L'},
                {name: 'barley', quantity: 5, unit: 'KG'},
                {name: 'special water', quantity: 20, unit: 'L'} ],
                userId: user.user_id,
                __v: 4
            })
            .end(function(error, response){
                assert.same(response.status, 200);
                assert.same(response.json);
                assert.same(response.body.ingredients.length, 4);
            });
        });
    request(app)
        .post('/api/recipe')
        .set('access_token', 'TOKEN test')
        .expect('Content-Type', 'asd')
        .send({ name: 'Test recipe',
            directions: 'Try and try again',
            ingredients: [ 
                {name: 'honey', quantity: 0.25, unit: 'L'},
                {name: 'barley', quantity: 0.5, unit: 'KG'},
                {name: 'special water', quantity: 2, unit: 'L'} ],
            equipment: { volume: 7, unit: 'L' } })
        .end(function (err, responseRecipe) {
            request(app)
            .post('/api/brew')
            .set('access_token', 'TOKEN test')
            .expect('Content-Type', 'asd')
            .send({ notes: "Test note",
                    recipe: responseRecipe.body, 
                    userId : user.user_id})
            .end(function (error, responseBrew) {
                // TODO drop DB to restart inventory quantities
                assert.same(responseBrew.status, 400);
                assert.equal(responseBrew.body._id);
            });    
        });

        
    
});

