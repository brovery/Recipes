(function(){
    'use strict';

    angular.module('homeController', [])
        .controller('homeController', homeController);

    homeController.$inject = ['homeService'];

    function homeController(homeService) {

        // list everything
        var hc = this;
        hc.sometext = homeService.getText();
        hc.clearText = clearText;
        hc.updateText = updateText;

        // define functions
        function clearText() {
            hc.sometext = homeService.clearText();
        }
        function updateText() {
            homeService.setText(hc.sometext);
        }
    }

}());
