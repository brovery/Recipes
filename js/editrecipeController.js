(function(){
    'use strict';

    angular.module('editrecipeController', [])
        .controller('editrecipeController', editrecipeController);

    editrecipeController.$inject = ['recipeService'];

    function editrecipeController(recipeService) {
        // list everything
        var ec = this;
        ec.recipes = recipeService.recipes;
        ec.curRecipe = recipeService.curRecipe;
        ec.editRecipe = editRecipe;



        // define functions
        function editRecipe() {
            console.log(ec.curRecipe);
        }

    }

}());