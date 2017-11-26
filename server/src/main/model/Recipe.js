'use strict';

(function () {
    var mongoose = require('mongoose');

    var Equipment = require('./Equipment');
    var Ingredient = require('./Ingredient');

    var RecipeSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: [true, 'A recipe needs an user associated with it.']
        },
        name: {
            type: String,
            required: [true, 'A recipe needs a name.']
        },
        directions: {
            type: String
        },
        ingredients: {
            type: [Ingredient],
            required: [true, 'A recipe needs ingredients.']
        },
        equipment: {
            type: Equipment,
            required: [true, 'A recipe needs an equipment.']
        }
    }, {
        timestamps: {
            createdAt: 'creationDate'
        }
    });

    module.exports = mongoose.model('Recipe', RecipeSchema);
})();
