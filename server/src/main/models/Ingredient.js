var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;

var IngredientSchema = new mongoose.Schema({
  ingredientId: {type: int, unique: true, required: [true, "can't be blank"], index: true},
  name: String,
  quantity: float, 
  unit: String
}, {timestamps: true});

IngredientSchema.methods.toAuthJSON = function(){
  return {
    ingredientId: this.ingredientId,
    name: this.name,
    quantity: this.quantity,
    unit: this.unit
  };
};

mongoose.model('Ingredient', IngredientSchema);
