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
        rc.loggedin = recipeService.loggedin;
        rc.initRecipe = initRecipe;
        rc.addtoCookBook = addtoCookBook;

        // define functions
        function initRecipe() {
            recipeService.initRecipe();
        }

        function addtoCookBook(id) {
            recipeService.addtoCookBook(id);
        }

    }

}());