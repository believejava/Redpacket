angular.module('npmtApp').controller('userInfoController',['$http', '$rootScope', '$scope','userInfoService','appService',
    function($http,$rootScope,$scope,userInfoService,appService) {
  
    $rootScope.selectedTitle = "用户信息管理";


    $scope.maxSize = 3;
 	$scope.currentPage = 1;
  	$scope.itemPerPage = 1;
  	$scope.splitedWechatUserInfo = [];

  	$scope.splitResults = function (results, itemPerPage){
   		var splitedResults = [];
   		for(var i = 0; i < results.length; i += itemPerPage)
   			splitedResults.push(results.slice(i, i+itemPerPage));
   		return splitedResults;
    }
    
    $scope.getWechatUserInfo = function(){
      userInfoService.getWechatUserInfoServ().then(function(response){
	   	if (response.status = 200 ) {
	   		$scope.splitedWechatUserInfo = $scope.splitResults(response.data, $scope.itemPerPage);
	   	}
	  }, function (error) {
	  	console.log(error);
	  });
    }

	$scope.getCityList = function(){
      appService.getCityListServ().then(function(response){
	   	if (response.status = 200 ) {
	   		$scope.modernBrowsers = response.data;
	   	}
	  }, function (error) {
	  	console.log(error);
	  });
    }

      $scope.checkRedpackets = function(redPackets){
      $('#'+redPackets[0].id+'_redpackets_detail').modal('show')
    }



    $scope.getWechatUserInfo();
    $scope.getCityList();


}]);
