angular.module('npmtApp').controller('userInfoController',['$http', '$rootScope', '$scope','userInfoService',
    function($http,$rootScope,$scope,userInfoService) {
  
    $rootScope.selectedTitle = "用户信息管理";
    
    $scope.getWechatUserInfo = function(){
      userInfoService.getWechatUserInfoServ().then(function(response){
	   	if (response.status = 200 ) {
	   		$scope.wechatUserInfo = response.data;
	   	}
	  }, function (error) {
	  	console.log(error);
	  });
    }

   $scope.getWechatUserInfo();
}]);
