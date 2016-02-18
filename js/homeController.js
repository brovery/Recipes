(function(){
    'use strict';

    angular.module('homeController', [])
        .controller('homeController', homeController);

    homeController.$inject = ['recipeService'];

    function homeController(recipeService) {

        // list everything
        var hc = this;
        hc.recipes = recipeService.recipes;


        // define functions



    }

}());
