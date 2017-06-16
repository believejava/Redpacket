angular.module('npmtApp').controller('redpacketInfoController',['$http', '$rootScope', '$scope','redpacketInfoService','$location','$timeout',
    function($http,$rootScope,$scope,redpacketInfoService,$location,$timeout) {
	$rootScope.selectedTitle = "红包信息管理";
  
   $scope.maxSize = 3;
   $scope.currentPage = 1;
   $scope.itemPerPage = 12;

  $scope.splitedRdpacketInfo = [];

	$scope.splitResults = function (results, itemPerPage){
 		var splitedResults = [];
 		for(var i = 0; i < results.length; i += itemPerPage)
 			splitedResults.push(results.slice(i, i+itemPerPage));
 		return splitedResults;
  }

  $scope.getRedpacketInfo = function(){
    redpacketInfoService.getRedpacketInfoServ().then(function(response){
   	if (response.status = 200 ) {
   		$scope.splitedRdpacketInfo = $scope.splitResults(response.data, $scope.itemPerPage);
   	}
  }, function (error) {
  	console.log(error);
  });
  }

  $timeout(function () {
          $("#page-content-wrapper").removeClass("ml-0");
          $('#redpacketinfo-id').addClass('active');
          $('#redpacketinfo-id').siblings().removeClass('active');
  },200);

  $scope.getRedpacketInfo();
}]);
