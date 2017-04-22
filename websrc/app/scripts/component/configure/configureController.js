angular.module('npmtApp').controller('configureController',['$http', '$rootScope', '$scope',
    function($http,$rootScope,$scope) {
   $scope.testWord = "from configureController";
   $rootScope.selectedTitle = "配置项管理";
}]);
