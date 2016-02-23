(function () {
    'use strict';

    angular.module('recipeService', [])
        .service('recipeService', recipeService);

    recipeService.$inject = ['$firebaseArray'];

    function recipeService($firebaseArray) {
        var url = 'https://geo-recipes.firebaseio.com/';
        var reciperef = new Firebase(url + "/Recipes");
        var cookbook = new Firebase(url + "/Cookbooks");
        var users = new Firebase(url + "/Users");

        // list everything
        var rs = this;
        rs.recipes = $firebaseArray(reciperef);
        rs.cookbooks = $firebaseArray(cookbook);
        rs.users = $firebaseArray(users);
        rs.addRecipe = addRecipe;
        rs.addtoCookBook = addtoCookBook;
        rs.initRecipe = initRecipe;
        rs.loggedin = {loggedin: true};


        // define functions

        function addRecipe(recipe) {
            rs.recipes.$add(recipe);

        }

        function initRecipe() {
            //rs.recipes.$add(rs.newRecipes);

            console.log(rs.recipes.$keyAt(0));

        }

        function addtoCookBook(id) {
            //for (var i = 0; i<rs.recipes.length; i++) {
            //    if (rs.recipes[i].$id == id) {
            //        rs.recipes[i].users.brandon = true;
            //        rs.recipes.$save(i);
            //    }
            //}

            //rs.users.$add({brandon: {recipes: {id: true}}});

            var thisid = {id: true};

            rs.users.brandon.recipes

            console.log("Adding User");
            console.log(rs.users);
        }

    }

}());