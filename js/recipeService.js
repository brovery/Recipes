(function () {
    'use strict';

    angular.module('recipeService', [])
        .service('recipeService', recipeService);

    recipeService.$inject = ['$firebaseArray'];

    function recipeService($firebaseArray) {
        var url = 'https://geo-recipes.firebaseio.com';
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
        rs.loggedin = {loggedin: false};
        rs.login = login;


        // define functions

        function addRecipe(recipe) {
            rs.recipes.$add(recipe);
        }

        function initRecipe() {
            //rs.recipes.$add(rs.newRecipes);
        }

        function addtoCookBook(id) {
            // Add the user to the recipe.
            //for (var i = 0; i<rs.recipes.length; i++) {
            //    if (rs.recipes[i].$id == id) {
            //        var user = rs.loggedin.user;
            //        rs.recipes[i].users[user] = true;
            //        rs.recipes.$save(i);
            //    }
            //}

            // Add the recipe to the user.
            for (var i = 0; i < rs.users.length; i++) {
                if (Object.keys(rs.users[i])[0] == rs.loggedin.user) {
                    rs.users[i].recipes[id] = true;
                    //rs.users.$save(i);
                }
            }
        }

        function login() {
            console.log(rs.loggedin);
            var priorlogin = false;
            for (var i = 0; i < rs.users.length; i++) {
                if (Object.keys(rs.users[i])[0] == rs.loggedin.user) {
                    priorlogin = true;
                }
            }

            if (!priorlogin) {
                var useradd = {};
                useradd[rs.loggedin.user] = {Recipes: {1: true}};
                rs.users.$add(useradd);
            }
        }

    }

}());