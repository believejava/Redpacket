angular.module('npmtApp').controller('scancodeController',['$http', '$rootScope', '$scope','scancodeService',
    function($http,$rootScope,$scope,scancodeService) {
   $rootScope.selectedTitle = "产品扫描管理";


   $scope.maxSize = 3;
   $scope.currentPage = 1;
   $scope.itemPerPage = 4;

   $scope.allProductDetails = [];
   $scope.splitedProductDetails = [];

   $scope.splitResults = function (results, itemPerPage){
   		var splitedResults = [];
   		for(var i = 0; i < results.length; i += itemPerPage)
   			splitedResults.push(results.slice(i, i+itemPerPage));
   		return splitedResults;
   }

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
	   				if ((i === productResponse.length-1)&&(j === productResponse[i].productDetails.length-1)) {
	   					$scope.splitedProductDetails = $scope.splitResults($scope.allProductDetails, $scope.itemPerPage);
	   				}
	   			}
	   		}
	   	}
	  }, function (error) {
	  	console.log(error);
	  });
    }

	$scope.productBatchInfo();

}]);
