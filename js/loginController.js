/**
 * Created by danielgraff1 on 2/16/16.
 */
var app = angular.module('app', ['ngStorage']);

app.config(['$localStorageProvider',
    function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('');
    }]);

app.controller('MainController', MainController);

MainController.$inject = ['$timeout', '$localStorage'];

function MainController($timeout, $localStorage) {

    // Facebook controller data and functions
    var vm = this;
    vm.facebookLogin = facebookLogin;
    vm.deleteFacebookData = deleteFacebookData;
    vm.googleLogin = googleLogin;
    vm.deletegoogleData = deletegoogleData;
    vm.githubLogin = githubLogin;
    vm.deletegithubData = deletegithubData;

    vm.fbData = $localStorage['firebase:session::blistering-inferno-875'];
    // if facebook data is found in local storage, use it
    vm.message = vm.fbData && vm.fbData.facebook ? "Logged in to Facebook." : "No Facebook data found.";

    // IMPORTANT: change to match the URL of your Firebase.
    var url = 'https://blistering-inferno-875.firebaseio.com';

    // use Firebase library to login to facebook
    function facebookLogin() {
        var ref = new Firebase(url);
        ref.authWithOAuthPopup('facebook', function (error, authData) {
            if (error) {
                console.log('Log in to Facebook Failed', error);
                vm.message = 'Log in to Facebook Failed. ' + error;
            } else {
                console.log('Logged in to Facebook');
                vm.message = 'Logged in to Facebook.';
                $timeout(function() { // invokes $scope.$apply()
                    vm.fbData = authData;
                });
            }
        });
    }

//            Google controller data and functions
    var vm = this;
    vm.googleLogin = googleLogin;
    vm.deletegoogleData = deletegoogleData;

    vm.fbData = $localStorage['firebase:session::blistering-inferno-875'];
    // if google data is found in local storage, use it
    vm.message = vm.fbData && vm.fbData.google ? "Logged in to google." : "No google data found.";

    // IMPORTANT: change to match the URL of your Firebase.
    var url = 'https://blistering-inferno-875.firebaseio.com';

    // use Firebase library to login to google
    function googleLogin() {
        var ref = new Firebase(url);
        ref.authWithOAuthPopup('google', function (error, authData) {
            if (error) {
                console.log('Log in to google Failed', error);
                vm.message = 'Log in to google Failed. ' + error;
            } else {
                console.log('Logged in to google');
                vm.message = 'Logged in to google.';
                $timeout(function() { // invokes $scope.$apply()
                    vm.fbData = authData;
                });
            }
        });
    }

//            Github controller data and functions
    var vm = this;
    vm.githubLogin = githubLogin;
    vm.deletegithubData = deletegithubData;

    vm.fbData = $localStorage['firebase:session::blistering-inferno-875'];
    // if github data is found in local storage, use it
    vm.message = vm.fbData && vm.fbData.github ? "Logged in to github." : "No github data found.";

    // IMPORTANT: change to match the URL of your Firebase.
    var url = 'https://blistering-inferno-875.firebaseio.com';

    // use Firebase library to login to github
    function githubLogin() {
        var ref = new Firebase(url);
        ref.authWithOAuthPopup('github', function (error, authData) {
            if (error) {
                console.log('Log in to github Failed', error);
                vm.message = 'Log in to github Failed. ' + error;
            } else {
                console.log('Logged in to github');
                vm.message = 'Logged in to github.';
                $timeout(function() { // invokes $scope.$apply()
                    vm.fbData = authData;
                });
            }
        });
    }

    // this removes facebook data from local storage
    // to FULLY logout, you MUST go to facebook.com and logout
    function deleteFacebookData() {
        $localStorage.$reset();
        vm.fbData = {};
        vm.message = 'Facebook data deleted.'
    }

    function deletegoogleData() {
        $localStorage.$reset();
        vm.fbData = {};
        vm.message = 'google data deleted.'
    }

    function deletegithubData() {
        $localStorage.$reset();
        vm.fbData = {};
        vm.message = 'github data deleted.'
    }
    // bug alert: this delete function sometimes does NOT reset the local storage,
    // so a page refresh finds facebook data in localstorage.
}