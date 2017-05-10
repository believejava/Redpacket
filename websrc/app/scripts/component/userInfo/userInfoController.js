angular.module('npmtApp').controller('userInfoController',['$http', '$rootScope', '$scope','userInfoService','appService',
    function($http,$rootScope,$scope,userInfoService,appService) {
  
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

 //   $scope.modernBrowsers = [
	//  	{name: "Opera",	maker: "Opera Software",	ticked: true	},
	//  	{name: "Internet Explorer",	maker: "Microsoft",	ticked: false	},
	//  	{name: "Firefox",	maker: "Mozilla Foundation",	ticked: true	},
	//  	{name: "Safari",	maker: "Apple",	ticked: false	},
	//  	{name: "Chrome",	maker: "Google",	ticked: true	}
	// ];

}]);
