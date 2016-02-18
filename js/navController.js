(function(){
    'use strict';

    angular.module('navController', [])
        .controller('navController', navController);

    navController.$inject = ["$location", "recipeService"];

    function navController($location, recipeService)
    {
        var nav = this;
        nav.isActive = isActive;
        nav.search = search;
        nav.recipes = recipeService.recipes;

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }

        function search() {
            if (!nav.searchText) {
                console.log("No search text!");
            } else {
                console.log("Searching " + nav.searchText);

            }
        }
    }

}());
