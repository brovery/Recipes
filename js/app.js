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
            "loginController"


        ])

        .config(["$stateProvider", "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {

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
                                return recipeService.recipes[$stateParams.id];
                            }
                        }
                    });

                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise("/home");
            }]);

}());
