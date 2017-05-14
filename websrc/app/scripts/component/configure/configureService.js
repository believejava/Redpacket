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
 
        }
    }]);
