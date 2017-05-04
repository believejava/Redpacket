angular.module('npmtApp').controller('redpacketInfoController',['$http', '$rootScope', '$scope','redpacketInfoService',
    function($http,$rootScope,$scope,redpacketInfoService) {
	 $rootScope.selectedTitle = "红包信息管理";

	  $scope.getRedpacketInfo = function(){
      redpacketInfoService.getRedpacketInfoServ().then(function(response){
	   	if (response.status = 200 ) {
	   		$scope.rdpacketInfo = response.data;
	   	}
	  }, function (error) {
	  	console.log(error);
	  });
    }

    $scope.getRedpacketInfo();
}]);
