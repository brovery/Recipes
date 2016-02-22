(function () {
    'use strict';

    angular.module('recipeService', [])
        .service('recipeService', recipeService);

    recipeService.$inject = ['$firebaseArray'];

    function recipeService($firebaseArray) {
        var url = 'https://geo-recipes.firebaseio.com/';
        var reciperef = new Firebase(url + "/Recipes");
        var cookbook = new Firebase(url + "/Cookbooks");

        // list everything
        var rs = this;
        rs.recipes = $firebaseArray(reciperef);
        rs.cookbooks = $firebaseArray(cookbook);
        rs.addRecipe = addRecipe;
        rs.initRecipe = initRecipe;
        rs.loggedin = {loggedin: true};
        //rs.newRecipes = {
        //    name: "Momma's Healthy Meatloaf",
        //    image: 'img/meatloaf1.jpg',
        //    prepTime: 15,
        //    cookTime: 45,
        //    ingredients: [
        //        {
        //            ingredient: 'cooking spray',
        //            qty: ''
        //        },
        //        {
        //            ingredient: 'olive oil',
        //            qty: '1 tablespoon'
        //        },
        //        {
        //            ingredient: 'green bell pepper, diced',
        //            qty: '1'
        //        },
        //        {
        //            ingredient: 'diced sweet onion',
        //            qty: '1/2 cup'
        //        },
        //        {
        //            ingredient: 'minced garlic',
        //            qty: '1/2 teaspoon'
        //        },
        //        {
        //            ingredient: 'extra-lean (95%) ground beef',
        //            qty: '1 pound'
        //        },
        //        {
        //            ingredient: 'whole wheat bread crumbs',
        //            qty: '1 cup'
        //        },
        //        {
        //            ingredient: 'large eggs',
        //            qty: '2'
        //        },
        //        {
        //            ingredient: 'shredded carrot',
        //            qty: '3/4 cup'
        //        },
        //        {
        //            ingredient: 'shredded zucchini',
        //            qty: '3/4 cup'
        //        },
        //        {
        //            ingredient: 'salt and ground black pepper',
        //            qty: 'to taste'
        //        },
        //        {
        //            ingredient: 'ketchup',
        //            qty: '1/4 cup, or to taste'
        //        }
        //    ],
        //    instructions: [
        //        {
        //            instruction: 'Preheat oven to 400 degrees F (200 degrees C). Spray a 9x5-inch loaf pan with cooking spray.'
        //        },
        //        {
        //            instruction: 'Heat olive oil in a skillet over medium heat; cook and stir green bell pepper and onion in the hot oil until onion is transparent and bell pepper is softened, 5 to 10 minutes. Add garlic and cook until fragrant, 1 to 2 minutes.'
        //        },
        //        {
        //            instruction: 'Combine ground beef, bread crumbs, eggs, carrot, zucchini, salt, pepper, and bell pepper mixture in a large bowl; mix well using your hands. Press meat mixture into the prepared loaf pan.'
        //        },
        //        {
        //            instruction: 'Bake in the preheated oven until no longer pink in the center, 35 to 40 minutes. An instant-read thermometer inserted into the center should read at least 160 degrees F (70 degrees C). Spread ketchup on the top of the meatloaf and continue baking until bubbling, about 5 minutes more.'
        //        }
        //    ],
        //    category: 'entre',
        //    private: false
        //};

        function addRecipe(recipe) {
            rs.recipes.$add(recipe);

        }

        function initRecipe() {
            //rs.recipes.$add(rs.newRecipes);

            console.log(rs.recipes.$keyAt(0));

        }


        // define functions

    }

}());