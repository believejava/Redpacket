angular.module('npmtApp').factory('userInfoService',['$http', '$rootScope','$state','BATH_PATH',
    function($http,$rootScope,$state,BATH_PATH) {
   
    	return {
    		getWechatUserInfoServ: function(){
    			var url = BATH_PATH + "wechatUser/";
    			var promise = $http({
    				method: 'GET',
    				url: url
    			});
    			
    			return promise;
    		}
    	}
}]);
