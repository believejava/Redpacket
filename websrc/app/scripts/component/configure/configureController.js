angular.module('npmtApp').controller('configureController',['$http', '$rootScope', '$scope','configureService','$location','$timeout',
    function($http,$rootScope,$scope,configureService,$location,$timeout) {
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

    $timeout(function () {
          $("#page-content-wrapper").removeClass("ml-0");
          $('#configure-id').addClass('active');
          $('#configure-id').siblings().removeClass('active');
    },200);

   
}]);
