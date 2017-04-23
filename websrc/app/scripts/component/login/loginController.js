angular.module('npmtApp').controller('loginController',['$http', '$rootScope', '$scope',
    function($http,$rootScope,$scope) {
   $scope.testWord = "from loginController";
   $rootScope.selectedTitle = "登录配置";
}]);
