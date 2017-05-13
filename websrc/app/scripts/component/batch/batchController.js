angular.module('npmtApp').controller('batchController',['$http', '$rootScope', '$scope','$state','batchService','appService','businessModel','$timeout',
    function($http,$rootScope,$scope,$state,batchService,appService,businessModel,$timeout) {
    $rootScope.selectedTitle = "产品批次管理";
    $scope.modernBrowsers = [];


    $scope.maxSize = 3;
    $scope.currentPage = 1;
    $scope.itemPerPage = 1;
     
    $scope.splitedBatchInfo = [];

    $scope.splitResults = function (results, itemPerPage){
        var splitedResults = [];
        for(var i = 0; i < results.length; i += itemPerPage)
          splitedResults.push(results.slice(i, i+itemPerPage));
        return splitedResults;
    }

    $scope.productBatchInfo = function(){
        batchService.getProductbatchServ().then(function(response){
  	   	if (response.status = 200 ) {
          $scope.splitedBatchInfo = $scope.splitResults(response.data, $scope.itemPerPage);
  	   	}
    	  }, function (error) {
    	  	console.log(error);
    	  });
    }

    $scope.getCityList = function(){
        appService.getCityListServ().then(function(response){
          if (response.status = 200 ) {
            businessModel.cityInfo = response.data;
            $scope.modernBrowsers = businessModel.cityInfo;
          }
        }, function (error) {
          console.log(error);
        });
    }

    $scope.openDetailModal = function(productDetail){
        $('#'+productDetail[0].productId+'_product_detail').modal('show')
    }

    $scope.getSelectedCityList = function (selectedCity) {
        var allowSellCityIDArray = [];
        for (var i = selectedCity.length - 1; i >= 0; i--) {
           var tempCity = {"id":selectedCity[i].id};
           allowSellCityIDArray.push(tempCity);
        }
        return allowSellCityIDArray;
     }

    

    $scope.addedProductBatch = {
        "allowSellCities": [],
        "amount": null,
        "averageAmount": null,
        "description": "",
        "name": "",
        "randomRedpacket":false
    };
    $scope.addProductBatch = function(tempProductBatch){

        tempProductBatch = {
          "allowSellCities": $scope.getSelectedCityList($scope.outputBrowsers),
          "amount": $scope.addedProductBatch.amount,
          "averageAmount": $scope.addedProductBatch.averageAmount,
          "description": $scope.addedProductBatch.description || "",
          "name": $scope.addedProductBatch.name,
          "randomRedpacket": $scope.addedProductBatch.randomRedpacket
        };

        batchService.addProductBatchServ(tempProductBatch).then(function(response){
          if (response.status = 200 ) {
            $scope.addedProductBatch = {
              "allowSellCities": [],
              "amount": null,
              "averageAmount": null,
              "description": "",
              "name": "",
              "randomRedpacket":false
            };
            $('#addProductBatch').modal('hide');
            $timeout(function () {
              $state.reload();
            },800);
          }
        }, function (error) {
          console.log(error);
        });

    }

    $scope.closeModal = function() {
        $scope.addedProductBatch = {
          "allowSellCities": [],
          "amount": null,
          "averageAmount": null,
          "description": "",
          "name": "",
          "randomRedpacket":false
        };
        $('#addProductBatch').modal('hide');
    }


    $scope.initBatch = function(){
        $scope.productBatchInfo();
        if (businessModel.cityInfo.length === 0) {
          $scope.getCityList();
        } else {
          $scope.modernBrowsers = businessModel.cityInfo;
        }
    }

    $scope.initBatch();

}]);
