(function () {
    'use strict';

    angular.module('newCtrl', [])
        .controller('newCtrl', newCtrl);

    newCtrl.$inject = ['recipeService', '$firebaseArray', '$firebaseObject', 'Upload', '$timeout'];

    function newCtrl(recipeService, $firebaseArray, $firebaseObject,  Upload, $timeout) {

        var url = 'https://intense-fire-2508.firebaseio.com/';
        var reciperef = new Firebase(url + "/Recipes");
        var imageref = new Firebase(url + "/images");

        // list everything
        var nc = this;
        nc.fireRecipes = $firebaseArray(reciperef);
        nc.fireImage = $firebaseObject(imageref);
        var recipe = function () {
            this.name = "";
            this.image = "";
            this.prepTime = "";
            this.cookTime = "";
            this.ingredients = [];
            this.instructions = [];
            this.category = '';
            this.private = false;
        };
        nc.files = "";
        nc.name = '';
        nc.ingredients = [];
        nc.instructions = [];
        nc.prepTime = "";
        nc.cookTime = "";
        nc.category = "";
        nc.privacy = false;
        nc.createRecipe = createRecipe;

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
                newRecipe.instructions.push({instructions: nc.instructions[i].name});
            }
            console.log(newRecipe);
            addRecipe(newRecipe);

        }

        function addRecipe(recipe) {
            nc.fireRecipes.$add(recipe);

        }


        nc.loading = undefined;
        nc.upload = upload;

        function upload(files, event, rejectedFiles, anotherCustomParam) {

            for (var r in rejectedFiles) {
                console.log(rejectedFiles[r]);
            }
            nc.loading = true;

            if (files) {

                files.upload = Upload.upload({
                    url: nc.fireImage,
                    data: files
                });

                files.upload.then(function (response) {
                    $timeout(function () {
                        files.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    files.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });

               /* if (files && files.length) {
                console.log('In');
                for (var i = 0; i < files.length; i++) {
                    (function (index) {
                        var file = files[i];
                        nc.upload[index] = Upload.upload({
                            url: nc.fireImage, // webapi url
                            method: 'POST',
                            data: {file: file}
                        }).progress(function (evt) {
                            // set upload percentage
                            file.progress = parseInt(100.0 * evt.loaded / evt.total);
                        }).success(function (data, status, headers, config) {
                            // file is uploaded successfully
                            file.complete = true;
                        }).error(function (data, status, headers, config) {
                            // file failed to upload
                            file.error = true;
                            console.log(data);
                            console.log(status);
                        });
                    })(i);
                }*/

            }
        }
    }

}());
