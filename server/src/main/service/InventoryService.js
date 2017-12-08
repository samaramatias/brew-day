'use strict';

(function () {
    var UserService = require('./UserService');
    var _ = require('../util/util');

    var Inventory = require('../model/Inventory');


    var InventoryService = {};



    InventoryService.getInventory= function (userToken) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id
                };

                return Recipe.find(params).lean().exec();
            });
    };


     InventoryService.getInventory = function (userToken, recipeId) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id,
                    _id: recipeId
                };

                return Inventory.findOne(params).lean().exec();
            });
    };


    InventoryService.createInventory= function (userToken, recipe) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                recipe.userId = user.user_id;

                return new Inventory(inventory).save()
                    .then(function (persistedRecipe) {
                        return persistedRecipe.toObject();
                    });
            });
    };


    //InventoryService.deleteInventory = function (userToken, recipeId) {
      //  return UserService.getUserByAccessToken(userToken)
        //    .then(function (user) {
          //      var params = {
         //           userId: user.user_id,
           //         _id: recipeId
             //   };

              //  return Inventory.remove(params).exec();
            //});
    //};

    module.exports = InventoryService;
})();
