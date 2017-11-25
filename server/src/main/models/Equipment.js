(() => {
    'use strict';
  
  var mongoose = require('mongoose');
  
  var EquipmentSchema = new mongoose.Schema({
    equipmentId: {type: int, unique: true, required: [true, "can't be blank"], index: true},
    volume:  int,
    unit: String
  }, {timestamps: true});
  
  // TODO Create custom findId for DB.
  
  EquipmentSchema.methods.toAuthJSON = function(){
    return {
      equipmentId: this.equipmentId,
      volume: this.volume,
      unit: this.unit
    };
  };
  
  mongoose.model('Equipment', EquipmentSchema);
  })();