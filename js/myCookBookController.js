(function(){
    'use strict';

    angular.module('myCookBookController', [])
        .controller('myCookBookController', myCookBookController);

    myCookBookController.$inject = ['recipeService'];

    function myCookBookController(recipeService) {
        // list everything
        var mcc = this;
        mcc.loggedin = recipeService.loggedin;
        mcc.recipes = recipeService.recipes;
        mcc.cookbook = recipeService.cookbooks;
        mcc.myCookbook = "";


        // define functions


    }

}());