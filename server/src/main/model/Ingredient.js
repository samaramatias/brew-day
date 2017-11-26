'use strict';

(function () {
    var mongoose = require('mongoose');

    var IngredientSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'An ingredient needs a name.']
        },
        quantity: {
            type: Number,
            min: 0,
            required: [true, 'An ingredient needs a quantity.']
        },
        unit: {
            type: String,
            required: [true, 'An ingredient needs an unit.']
        }
    });

    module.exports = IngredientSchema;
})();
