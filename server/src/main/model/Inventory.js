'use strict';

(function () {
    var mongoose = require('mongoose');

    var Ingredient = require('./Ingredient');

    var InventorySchema = new mongoose.Schema({
        userId: {
            type: String,
            required: [true, 'An inventory needs an user associated with it.']
        },
        ingredients: {
            type: [Ingredient]
        }
    });

    module.exports = InventorySchema;
})();


