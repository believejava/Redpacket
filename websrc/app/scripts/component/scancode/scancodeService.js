angular.module('npmtApp').factory('scancodeService',['$http', '$rootScope','$state','BATH_PATH',
    function($http,$rootScope,$state,BATH_PATH) {
   
    	return {
    		getProductbatchServ: function(){
    			var url = BATH_PATH + "product/";
    			var promise = $http({
    				method: 'GET',
    				url: url
    			});
    			
    			return promise;
    		},

            updateEnableScanServ: function(params){
                var url = BATH_PATH + "productDetail/updateEnable/";
                var promise = $http({
                    method: 'PUT',
                    url: url,
                    data: JSON.stringify(params)
                });
                
                return promise;
            }   
        }
    }]);
