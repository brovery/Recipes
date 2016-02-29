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
        rc.star = star;

        // define functions
        function initRecipe() {
            recipeService.initRecipe();
        }

        function addtoCookBook(id) {
            recipeService.addtoCookBook(id);
        }

        function star(id, n){
            for(var i = 1; i <= n; i++){
                var starId = '#' + i + 'star';
                $(starId).html("&#x2605");
                $(starId).css("color", "yellow");
            }
            var someNameObj = {};
            someNameObj[recipeService.loggedin.user] = n;
            for(var i = 0; i < rc.recipe.length; i++) {
                rc.recipes[i].rating.push(someNameObj);
                rc.recipes.$save(i);
            }
        }

    }

}());