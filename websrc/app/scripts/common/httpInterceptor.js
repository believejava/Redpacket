angular.module('npmtApp').factory('httpInterceptor', ['$timeout', '$q', '$rootScope', '$injector', '$stateParams', 'SOURCE', 'SYSTEM_ERROR', 'SESSION_ERROR', 'BOX_ERROR',
	function($timeout, $q, $rootScope, $injector, $stateParams, SOURCE, SYSTEM_ERROR, SESSION_ERROR, BOX_ERROR) {
		$rootScope.loadingCounter = 0;
		$rootScope.errorDialogCounter = 0;
		$rootScope.acceptNotification = true;
		return {
			// optional method
			'request': function(config) {
				if (!config.skipMask ) {
					$rootScope.loadingCounter++;
				}
				console.debug('request:%s,%d', config.url, $rootScope.loadingCounter);
				console.time(config.url);
				
				if (config.headers.SG_Token == null && config.url.indexOf('.html') < 0 && config.url.indexOf('.json') < 0 && config.url.indexOf('/servlet/sg/users/v6/user/sgredirect/getCurrent') < 0) {
					
					if (config.url.indexOf('token') < 0 && config.url.indexOf('faces.tap.ibm.com') < 0) {
						var appService = $injector.get('appService');
						$q.when(appService.getToken(), function(tokenResponse) {
							config.headers.SG_Token = tokenResponse.access_token;
						});
						
						config.params = config.params || {};
						if (!config.params.source) {
							config.params.source = SOURCE;
						};
						
						if (!config.params.userID) {
							$q.when(appService.getCurrentUser(), function(response) {
								config.params.userID = response.username;
							});
						}

					}
				}
				return config;
			},

			// optional method
			'requestError': function(rejection) {
				if (!rejection.config.skipMask) {
					$rootScope.loadingCounter--;
				}
				console.timeEnd(rejection.config.url);
				console.debug('requestError:%d', $rootScope.loadingCounter);
				return $q.reject(rejection);
			},

			// optional method
			'response': function(response) {
				if (!response.config.skipMask) { // && !isHtmlUrl
					$rootScope.loadingCounter--;
				}

				console.timeEnd(response.config.url);
				console.debug('response:%s,%d', response.config.url, $rootScope.loadingCounter);

				if (response.status < 200 || response.status >= 300) {
					console.error('http response code is not correct %d', response.status);
				} else {
					var data = response.data;
					if (data.code == 'EA3') {
						var appService = $injector.get('appService');
						appService.tokenResponse = null;
						var deferred = $q.defer();
						$q.when(appService.getToken()).then(function() {
							var $http = $injector.get('$http');
							$http(response.config).then(function(response) {
								deferred.resolve(response);
							}, function(response) {
								deferred.reject(response);
							})
						}, function(response) {
							isgDialogService.showError({
								message: {
									errorInfo: SESSION_ERROR,
									errorDetail: data.message
								},
								buttons: [{
									text: 'Close',
									fn: function() {
										window.location.reload();
									}
								}]
							});
						});
						return deferred.promise;
					}

					if (data.code && data.code != 'L00' && $rootScope.errorDialogCounter <= 0 && !response.config.preserveBusinessError && $rootScope.acceptNotification) {
						$rootScope.errorDialogCounter++;
						var isgDialogService = $injector.get('isgDialogService');
		
						if(data.code == 'EB0'){
							isgDialogService.showError({
								message: {
									errorInfo: BOX_ERROR,
									errorDetail: data.message
								},
								buttons: [{
									text: 'Close',
									fn: function() {
										isgDialogService.close();
										$rootScope.errorMes = "";
										var basePath = window.location.href.substr(0, window.location.href.indexOf("/sgredirect"));
										window.location.href = basePath + "/search";
									}
								}]
							});
						}
					}
				}
				return response;
			},

			// optional method
			'responseError': function(rejection) {
				if (!rejection.config.skipMask) {
					$rootScope.loadingCounter--;
				}

				console.timeEnd(rejection.config.url);
				console.error(rejection);
				console.debug('responseError:%s,%d,%d', rejection.config.url, rejection.status, $rootScope.loadingCounter);
				return $q.reject(rejection);
			}
		}
	}
]);
app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
}]);