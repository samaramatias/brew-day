var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;

var IngredientSchema = new mongoose.Schema({
  ingredient_id: {type: int, unique: true, required: [true, "can't be blank"], index: true},
  name: String,
  quantity: float, 
  unit: String
}, {timestamps: true});

IngredientSchema.methods.toAuthJSON = function(){
  return {
    ingredient_id: this.ingredient_id,
    name: this.name,
    quantity: this.quantity,
    unit: this.unit
  };
};

mongoose.model('Ingredient', IngredientSchema);
