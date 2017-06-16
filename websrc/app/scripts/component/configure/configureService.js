angular.module('npmtApp').factory('configureService',['$http', '$rootScope','$state','BATH_PATH',
    function($http,$rootScope,$state,BATH_PATH) {
   
    	return {
    		getConfigInfoServ: function(){
    			var url = BATH_PATH + "option/";
    			var promise = $http({
    				method: 'GET',
    				url: url
    			});
    			
    			return promise;
    		},
            updateConfigInfoServ: function(params){
                var url = BATH_PATH + "option/" + params.id;
                var promise = $http({
                    method: 'PUT',
                    url: url,
                    data: JSON.stringify(params)
                });
                
                return promise;
            }
 
        }
    }]);
