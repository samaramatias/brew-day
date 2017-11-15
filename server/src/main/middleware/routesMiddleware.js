'use strict';

(function () {
    var jwt = require('express-jwt');
    var _ = require('../util/util');

    var authCheck = jwt({
        secret: _.AUTH0.CLIENT_SECRET,
        audience: _.AUTH0.CLIENT_ID
    });

    var routesMiddleware = {};

    /**
     * Configure application routes.
     * @param {Object} app Express application.
     * @param {String} clientFilesPath Path to the client files.
     */
    routesMiddleware.set = function (app, clientFilesPath) {
        app.get('/app*', function (req, res) {
            res.sendFile(clientFilesPath + '/index.html');
        });

        app.get('/', function (req, res) {
            res.sendFile(clientFilesPath + '/index.html');
        });

        app.post('/', function (req, res) {
            res.sendFile(clientFilesPath + '/index.html');
        });

        app.get('/:recipe', function(req, res){
            if(req.payload){
              User.findById(req.payload.id).then(function(user){
                if(!user){ return res.json({profile: req.profile.toProfileJSONFor(false)}); }
          
                return res.json({profile: req.profile.toProfileJSONFor(user)});
              });
            } else {
              return res.json({profile: req.profile.toProfileJSONFor(false)});
            }
          });

        app.post('/recipe', (req, res) => {
            db.collection('recipe').save(req.body, (err, result) => {
              if (err) return console.log(err)
          
              console.log('saved to database')
              res.redirect('/')
            })
          })

          app.post('/api/posts', function (req, res, next) {
            var recipe = new Recipe({
              recipe_id: req.body.recipe_id,
              body: req.body.body
            })
            post.save(function (err, post) {
              if (err) { return next(err) }
              res.json(201, recipe)
            })
          })
    };

    module.exports = routesMiddleware;
})();

