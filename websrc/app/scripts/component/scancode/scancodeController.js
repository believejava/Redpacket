angular.module('npmtApp').controller('scancodeController',['$http', '$rootScope', '$scope','scancodeService',
    function($http,$rootScope,$scope,scancodeService) {
   $rootScope.selectedTitle = "产品扫描管理";

   $scope.allProductDetails = [];

   $scope.productBatchInfo = function(){
      scancodeService.getProductbatchServ().then(function(response){
	   	if (response.status = 200 ) {
	   		var productResponse = response.data;
	   		for (var i = 0; i < productResponse.length; i++) {
	   			for (var j = 0; j < productResponse[i].productDetails.length; j++) {
	   				var tempProduct = {};
	   				tempProduct.name = productResponse[i].name;
	   				tempProduct.productDetailNum = productResponse[i].productDetails[j].productDetailNum;
	   				tempProduct.enable = productResponse[i].productDetails[j].enable;
	   				tempProduct.scanned = productResponse[i].productDetails[j].scanned;
	   				$scope.allProductDetails.push(tempProduct);
	   			}
	   		}
	   	}
	  }, function (error) {
	  	console.log(error);
	  });
    }

	$scope.productBatchInfo();

}]);
