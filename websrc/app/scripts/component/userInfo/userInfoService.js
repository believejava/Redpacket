angular.module('npmtApp').factory('userInfoService',['$http', '$rootScope','$state',
    function($http,$rootScope,$state) {
   
    	return {
    		getWechatUserInfoServ: function(){
    			var url = "http://localhost:8080/api/wechatUser/";
    			var promise = $http({
    				method: 'GET',
    				url: url
    			});
    			
    			return promise;
    		}
    	}
}]);
