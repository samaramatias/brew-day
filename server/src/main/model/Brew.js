'use strict';

(function () {
    var mongoose = require('mongoose');

    var Recipe = require('./Recipe');

    var BrewSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: [true, 'A brew needs an user associated with it.']
        },
        recipe: {
            type: Recipe,
            required: [true, 'A brew needs a recipe.']
        },
        notes: {
            type: String
        }
    }, {
        timestamps: {
            createdAt: 'creationDate'
        }
    });

    module.exports = BrewSchema;
})();
