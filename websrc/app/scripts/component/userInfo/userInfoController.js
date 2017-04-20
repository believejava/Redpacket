angular.module('npmtApp').controller('userInfoController',['$http', '$rootScope', '$scope',
    function($http,$rootScope,$scope) {
   $scope.batchTestWord = "from userInfoController";
	 $rootScope.selectedTitle = "用户信息管理";
}]);
