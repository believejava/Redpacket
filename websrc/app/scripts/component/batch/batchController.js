angular.module('npmtApp').controller('batchController',['$http', '$rootScope', '$scope','$state',
    function($http,$rootScope,$scope,$state) {
   $scope.batchTestWord = "from batchController";
   $rootScope.selectedTitle = "产品批次管理";

}]);
