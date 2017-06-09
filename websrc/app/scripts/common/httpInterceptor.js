var app = angular.module('npmtApp');
app.factory('httpInterceptor', ['$timeout', '$q', '$rootScope', '$injector', '$stateParams',
	function($timeout, $q, $rootScope, $injector, $stateParams) {
		return {
			// optional method
			'request': function(config) {
				console.debug('request:%s', config.url);
				console.time(config.url);
				if (!config.headers["X-Authorization"] && config.url.indexOf('.html') < 0 && config.url.indexOf('.json') < 0 ) {
					if (config.url.indexOf('login') < 0) {
						var appService = $injector.get('appService');
						$q.when(appService.getToken(), function(tokenResponse) {
							config.headers["X-Authorization"] = "Bearer "+tokenResponse.token;
							config.headers["X-Requested-With"] = "XML HttpRequest";
							config.headers["Content-Type"] = "application/json";
						});
					}
				}
				return config;
			},

			// optional method
			'requestError': function(rejection) {
				console.timeEnd(rejection.config.url);
				return $q.reject(rejection);
			},

			// optional method
			'response': function(response) {
				console.timeEnd(response.config.url);
				console.debug('response:%s', response.config.url);

				if (response.status < 200 || response.status >= 300) {
					console.error('http response code is not correct %d', response.status);
				} else {
					var data = response.data;
				}
				return response;
			},

			// optional method
			'responseError':  function(rejection) { 
			    console.timeEnd(rejection.config.url);
				console.log(rejection);
				console.debug('responseError:%s,%d', rejection.config.url, rejection.status);
		        if (rejection.status == 401) {
			        var rootScope = $injector.get('$rootScope'); 
			        rootScope.showErrorLoginfo = true; 
			        rootScope.$state.go("login"); 
					return $q.reject(rejection);
		        } else if (rejection.status === 404) {
		          return $q.reject(rejection); 
		        } 
		      }
		}
	}
]);
app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
}]);