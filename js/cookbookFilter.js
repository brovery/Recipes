(function() {
    "use strict";

    angular
        .module('app.filters')
        .filter('cookbook', cookbook)
        .filter('times', times);

    cookbook.$inject = ['recipeService'];

    function cookbook(recipeService) {
        return function(input) {
            var newrecipes = [];
            for (var i = 0; i < input.length; i++) {
                for (var j = 0; j < recipeService.cookbook.length; j++) {
                    if (input[i].$id == recipeService.cookbook[j].recipe) {
                        newrecipes.push(input[i]);
                    }
                }
            }
            return newrecipes;
        };
    }

    function times() {
        return function(input) {
            console.log(typeof input + ": " + input);
            if (typeof input !== "number") {
                return "N/A";
            }

            if (input >= 60) {
                return Math.floor(input/60) + " hrs, " + input % 60 + " minutes";
            } else {
                return input + " minutes";
            }
        };
    }
})();