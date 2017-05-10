angular.module('npmtApp').controller('batchController',['$http', '$rootScope', '$scope','$state','batchService','appService',
    function($http,$rootScope,$scope,$state,batchService,appService) {
    $rootScope.selectedTitle = "产品批次管理";

    $scope.productBatchInfo = function(){
      batchService.getProductbatchServ().then(function(response){
	   	if (response.status = 200 ) {
	   		$scope.batchInfo = response.data;
	   	}
	  }, function (error) {
	  	console.log(error);
	  });
    }

    $scope.openDetailModal = function(productDetail){
      $('#'+productDetail[0].productId+'_product_detail').modal('show')
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


   $scope.productBatchInfo();
   $scope.getCityList();
   $scope.addedProductBatch = {
    "allowSellCities": [],
    "amount": 50,
    "averageAmount": 50,
    "description": "",
    "name": "",
    "randomRedpacket":true
  };
   $scope.addProductBatch = function(tempProductBatch){
      tempProductBatch = {
        "allowSellCities": [],
        "amount": $scope.addedProductBatch.amount,
        "averageAmount": $scope.addedProductBatch.averageAmount,
        "description": $scope.addedProductBatch.description,
        "name": $scope.addedProductBatch.name,
        "randomRedpacket": $scope.addedProductBatch.randomRedpacket
      };

      batchService.addProductBatchServ(tempProductBatch).then(function(response){
        if (response.status = 200 ) {
          $('#addProductBatch').modal('hide');
        }
      }, function (error) {
        console.log(error);
      });

    }

    $scope.closeModal = function() {
          $scope.addedProductBatch = {
            "allowSellCities": [],
            "amount": 50,
            "averageAmount": 50,
            "description": "",
            "name": "",
            "randomRedpacket":true
          };
       $('#addProductBatch').modal('hide');
    }

}]);
