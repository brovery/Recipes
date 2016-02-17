(function(){
    'use strict';

    angular.module('recipeController', [])
        .controller('recipeController', recipeController);

    recipeController.$inject = ['recipeService'];

    function recipeController(recipeService) {
        // Pull the array index from the url
        var url = window.location.href;
        var ref = url.slice(url.indexOf("#")+2);

        // list everything
        var rc = this;
        rc.recipes = recipeService.recipes;
        rc.recipe = recipeService.recipes[ref]; // This grabs just the recipe referenced in the url.
        rc.initRecipe = initRecipe;

        function initRecipe() {
            recipeService.initRecipe();
        }


        // define functions

    }

}());