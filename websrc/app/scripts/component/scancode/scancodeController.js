angular.module('npmtApp').controller('scancodeController',['$http', '$rootScope', '$scope','scancodeService','$timeout','$state','$location','$timeout',
    function($http,$rootScope,$scope,scancodeService,$timeout,$state,$location,$timeout) {
   $rootScope.selectedTitle = "产品扫描管理";


   $scope.maxSize = 3;
   $scope.currentPage = 1;
   $scope.itemPerPage = 12;

   $scope.allProductDetails = [];
   $scope.splitedProductDetails = [];

   $scope.editable = false;
   $scope.switchButtonFun = true;
   $scope.select_all = false;
   $scope.copiedSplitedProductDetails = [];


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
        $scope.totalItems = productResponse.length;
	   		for (var i = 0; i < productResponse.length; i++) {
	   			for (var j = 0; j < productResponse[i].productDetails.length; j++) {
	   				var tempProduct = {};
	   				tempProduct.id = productResponse[i].productDetails[j].id;
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


    $scope.checked = [];
    $scope.selectAll = function (currentPage) {
        if($scope.select_all) {
        	$scope.checked = [];
            angular.forEach($scope.splitedProductDetails[currentPage-1], function (productDetail) {
 				productDetail.enable =  true;
 				$scope.checked.push(productDetail.id);
            })
        }else {
            angular.forEach($scope.splitedProductDetails[currentPage-1], function (productDetail) {
            	productDetail.enable =  false;
            	$scope.checked = [];
            })
        }
        console.log($scope.checked);
    };

    $scope.selectOne = function (currentPage) {
        angular.forEach($scope.splitedProductDetails[currentPage-1] , function (productDetail) {
            var index = $scope.checked.indexOf(productDetail.id);
            if(productDetail.enable && index === -1) {
                $scope.checked.push(productDetail.id);
            } else if (!productDetail.enable && index !== -1){
                $scope.checked.splice(index, 1);
            };
        })

        if ($scope.splitedProductDetails[currentPage-1].length === $scope.checked.length) {
            $scope.select_all = true;
        } else {
            $scope.select_all = false;
        }
        console.log($scope.checked);
    }

    $scope.editRedpaccketPermission = function (currentPage) {
    	var comparedValue = false;
    	if ($scope.splitedProductDetails[currentPage-1].toString() === $scope.copiedSplitedProductDetails.toString()) {
    		comparedValue = true;
    	}
    	if (!comparedValue) {
    		angular.copy($scope.splitedProductDetails[currentPage-1], $scope.copiedSplitedProductDetails);
    	}
    	$scope.editable = true;
    	$scope.switchButtonFun = false;
    }

    $scope.revertRedpaccketPermission = function (currentPage) {
    	$scope.editable = false;
    	$scope.switchButtonFun = true;
    	angular.copy($scope.copiedSplitedProductDetails, $scope.splitedProductDetails[currentPage-1]);
    }

    $scope.saveRedpaccketPermission = function (currentPage) {
      console.log($scope.splitedProductDetails[currentPage-1]);
    	$scope.editable = false;
    	$scope.switchButtonFun = true;
      scancodeService.updateEnableScanServ($scope.splitedProductDetails[currentPage-1]).then(function(response){
      if (response.status = 200 ) {
          $timeout(function () {
            $state.reload();
          },800);
      }
    }, function (error) {
      console.log(error);
    });
    	
    }


	$scope.productBatchInfo();

  $timeout(function () {
      $("#page-content-wrapper").removeClass("ml-0");
      $('#scancode-id').addClass('active');
      $('#scancode-id').siblings().removeClass('active');
  },200);

}]);
