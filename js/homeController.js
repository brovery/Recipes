(function(){
    'use strict';

    angular.module('homeController', [])
        .controller('homeController', homeController);

    homeController.$inject = ['recipeService'];

    function homeController(recipeService) {

        // list everything
        var hc = this;
        hc.recipes = recipeService.recipes;
        hc.displayRecipes = hc.recipes.slice(0,4);
        hc.getMoreRecipes = getMoreRecipes;

        // define functions
        function getMoreRecipes() {
            hc.displayRecipes = hc.recipes.slice(0,hc.displayRecipes.length + 4);
        }



    }

}());
