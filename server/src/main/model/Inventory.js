'use strict';

(function () {
    var mongoose = require('mongoose');

    var Ingredient = require('./Ingredient');

    var InventorySchema = new mongoose.Schema({
        userId: {
            type: String,
            required: [true, 'An Inventory needs an user associated with it.']
        },
        ingredients: {
            type: [Ingredient]
        }
    });

    module.exports = mongoose.model('Inventory', InventorySchema);
})();


