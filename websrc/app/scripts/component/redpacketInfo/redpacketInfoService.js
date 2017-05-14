angular.module('npmtApp').factory('redpacketInfoService',['$http', '$rootScope','BATH_PATH',
    function($http,$rootScope,BATH_PATH) {
   
    	return {
    		getRedpacketInfoServ: function(){
    			var url = BATH_PATH + "redPacket/";
    			var promise = $http({
    				method: 'GET',
    				url: url
    			});
    			
    			return promise;
    		}	
    	}
}]);
