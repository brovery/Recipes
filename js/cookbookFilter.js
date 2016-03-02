(function () {
    "use strict";

    angular
        .module('app.filters')
        .filter('cookbook', cookbook)
        .filter('times', times)
        .filter('searchRecipes', searchRecipes);

    cookbook.$inject = ['recipeService', '$interval'];

    function cookbook(recipeService, $interval) {
        return function (input) {
            var newrecipes = [];
            if (input != undefined && recipeService.cookbook != undefined) {
                for (var i = 0; i < input.length; i++) {
                    for (var j = 0; j < recipeService.cookbook.length; j++) {
                        if (input[i].$id == recipeService.cookbook[j].recipe) {
                            newrecipes.push(input[i]);
                        }
                    }
                }
            }
            return newrecipes;
        };
    }

    function times() {
        return function (input) {
            if (typeof input !== "number") {
                return "N/A";
            }

            if (input >= 60) {
                return Math.floor(input / 60) + " hrs, " + input % 60 + " minutes";
            } else {
                return input + " minutes";
            }
        };
    }

    function searchRecipes() {
        return function () {
            $scope.search = function (recipe) {
                return (angular.lowercase(recipe.name).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
                angular.lowercase(recipe.ingredients).indexOf(angular.lowercase($scope.query) || '') !== -1);
            };
        };
    }
})();

