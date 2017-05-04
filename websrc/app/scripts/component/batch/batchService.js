angular.module('npmtApp').factory('batchService',['$http', '$rootScope','$state',
    function($http,$rootScope,$state) {
   
    	return {
    		getProductbatch: function(){
    			var url = "http://localhost:8080/api/product/";
    			var promise = $http({
    				method: 'GET',
    				url: url
    			});
    			
    			return promise;
    		}	
    	}
}]);
