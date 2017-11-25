(() => {
  'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Ingredient = mongoose.model('Ingredient');
var ObjectId = mongoose.Types.ObjectId;

var RecipeSchema = new mongoose.Schema({
  recipeId: {type: int, unique: true, required: [true, "can't be blank"], index: true},
  userId:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  equipment: {type: mongoose.Schema.Types.ObjectId, ref: 'Equipment'}, 
  ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}],
  data: { type: Date, default: Date.now }
}, {timestamps: true});

// TODO Create custom findId for DB.

RecipeSchema.methods.toAuthJSON = function(){
  return {
    recipeId: this.recipeId,
    userId: this.userId,
    name: this.name,
    equipment: this.equipment,
    ingredients: this.ingredients,
    date: this.data
  };
};

mongoose.model('Recipe', RecipeSchema);
})();