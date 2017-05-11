'use strict';
var npmtApp = angular.module('npmtApp', ['ui.router', 'isteven-multi-select', 'ngMessages']);

npmtApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
	$locationProvider.html5Mode(false);
	$urlRouterProvider.otherwise('/batch');
	$stateProvider.state('configure', {
		url : '/configure',
		templateUrl : "views/configure.html",
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
        controller : "redpacketInfoController",
        resolve: {
            appService:'appService',
            token: function(appService) {
                return appService.getToken();
            }
         }
    }).state('login', {
        url : '/login',
        templateUrl : "views/login.html"
    });

});