(function () {
    'use strict';

    angular.module('newCtrl', [])
        .controller('newCtrl', newCtrl);

    newCtrl.$inject = ['$firebaseArray', 'Upload'];

    function newCtrl($firebaseArray, Upload) {

        var url = 'https://geo-recipes.firebaseio.com/';
        var reciperef = new Firebase(url + "/Recipes");
        var imageref = new Firebase(url + "/images");

        // list everything
        var nc = this;
        nc.recipes = $firebaseArray(reciperef);
        nc.fireImage = $firebaseArray(imageref);
        var recipe = function () {
            this.name = "";

            this.prepTime = "";
            this.cookTime = "";
            this.ingredients = [];
            this.instructions = [];
            this.category = '';
            this.private = false;
        };
        nc.file = 'img/Lets-get-cooking.png';
        nc.files = "";
        nc.name = '';
        nc.ingredients = [];
        nc.instructions = [];
        nc.prepTime = "";
        nc.cookTime = "";
        nc.category = "";
        nc.wrongFile = "";

        nc.privacy = false;
        nc.createRecipe = createRecipe;
        nc.imageChange = imageChange;

        function createRecipe() {


            var newRecipe = new recipe;
            newRecipe.name = nc.name;
            newRecipe.image = nc.files;
            newRecipe.prepTime = nc.prepTime;
            newRecipe.cookTime = nc.cookTime;
            newRecipe.category = nc.category;
            newRecipe.private = nc.privacy;

            for (var i = 0; i < nc.ingredients.length; i++) {
                newRecipe.ingredients.push({ingredient: nc.ingredients[i].name, qty: nc.ingredients[i].qty});
            }
            for (i = 0; i < nc.instructions.length; i++) {
                newRecipe.instructions.push({instruction: nc.instructions[i].name});
            }
            console.log(newRecipe);
            addRecipe(newRecipe);

            nc.files = "";
            nc.name = '';
            nc.ingredients = [];
            nc.instructions = [];
            nc.prepTime = "";
            nc.cookTime = "";
            nc.category = "";
            nc.file = 'img/Lets-get-cooking.png';

        }

        function addRecipe(recipe) {
            nc.recipes.$add(recipe);

        }

        nc.addPost = function (files) {
            Upload.base64DataUrl(files).then(function (base64Urls) {
                nc.files = base64Urls;

            });
        };

        function imageChange(file, rejFiles){
            console.log(file);
            if(rejFiles){
                nc.wrongFile = "Incorrect file type";
            }else{
                nc.wrongFile = "";
            }
            if(file === null){
                nc.wrongFile = "Incorrect file size: 2MB or less";
            }else{
                nc.wrongFile = "";
            }
        }

    }
}());
