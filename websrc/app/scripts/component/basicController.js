angular.module('npmtApp').controller('basicController',['$http', '$rootScope', '$scope','$timeout','$location','$state',
    function($http,$rootScope,$scope,$timeout,$location,$state) {

    $timeout(function () {
        var $primaryNav = $('.primary-nav');
        $primaryNav.find('li').removeClass('active');
        var currentNavArr = $location.path().split("/");
        var currentPrimaryNav = currentNavArr[currentNavArr.length-1];
        var selecttPrimaryNav = $('#'+currentPrimaryNav+"-id");
        selecttPrimaryNav.addClass('active');

        $primaryNav.on('click','li',function (event) {
            event.stopPropagation();
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        })

        $primaryNav.on('mouseover','li',function (event) {
            event.stopPropagation();
            $(this).children('a').css('color','#fff').children('i').css('color','#fff');
            $(this).siblings().children('a').css('color','#c7c7c7')
                .siblings().children('i').css('color','#c7c7c7');
        });

        $primaryNav.on('mouseleave','li',function (event) {
            event.stopPropagation();
            $(this).children('a').css('color','#c7c7c7').children('i').css('color','#c7c7c7');
        });
    })
    $scope.testWord = "why always me!!!";
}]);
