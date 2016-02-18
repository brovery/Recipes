/**
 * Created by danielgraff1 on 2/17/16.
 */
(function(){
    'use strict';

    angular.module('loginController', [])
        .controller('loginController', loginController);

loginController.$inject = ['$timeout'];

function loginController($timeout) {

    // controller data and functions
    var lc = this;
    lc.email = "";
    lc.password = "";
    lc.googleLogin = googleLogin;
    lc.deleteGoogleData = deleteGoogleData;
    lc.nativeLogin = nativeLogin;

    lc.gData = 'firebase:session::recipe-app.firebaseio.com';
    // if google data is found in local storage, use it
    lc.message = lc.gData && lc.gData.google ? "Logged in to Google." : "No Google data found.";

    // IMPORTANT: change to match the URL of your Firebase.
    var url = 'https://recipe-app.firebaseio.com';

    // use Firebase library to login to google
    function googleLogin() {
        var ref = new Firebase(url);
        ref.authWithOAuthPopup('google', function (error, authData) {
            if (error) {
                console.log('Log in to Google Failed', error);
                lc.message = 'Log in to Google Failed. ' + error;
            } else {
                console.log('Logged in to Google');
                lc.message = 'Logged in to Google.';
                $timeout(function () { // invokes $scope.$apply()
                    lc.gData = authData;
                });
            }
        });
    }

    // this removes google data from local storage
    // to FULLY logout, you MUST go to google.com and logout
    function deleteGoogleData() {
        lc.gData = {};
        lc.message = 'google data deleted.';
    }

    function nativeLogin() {
        console.log('logging in');
        var ref = new Firebase(url);
        if(lc.email !== "" || lc.password !== ""){


            ref.authWithPassword({
            email: lc.email,
            password: lc.password
        }, function(error, authData) { console.log(error + authData); }, {
            remember: "sessionOnly"
        });
    }}
}

    // bug alert: this delete function sometimes does NOT reset the local storage,
    // so a page refresh finds google data in localstorage.

}());
