(function() {
    "use strict";

    angular
        .module('app.filters')
        .filter('cookbook', cookbook);

    cookbook.$inject = ['recipeService'];

    function cookbook(recipeService) {
        return function(input) {
            var newrecipes = [];
            for (var i = 0; i < input.length; i++) {
                for (var j = 0; j < recipeService.cookbook.length; j++) {
                    if (input[i].$id == recipeService.cookbook[j].recipe) {
                        newrecipes.push(input[i])
                    }
                }
            }

            return newrecipes;
        };
    }
})();