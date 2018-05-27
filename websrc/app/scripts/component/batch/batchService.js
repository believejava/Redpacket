angular.module('npmtApp').factory('batchService',['$http', '$rootScope','$state','BATH_PATH',
    function($http,$rootScope,$state,BATH_PATH) {
   
    	return {
    		getProductbatchServ: function() {
    			var url = BATH_PATH + "product/";
    			var promise = $http({
    				method: 'GET',
    				url: url
    			});
    			
    			return promise;
    		},

            addProductBatchServ: function(params) {
                var url = BATH_PATH + "product/";
                var promise = $http({
                    method: 'POST',
                    url: url,
                    data: JSON.stringify(params)
                });
                
                return promise;
            },

            updateProductBatchServ: function(params) {
                var url = BATH_PATH + "product/" + params.id;
                var promise = $http({
                    method: 'PUT',
                    url: url,
                    data: JSON.stringify(params)
                });
                
                return promise;
            }	
    	}
}]);
