(function(){
    'use strict';

    angular.module('recipeController', [])
        .controller('recipeController', recipeController);

    recipeController.$inject = ['recipeService'];

    function recipeController(recipeService) {

        // list everything
        var rc = this;
        rc.recipes = recipeService.recipes;
        rc.initRecipe = initRecipe;

        function initRecipe() {
            recipeService.initRecipe();
        }


        // define functions

    }

}());