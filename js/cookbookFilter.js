(function() {
    "use strict";

    angular
        .module('app.filters')
        .filter('cookbook', cookbook);

    function cookbook() {
        return function(input) {
            return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        };
    }
})();