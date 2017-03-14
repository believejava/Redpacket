'use strict';
var npmtApp = angular.module('npmtApp', ['ui.router']);

npmtApp.config(function($stateProvider, $urlRouterProvider){
	
	$stateProvider.state('index', {
		url : '/index',
		templateUrl : 'index.html'
	}).state('404', {
		url : '/404',
		templateUrl : '404.html'
	}).state('test', {
		url : '/test',
		templateUrl : "views/test.html"
	});

	$urlRouterProvider.otherwise('/index');
});