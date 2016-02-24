(function () {
    'use strict';

    angular.module('recipeService', [])
        .service('recipeService', recipeService);

    recipeService.$inject = ['$firebaseArray'];

    function recipeService($firebaseArray) {
        var url = 'https://geo-recipes.firebaseio.com';
        var reciperef = new Firebase(url + "/Recipes");
        var users = new Firebase(url + "/Users");

        // list everything
        var rs = this;
        rs.recipes = $firebaseArray(reciperef);
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
                var userkey = Object.keys(rs.users[i])[0];
                if (userkey == rs.loggedin.user) {
                    console.log("Adding the recipe to your cookbook.");
                    var cookbook = new Firebase(users + "/" + rs.users.$keyAt(i) + "/" + userkey + "/recipes");
                    var myCookbook = $firebaseArray(cookbook);
                    myCookbook[id] = true;
                    myCookbook.$save(id);
                }
            }
        }

        function login() {
            var priorlogin = false;
            for (var i = 0; i < rs.users.length; i++) {
                if (Object.keys(rs.users[i])[0] == rs.loggedin.user) {
                    priorlogin = true;
                }
            }

            if (!priorlogin) {
                var useradd = {};
                useradd[rs.loggedin.user] = {recipes: {1: true}};
                rs.users.$add(useradd);
            }
        }

    }

}());