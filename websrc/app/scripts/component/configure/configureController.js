angular.module('npmtApp').controller('configureController',['$http', '$rootScope', '$scope','configureService','$location','$timeout','$state',
    function($http,$rootScope,$scope,configureService,$location,$timeout,$state) {
   $rootScope.selectedTitle = "配置项管理";

    $scope.switchButtonFun = true;
    $scope.original_item = {
        "description": "",
        "enable": null,
        "id": null,
        "name": "",
        "value": null
      }

    $scope.editConfig = function(item) {
      $scope.switchButtonFun = false;
      $("#"+item.id+"_id").attr("disabled", false);
      $("#"+item.id+"_editeID").removeClass("is-show").addClass("is-hide");
      $("#"+item.id+"_saveID").removeClass("is-hide").addClass("is-show");
      $("#"+item.id+"_revertID").removeClass("is-hide").addClass("is-show");
      angular.copy(item, $scope.original_item);
    }

    $scope.saveConfig = function(item) {
      $scope.switchButtonFun = true;
      var tmpItem = {
        "description": item.description,
        "enable": $scope.original_item.enable,
        "id": item.id,
        "name": item.name,
        "value": item.value
      }

      configureService.updateConfigInfoServ(tmpItem).then(function(response){
          if (response.status = 200 ) {
          
          }
        }, function (error) {
          console.log(error);
        });

      $("#"+item.id+"_editeID").removeClass("is-hide").addClass("is-show");
      $("#"+item.id+"_saveID").removeClass("is-show").addClass("is-hide");
      $("#"+item.id+"_revertID").removeClass("is-show").addClass("is-hide");
      $("#"+item.id+"_id").attr("disabled", true);
    }

    $scope.revertConfig = function(item) {
      $scope.switchButtonFun = true;
      item.value = $scope.original_item.value;
      
      $("#"+item.id+"_editeID").removeClass("is-hide").addClass("is-show");
      $("#"+item.id+"_saveID").removeClass("is-show").addClass("is-hide");
      $("#"+item.id+"_revertID").removeClass("is-show").addClass("is-hide");
      $("#"+item.id+"_id").attr("disabled", true);
    }

   	$scope.getConfigInfo = function(){
      configureService.getConfigInfoServ().then(function(response){
	   	if (response.status = 200 ) {
	   		$scope.configInfo = response.data;
	   	}
	  }, function (error) {
	  	console.log(error);
	  });
    }

    $scope.getConfigInfo();

    $timeout(function () {
          $("#page-content-wrapper").removeClass("ml-0");
          $('#configure-id').addClass('active');
          $('#configure-id').siblings().removeClass('active');
    },200);

   
}]);
