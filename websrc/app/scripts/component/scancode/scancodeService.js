angular.module('npmtApp').factory('scancodeService',['$http', '$rootScope','$state',
    function($http,$rootScope,$state) {
   
    	return {
    		getProductbatchServ: function(){
    			var url = "http://localhost:8080/api/product/";
    			var promise = $http({
    				method: 'GET',
    				url: url
    			});
    			
    			return promise;
    		}	
    	}
}]);
