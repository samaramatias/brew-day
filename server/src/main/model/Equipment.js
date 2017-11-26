'use strict';

(function () {
    var mongoose = require('mongoose');

    var EquipmentSchema = new mongoose.Schema({
        volume: {
            type: Number,
            required: [true, 'An equipment needs volume.']
        },
        unit: {
            type: String,
            required: [true, 'An equipment needs an unit.']
        }
    });

    module.exports = EquipmentSchema;
})();
