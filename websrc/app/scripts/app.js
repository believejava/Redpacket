'use strict';
var npmtApp = angular.module('npmtApp', ['ui.router']);

npmtApp.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
	$locationProvider.html5Mode(false);
	$urlRouterProvider.otherwise('/batch');
	$stateProvider.state('configure', {
		url : '/configure',
		templateUrl : "views/configure.html",
        controller : "configureController"
	}).state('batch', {
        url : '/batch',
        templateUrl : "views/batch.html",
		controller : "batchController"
    }).state('userInfo', {
        url : '/userinfo',
        templateUrl : "views/userInfo.html",
        controller : "userInfoController"
    }).state('redpacketInfo', {
        url : '/redpacketinfo',
        templateUrl : "views/redpacketInfo.html",
        controller : "redpacketInfoController"
    });

});