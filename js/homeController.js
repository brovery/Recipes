(function(){
    'use strict';

    angular.module('homeController', [])
        .controller('homeController', homeController);

    homeController.$inject = ['homeService', 'recipeService'];

    function homeController(homeService, recipeService) {

        // list everything
        var hc = this;
        hc.sometext = homeService.getText();
        hc.clearText = clearText;
        hc.updateText = updateText;
        hc.initializeFirebase = initializeFirebase;

        // define functions
        function clearText() {
            hc.sometext = homeService.clearText();
        }
        function updateText() {
            homeService.setText(hc.sometext);
        }

        function initializeFirebase() {
            console.log("controller - add recipe");
            recipeService.initializeFirebase();
        }
    }

}());
