angular.module('npmtApp').factory('batchService',['$http', '$rootScope','$state',
    function($http,$rootScope,$state) {
   
    	return {
    		getProductbatchServ: function(){
    			var url = "http://localhost:8080/api/product/";
    			var promise = $http({
    				method: 'GET',
    				url: url
    			});
    			
    			return promise;
    		},

            addProductBatchServ: function(params){
                var url = "http://localhost:8080/api/product/";
                var promise = $http({
                    method: 'POST',
                    url: url,
                    data: JSON.stringify(params)
                });
                
                return promise;
            }	
    	}
}]);
