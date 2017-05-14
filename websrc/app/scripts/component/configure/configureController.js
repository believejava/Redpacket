angular.module('npmtApp').controller('configureController',['$http', '$rootScope', '$scope','configureService',
    function($http,$rootScope,$scope,configureService) {
   $rootScope.selectedTitle = "配置项管理";


   	$scope.getConfigInfo = function(){
      configureService.getConfigInfoServ().then(function(response){
	   	if (response.status = 200 ) {
	   		$scope.configInfo = response.data;
	   	}
	  }, function (error) {
	  	console.log(error);
	  });
    }

    $scope.getConfigInfo();

   
}]);
