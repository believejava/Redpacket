angular.module('npmtApp').controller('redpacketInfoController',['$http', '$rootScope', '$scope',
    function($http,$rootScope,$scope) {
   $scope.batchTestWord = "from redpacketInfoController";
	 $rootScope.selectedTitle = "红包信息管理";
}]);
