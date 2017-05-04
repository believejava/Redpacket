angular.module('npmtApp').factory('redpacketInfoService',['$http', '$rootScope',
    function($http,$rootScope) {
   
    	return {
    		getRedpacketInfoServ: function(){
    			var url = "http://localhost:8080/api/redPacket/";
    			var promise = $http({
    				method: 'GET',
    				url: url
    			});
    			
    			return promise;
    		}	
    	}
}]);
