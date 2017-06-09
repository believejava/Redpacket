angular.module('npmtApp').factory('loginService',['$http', '$rootScope','$state','BATH_PATH',
    function($http,$rootScope,$state,BATH_PATH) {
   
    	return {

            getAuthToken: function(params){
                var url = BATH_PATH + "auth/login";
                var tokenHeader = {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json;'
                };
                var promise = $http({
                    method: 'POST',
                    url: url,
                    data: JSON.stringify(params),
                    headers: tokenHeader
                });
                
                return promise;
            }	
    	}
}]);
