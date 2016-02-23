/**
 * Created by danielgraff1 on 2/17/16.
 */
(function () {
    'use strict';

    angular.module('loginController', [])
        .controller('loginController', loginController);

    loginController.$inject = ['$timeout', 'recipeService', '$localStorage'];

    function loginController($timeout, recipeService, $localStorage) {

        // controller data and functions
        var lc = this;
        lc.email = "";
        lc.password = "";
        lc.createEmail = "";
        lc.createPassword = "";
        lc.oldEmail = "";
        lc.oldPassword = "";
        lc.newEmail = "";
        lc.newPassword = "";
        lc.loginHide = false;
        lc.successHide = false;
        lc.failHide = false;
        lc.googleLogin = googleLogin;
        lc.deleteGoogleData = deleteGoogleData;
        lc.githubLogin = githubLogin;
        lc.deleteGithubData = deleteGithubData;
        lc.nativeLogin = nativeLogin;
        lc.create = create;
        lc.changeEmail = changeEmail;
        lc.changePassword = changePassword;
        lc.loggedin = recipeService.loggedin;
        lc.gData = $localStorage['firebase:session::geo-recipes.firebaseio.com'];
        // if google data is found in local storage, use it
        lc.message = lc.gData && lc.gData.google ? "Logged in to Google." : "No Google data found.";
        lc.ghData = $localStorage['firebase:session::geo-recipes.firebaseio.com'];
        // if google data is found in local storage, use it
        lc.message = lc.ghData && lc.ghData.github ? "Logged in to GitHub." : "No GitHub data found.";

        // IMPORTANT: change to match the URL of your Firebase.
        var url = 'https://geo-recipes.firebaseio.com/';

//Google
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
                    lc.loginHide = true;
                    lc.loginHideGoogle = true;
                    $timeout(function () { // invokes $scope.$apply()
                        lc.gData = authData;
                        recipeService.loggedin.user = authData.uid;
                        recipeService.loggedin.loggedin = true;
                    });
                }
            });
        }

        // this removes google data from local storage
        // to FULLY logout, you MUST go to google.com and logout
        function deleteGoogleData() {
            $localStorage.$reset();
            lc.gData = {};
            lc.message = 'google data deleted.';
            recipeService.loggedin.user = "";
            recipeService.loggedin.loggedin = false;
        }

//Github
        // use Firebase library to login to github
        function githubLogin() {
            var ref = new Firebase(url);
            ref.authWithOAuthPopup('github', function (error, authData) {
                if (error) {
                    console.log('Log in to github Failed', error);
                    lc.message = 'Log in to github Failed. ' + error;
                } else {
                    console.log('Logged in to github');
                    lc.message = 'Logged in to github.';
                    lc.loginHide = true;
                    lc.loginHideGithub = true;
                    $timeout(function () { // invokes $scope.$apply()
                        lc.ghData = authData;
                        recipeService.loggedin.user = authData.uid;
                        recipeService.loggedin.loggedin = true;
                    });
                }
            });
        }

        // this removes github data from local storage
        // to FULLY logout, you MUST go to github.com and logout
        function deleteGithubData() {
            $localStorage.$reset();
            lc.ghData = {};
            lc.message = 'github data deleted.';
            recipeService.loggedin.user = "";
            recipeService.loggedin.loggedin = false;
        }

//Native login
        function nativeLogin() {
            console.log('logging in');
            var ref = new Firebase(url);
            if (lc.email !== "" || lc.password !== "") {


                ref.authWithPassword({
                    email: lc.email,
                    password: lc.password
                }, function (error, authData) {
                    console.log(error + authData);
                    if (error !== null) {
                        var wrong = "Bad username or Password";
                    } else {
                        $timeout(function () {
                            lc.loginHide = true;
                            lc.loginHideNative = true;
                            recipeService.loggedin.user = authData.uid;
                            recipeService.loggedin.loggedin = true;
                        });
                    }
                }, {
                    remember: "sessionOnly"

                });
            }
        }

//Create native user - https://www.firebase.com/docs/web/guide/login/password.html
        function create() {
            var ref = new Firebase(url);
            ref.createUser({
                email: lc.createEmail,
                password: lc.createPassword
            }, function (error, userData) {
                $timeout(function () {
                    if (error) {
                        console.log("Error creating user:", error);
                        lc.failHide = true;
                        lc.failLoginHide = true;
                        lc.successHide = false;
                    } else {
                        console.log("Successfully created user account with uid:", userData.uid);
                        lc.successHide = true;
                        lc.failHide = false;
                    }
                });
            });
        }

//Change email - https://www.firebase.com/docs/web/guide/login/password.html
        function changeEmail() {
            var ref = new Firebase(url);
            ref.changeEmail({
                oldEmail: lc.oldEmail,
                newEmail: lc.newEmail,
                password: lc.password
            }, function (error) {
                $timeout(function () {
                    if (error === null) {
                        console.log("Email changed successfully");
                        lc.successHide = true;
                        lc.failHide = false;

                    } else {
                        console.log("Error changing email:", error);
                        lc.failHide = true;
                        lc.emailFail = true;
                        lc.successHide = false;
                    }
                });
            });
        }

//Change password - https://www.firebase.com/docs/web/guide/login/password.html
        function changePassword() {
            var ref = new Firebase(url);
            ref.changePassword({
                email: lc.email,
                oldPassword: lc.oldPassword,
                newPassword: lc.newPassword,
            }, function (error) {
                $timeout(function () {
                    if (error === null) {
                        console.log("Password changed successfully");
                        lc.successHide = true;
                        lc.failHide = false;
                    } else {
                        console.log("Error changing password:", error);
                        lc.failHide = true;
                        lc.passFail = true;
                        lc.successHide = false;
                    }
                });
            });
        }
    }
}());
