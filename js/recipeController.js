(function(){
    'use strict';

    angular.module('recipeController', [])
        .controller('recipeController', recipeController);

    recipeController.$inject = ['recipeService', 'recipe'];

    function recipeController(recipeService, recipe) {
        // list everything
        var rc = this;
        rc.recipes = recipeService.recipes;
        rc.recipe = recipe;
        rc.initRecipe = initRecipe;

        // define functions
        function initRecipe() {
            recipeService.initRecipe();
        }

    }

}());