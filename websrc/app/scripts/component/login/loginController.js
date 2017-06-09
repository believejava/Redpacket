angular.module('npmtApp').controller('loginController',['$http', '$rootScope', '$scope','$state','loginService','$timeout','$cookies',
    function($http,$rootScope,$scope,$state,loginService,$timeout,$cookies) {
   $rootScope.selectedTitle = "登录配置";
   $rootScope.showErrorLoginfo = false;
   $scope.userInfo = {
   	'username':'',
   	'password':''
   };
   $timeout(function () {
      $("#page-content-wrapper").addClass("ml-0");
   },200);

   $scope.login = function() {
   	 	loginService.getAuthToken($scope.userInfo).then(function(response){
          if (response.status === 200) {
            $cookies.put("username", $scope.userInfo.username);
            $cookies.put("password", $scope.userInfo.password);
            $rootScope.token = response.token;
            $timeout(function () {
              $("#page-content-wrapper").removeClass("ml-0");
              $state.go('batch',{}, {reload: true});
            },1500);
          }
        }, function (error) {
          console.log(error);
        });
   }

}]);
