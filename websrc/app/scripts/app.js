'use strict';
var npmtApp = angular.module('npmtApp', ['ui.router', 'isteven-multi-select', 'ngMessages','ui.bootstrap','ngCookies']);

npmtApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
	$locationProvider.html5Mode(false);
	$urlRouterProvider.otherwise('/batch');
	$stateProvider.state('configure', {
		url : '/admin/configure',
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
        url : '/admin/scancode',
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
        url : '/admin/batch',
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
        url : '/admin/userinfo',
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
        url : '/admin/redpacketinfo',
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
        url : '/admin/login',
        templateUrl : "views/login.html",
        cache:false,
        controller : "loginController"
    });

});