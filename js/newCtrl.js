(function () {
    'use strict';

    angular.module('newCtrl', [])
        .controller('newCtrl', newCtrl);

    newCtrl.$inject = ['$firebaseArray', 'Upload', 'recipeService'];

    function newCtrl($firebaseArray, Upload, recipeService) {

        var url = 'https://geo-recipes.firebaseio.com/';
        var reciperef = new Firebase(url + "/Recipes");
        var imageref = new Firebase(url + "/images");

        // list everything
        var nc = this;
        nc.recipes = $firebaseArray(reciperef);
        nc.fireImage = $firebaseArray(imageref);
        var Recipe = function () {
            this.name = "";
            this.prepTime = "";
            this.cookTime = "";
            this.ingredients = [];
            this.instructions = [];
            this.category = '';
        };
        var defaultImage = 'img/Lets-get-cooking.png';
        nc.imageShow = defaultImage;
        nc.name = '';
        nc.ingredients = [];
        nc.instructions = [];
        nc.prepTime = "";
        nc.cookTime = "";
        nc.category = "";
        nc.wrongFile = "";
        nc.privacy = false;
        nc.userName = recipeService.loggedin.username;
        nc.createRecipe = createRecipe;
        nc.imageChange = imageChange;
        nc.removeIng = removeIng;
        nc.removeIns = removeIns;
        nc.addPost = addPost;

        function createRecipe() {

            if (nc.imageShow === defaultImage) {

            }

            var newRecipe = new Recipe();
            newRecipe.name = nc.name;
            if (nc.imageShow === defaultImage) {
                newRecipe.image = defaultImage;
            } else {
                newRecipe.image = nc.files;
            }
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

            addRecipe(newRecipe);

            nc.name = '';
            nc.ingredients = [];
            nc.instructions = [];
            nc.prepTime = "";
            nc.cookTime = "";
            nc.category = "";
            nc.imageShow = 'img/Lets-get-cooking.png';

        }

        function addRecipe(recipe) {
            nc.recipes.$add(recipe);

        }

        function addPost(files) {
            Upload.base64DataUrl(files).then(function (base64Urls) {
                nc.files = base64Urls;
            });
            nc.imageShow = files;
            console.log(nc.imageShow);
        }

        function imageChange(file, rejFiles) {

            if (rejFiles) {
                nc.wrongFile = "Incorrect file type";
            } else {
                nc.wrongFile = "";
            }
            if (file === null) {
                nc.wrongFile = "Incorrect file size: 2MB or less";
            } else {
                nc.wrongFile = "";
            }
        }

        function removeIng(n) {
            nc.ingredients.splice(n, 1);
        }

        function removeIns(n) {
            nc.instructions.splice(n, 1);
        }

        function editName(){

        }

    }
}());
