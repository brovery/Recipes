(function(){
    'use strict';

    angular.module('newCtrl', [])
        .controller('newCtrl', newCtrl);

    newCtrl.$inject = ['recipeService'];

    function newCtrl(recipeService) {

        // list everything
        var nc = this;
        var recipe = {
            name: "",
            image: "",
            prepTime: "",
            cookTime: "",
            ingredients: [],
            instructions: "",
            category: '',
            private: false
        };

        nc.name = '';
        nc.ingredients = [];
        nc.instructions = "";
        nc.prepTime = "";
        nc.cookTime = "";
        nc.category = "";
        nc.privacy = false;
        nc.createRecipe = createRecipe;

        function createRecipe(){
            recipe.name = nc.name;
            recipe.image = "";
            recipe.prepTime = nc.prepTime;
            recipe.cookTime = nc.cookTime;
            recipe.instructions = nc.instructions;
            recipe.category = nc.category;
            recipe.private  = nc.privacy;

            for(var i = 0; i < nc.ingredients.length; i++){
                recipe.ingredients.push({ingredient: nc.ingredients[i].name, qty: nc.ingredients[i].qty});
            }

            console.log(recipe);
        }

    }

}());
