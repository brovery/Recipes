(function(){
    'use strict';

    angular.module('recipeController', [])
        .controller('recipeController', recipeController);

    recipeController.$inject = ['recipeService'];

    function recipeController(recipeService) {

        // list everything
        var rc = this;
        rc.recipes = recipeService.recipes;


        // define functions

    }

}());