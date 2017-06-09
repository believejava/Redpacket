angular.module('npmtApp').factory('appService', ['$http','$rootScope', '$interval','BATH_PATH','$cookies',
	function($http,$rootScope,$interval,BATH_PATH,$cookies) {
		var o = {
			tokenResponse: null,
			getToken: function() {	
				var now = (new Date()).getTime();
				var self = this;

				if (this.requesting && this.promise) {
					return this.promise;
				}
				if (!this.tokenResponse || ((now - this.tokenResponse.timestamp) / 1000 >= this.tokenResponse.expires_in)) {
					var tokenurl = BATH_PATH +'auth/login';
					var tokenHeader = {
						'Content-Type': 'application/json; charset=UTF-8',
						'Accept': 'application/json;'
					};
					var tokenParameter = {
						username: $cookies.get('username'),
						password: $cookies.get('password')
					}

					this.promise = $http({
						method: 'POST',
						url: tokenurl,
						data: tokenParameter,
						headers: tokenHeader
					});
					this.requesting = true;
					this.promise.then(function(response) {
						self.requesting = false;
						console.debug(response);
						self.tokenResponse = response.data;
                        self.tokenResponse.expires_in = 36000;
						self.tokenResponse.timestamp = (new Date()).getTime();
					}, function(response) {
						self.requesting = false;
						console.error(response);
					});
					return this.promise;
				} else {
					return self.tokenResponse;
				}

			},
            getCityListServ: function(){
                var url = BATH_PATH + "city/";
                var promise = $http({
                    method: 'GET',
                    url: url
                });
                
                return promise;
            }   	
			

		};
		return o;
	}
]);