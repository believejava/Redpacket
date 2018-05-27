angular.module('npmtApp').controller('batchController',['$http', '$rootScope', '$scope','$state','batchService','appService','businessModel','$timeout','$location','BATH_PATH','$cookies',
    function($http,$rootScope,$scope,$state,batchService,appService,businessModel,$timeout,$location,BATH_PATH,$cookies) {
    $rootScope.selectedTitle = "产品批次管理";
    $scope.modernBrowsers = [];


    $scope.maxSize = 3;
    $scope.currentPage = 1;
    $scope.itemPerPage = 12;
     
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
          $scope.totalItems = response.data.length;
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

    $scope.openBatchInfoModal = function(batch) {
        $scope.updatedProductBatch = {
            "amount": batch.amount,
            "averageAmount": batch.averageAmount,
            "description": batch.description,
            "name": batch.name,
            "wechatUserTitle":batch.wechatUserTitle,
            "wechatUserText":batch.wechatUserText,
            "wechatShareTitle":batch.wechatShareTitle,
            "wechatShareLink":batch.wechatShareLink,
            "wechatShareImgUrl":batch.wechatShareImgUrl
        };
        $('#'+batch.id+'_batch_info').modal('show');
    }

    $scope.openDetailModal = function(productDetail){
        $('#'+productDetail[0].productId+'_product_detail').modal('show')
    }

    $scope.downloadQRInfo = function(productDetail){
        var url = BATH_PATH + "product/scanUrlFile/"+productDetail[0].productId+".txt?token="+$cookies.get('token');
        window.location.href= url;
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
        "forceCityCheck": false,
        "randomRedpacket":false,
        "randomMinAmount": 1,
        "randomMaxAmount": 1000,
        "wechatUserTitle":"",
        "wechatUserText":"",
        "wechatShareTitle":"",
        "wechatShareLink":"",
        "wechatShareImgUrl":""
    };
    $scope.addProductBatch = function(tempProductBatch) {

        tempProductBatch = {
          "wechatUserTitle": $scope.addedProductBatch.wechatUserTitle,
          "wechatUserText": $scope.addedProductBatch.wechatUserText,
          "wechatShareTitle": $scope.addedProductBatch.wechatShareTitle,
          "wechatShareLink": $scope.addedProductBatch.wechatShareLink,
          "wechatShareImgUrl": $scope.addedProductBatch.wechatShareImgUrl,
        };

        batchService.updateProductBatchServ(tempProductBatch).then(function(response){
          if (response.status = 200 ) {
            $('#'+batch.id+'_batch_info').modal('hide');
            $timeout(function () {
              $state.reload();
            },800);
          }
        }, function (error) {
          console.log(error);
        });

    }


    $scope.updateProductBatch = function(tempProductBatch) {

        tempProductBatch = {
          "allowSellCities": $scope.getSelectedCityList($scope.outputBrowsers),
          "amount": $scope.addedProductBatch.amount,
          "averageAmount": $scope.addedProductBatch.averageAmount,
          "description": $scope.addedProductBatch.description || "",
          "name": $scope.addedProductBatch.name,
          "forceCityCheck": $scope.addedProductBatch.forceCityCheck,
          "randomRedpacket": $scope.addedProductBatch.randomRedpacket,
          "randomMinAmount": $scope.addedProductBatch.randomMinAmount,
          "randomMaxAmount": $scope.addedProductBatch.randomMaxAmount,
          "wechatUserTitle": $scope.addedProductBatch.wechatUserTitle,
          "wechatUserText": $scope.addedProductBatch.wechatUserText,
          "wechatShareTitle": $scope.addedProductBatch.wechatShareTitle,
          "wechatShareLink": $scope.addedProductBatch.wechatShareLink,
          "wechatShareImgUrl": $scope.addedProductBatch.wechatShareImgUrl,
        };

        batchService.addProductBatchServ(tempProductBatch).then(function(response){
          if (response.status = 200 ) {
            $scope.addedProductBatch = {
              "allowSellCities": [],
              "amount": null,
              "averageAmount": null,
              "description": "",
              "name": "",
              "forceCityCheck": false,
              "randomRedpacket":false,
              "randomMinAmount": 1,
              "randomMaxAmount": 1000,
              "wechatUserTitle":"",
              "wechatUserText":"",
              "wechatShareTitle":"",
              "wechatShareLink":"",
              "wechatShareImgUrl":""
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
          "forceCityCheck": false,
          "randomRedpacket":false,
          "randomMinAmount": 1,
          "randomMaxAmount": 1000,
          "wechatUserTitle":"",
          "wechatUserText":"",
          "wechatShareTitle":"",
          "wechatShareLink":"",
          "wechatShareImgUrl":""
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

    $timeout(function () {
          $("#page-content-wrapper").removeClass("ml-0");
          $('#batch-id').addClass('active');
          $('#batch-id').siblings().removeClass('active');
    },200);


}]);
