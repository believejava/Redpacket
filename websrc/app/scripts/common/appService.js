angular.module('npmtApp').factory('appService', ['$http', '$interval',
	function($http, $interval) {
		var o = {
			tokenResponse: null,
			getToken: function() {	
				var now = (new Date()).getTime();
				var self = this;

				if (this.requesting && this.promise) {
					return this.promise;
				}
				if (!this.tokenResponse || ((now - this.tokenResponse.timestamp) / 1000 >= this.tokenResponse.expires_in)) {
					var tokenurl = 'http://localhost:8080/api/auth/login';
					var tokenHeader = {
						'Content-Type': 'application/json; charset=UTF-8',
						'Accept': 'application/json;'
					};
					var tokenParameter = {
						username: "liudonghua",
						password: "liudonghua"
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

			}
			

		};
		return o;
	}
]);