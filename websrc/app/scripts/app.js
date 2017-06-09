'use strict';
var npmtApp = angular.module('npmtApp', ['ui.router', 'isteven-multi-select', 'ngMessages','ui.bootstrap','ngCookies']);

npmtApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
	$locationProvider.html5Mode(false);
	$urlRouterProvider.otherwise('/batch');
	$stateProvider.state('configure', {
		url : '/configure',
		templateUrl : "views/configure.html",
        cache:false,
        controller : "configureController",
        resolve: {
            appService:'appService',
            token: function(appService) {
                return appService.getToken();
            }
         }
	}).state('scancode', {
        url : '/scancode',
        templateUrl : "views/scancode.html",
        cache:false,
        controller : "scancodeController",
        resolve: {
            appService:'appService',
            token: function(appService) {
                return appService.getToken();
            }
         }
    }).state('batch', {
        url : '/batch',
        templateUrl : "views/batch.html",
        cache:false,
		controller : "batchController",
        resolve: {
            appService:'appService',
            token: function(appService) {
                return appService.getToken();
            }
         }
    }).state('userInfo', {
        url : '/userinfo',
        templateUrl : "views/userInfo.html",
        cache:false,
        controller : "userInfoController",
        resolve: {
            appService:'appService',
            token: function(appService) {
                return appService.getToken();
            }
         }
    }).state('redpacketInfo', {
        url : '/redpacketinfo',
        templateUrl : "views/redpacketInfo.html",
        cache:false,
        controller : "redpacketInfoController",
        resolve: {
            appService:'appService',
            token: function(appService) {
                return appService.getToken();
            }
         }
    }).state('login', {
        url : '/login',
        templateUrl : "views/login.html",
        cache:false,
        controller : "loginController"
    });

});