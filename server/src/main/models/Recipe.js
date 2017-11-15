var mongoose = require('mongoose');
var User = mongoose.model('User');

var RecipeSchema = new mongoose.Schema({
  recipe_id: {type: int, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  user_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  equipment_volume: int, 
  ingredients: String,
  data: { type: Date, default: Date.now }
}, {timestamps: true});

RecipeSchema.methods.toAuthJSON = function(){
  return {
    recipe_id: this.recipe_id,
    user_id: this.user_id,
    name: this.name,
    equipment_volume: this.equipment_volume,
    ingredients: this.ingredients,
    date: this.data
  };
};

mongoose.model('Recipe', RecipeSchema);
