(function () {
    'use strict';

    angular.module('basicApp', [
            "ui.router",
            "navController",
            "homeController",
            "homeService",
            "recipeService",
            "firebase",
            "recipeController",
            "newCtrl",
            "ngFileUpload",
            "loginController",
            "myCookBookController",
            "ngStorage",
            "app.filters"


        ])

        .config(["$stateProvider", "$urlRouterProvider", "$localStorageProvider",
            function ($stateProvider, $urlRouterProvider, $localStorageProvider) {

                // define all app states (pages)
                $stateProvider
                    .state("home", {
                        url: "/home",
                        templateUrl: "templates/home.html",
                        controller: "homeController as hc"
                    })
                    .state("newRecipe", {
                        url: "/newRecipe",
                        templateUrl: "templates/newRecipe.html",
                        controller: "newCtrl as nc"
                    })
                    .state("about", {
                        url: "/about",
                        templateUrl: "templates/about.html"
                    })
                    .state("myCookBook", {
                        url: "/myCookBook",
                        templateUrl: "templates/myCookBook.html",
                        controller: "myCookBookController as mcc"
                    })
                    .state("login", {
                        url: "/login",
                        templateUrl: "templates/login.html",
                        controller: "loginController as lc"
                    })
                    .state("recipe", {
                        url: "/:id",
                        templateUrl: "templates/recipe.html",
                        controller: "recipeController as rc",
                        resolve: {
                            recipe: function ($stateParams, recipeService) {
                                for (var i = 0; i < recipeService.recipes.length; i++) {
                                    if (recipeService.recipes[i].$id == $stateParams.id) {
                                        return recipeService.recipes[i];
                                    }
                                }
                            }
                        }
                    });

                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise("/home");

                //local storage
                $localStorageProvider.setKeyPrefix('');
            }]);

}());
