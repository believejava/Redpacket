angular.module('npmtApp').controller('batchController',['$http', '$rootScope', '$scope','$state','batchService',
    function($http,$rootScope,$scope,$state,batchService) {
    $rootScope.selectedTitle = "产品批次管理";

    $scope.productBatchInfo = function(){
      batchService.getProductbatch().then(function(response){
	   	if (response.status = 200 ) {
	   		$scope.batchInfo = response.data;
	   	}
	  }, function (error) {
	  	console.log(error);
	  });
    }


    $scope.openDetailModal = function(productDetail){
      $('#'+productDetail[0].productDetailPrimaryKey.productId+'_product_detail').modal('show')
    }



   $scope.productBatchInfo();

}]);
