angular.module('npmtApp').controller('scanController',['$http', '$rootScope', '$scope',
    function($http,$rootScope,$scope) {
   $scope.testWord = "from scanController";
   $rootScope.selectedTitle = "产品扫描管理";
}]);
