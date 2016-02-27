(function () {
    'use strict';

    angular.module('recipeService', [])
        .service('recipeService', recipeService);

    recipeService.$inject = ['$firebaseArray', '$interval'];

    function recipeService($firebaseArray, $interval) {
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
        rs.userindex = -1;
        var key = "";


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
            var alreadyadded = false;
            for (var i = 0; i < rs.cookbook.length; i++) {
                if (id == rs.cookbook[i].recipe) {
                    alreadyadded = true;
                    console.log("Already Added!");
                }
            }
            if (!alreadyadded) {
                rs.cookbook.$add({recipe: id});
                console.log("Added Recipe to your cookbook!");
            }
        }

        function login() {
            var priorlogin = false, count = 0;

            $interval(function() {
                if (rs.users.length == 0) {
                    count++;
                } else {
                    for (var i = 0; i < rs.users.length; i++) {
                        if (rs.users[i].user == rs.loggedin.user) {
                            priorlogin = true;
                            rs.userindex = i;
                            key = rs.users[i].$id;
                        }
                    }

                    if (!priorlogin) {
                        rs.users.$add({user: rs.loggedin.user}).then(function(ref) {
                            key = ref.key();
                            firebook();
                        });
                        rs.userindex = rs.users.length;
                    } else {
                        firebook();
                    }
                }
            }, 1000, 3);

            if (count == 3) {
                alert("Unable to connect to database. Please try again later.")
            }
        }

        function firebook() {
            // Create link to the user's cookbook.
            var cookbookurl = users + "/" + key + "/recipes";
            var mycookbook = new Firebase(cookbookurl);
            rs.cookbook = $firebaseArray(mycookbook);
        }

    }

}());