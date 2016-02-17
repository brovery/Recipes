/**
 * Created by danielgraff1 on 2/17/16.
 */
var app = angular.module('app', ['ngStorage']);

app.config(['$localStorageProvider',
    function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('');
    }]);

app.controller('loginController', loginController);

loginController.$inject = ['$timeout', '$localStorage'];

function loginController($timeout, $localStorage) {

    // controller data and functions
    var lc = this;
    lc.facebookLogin = facebookLogin;
    lc.deleteFacebookData = deleteFacebookData;

    lc.fbData = $localStorage['firebase:session::blistering-inferno-875'];
    // if facebook data is found in local storage, use it
    lc.message = lc.fbData && lc.fbData.facebook ? "Logged in to Facebook." : "No Facebook data found.";

    // IMPORTANT: change to match the URL of your Firebase.
    var url = 'https://blistering-inferno-875.firebaseio.com';

    // use Firebase library to login to facebook
    function facebookLogin() {
        var ref = new Firebase(url);
        ref.authWithOAuthPopup('facebook', function (error, authData) {
            if (error) {
                console.log('Log in to Facebook Failed', error);
                lc.message = 'Log in to Facebook Failed. ' + error;
            } else {
                console.log('Logged in to Facebook');
                lc.message = 'Logged in to Facebook.';
                $timeout(function() { // invokes $scope.$apply()
                    lc.fbData = authData;
                });
            }
        });
    }

    // this removes facebook data from local storage
    // to FULLY logout, you MUST go to facebook.com and logout
    function deleteFacebookData() {
        $localStorage.$reset();
        lc.fbData = {};
        lc.message = 'Facebook data deleted.'
    }
    // bug alert: this delete function sometimes does NOT reset the local storage,
    // so a page refresh finds facebook data in localstorage.
}