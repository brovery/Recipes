(function () {
    'use strict';

    angular.module('recipeController', [])
        .controller('recipeController', recipeController);

    recipeController.$inject = ['recipeService', 'recipe', '$firebaseArray', '$localStorage'];

    function recipeController(recipeService, recipe, $firebaseArray, $localStorage) {
        // list everything
        var rc = this;
        rc.recipes = recipeService.recipes;
        rc.recipe = recipe;
        rc.loggedin = recipeService.loggedin;
        rc.addToCookBookButton = recipeService.addToCookBookButton;
        rc.initRecipe = initRecipe;
        rc.addtoCookBook = addtoCookBook;
        rc.editRecipe = editRecipe;
        rc.star = star;

        if (rc.recipe == undefined) {
            rc.recipe = $localStorage.curRecipe;
        }

        // define functions
        function initRecipe() {
            recipeService.initRecipe();
        }

        function addtoCookBook(id) {
            recipeService.addtoCookBook(id);
            $('.add-button').css("display", "none");
        }

        function star(id, n) {
            var url = 'https://geo-recipes.firebaseio.com';
            var fireURL = new Firebase(url + "/Recipes/" + id + '/rating');
            var fireRate = $firebaseArray(fireURL);

            for (var i = 1; i <= n; i++) {
                var starId = '#' + i + 'star';
                $(starId).html("&#x2605");
                $(starId).css("color", "yellow");
            }

            var user = recipeService.loggedin.user;
            var newRate = {
                user: user,
                rating: n
            };
            fireRate.$loaded(function () {
                for (i = 0; i < fireRate.length; i++) {
                    if (user === fireRate[i].user) {
                        console.log(fireRate[i].user);
                        fireRate.$remove(fireRate[i]);
                    }
                }
                fireRate.$add(newRate);
            });

        }

        function editRecipe() {
            recipeService.curRecipe = $localStorage.curRecipe;
        }

    }

}());