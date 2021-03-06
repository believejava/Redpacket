angular.module('npmtApp').controller('basicController',['$http', '$rootScope', '$scope','$timeout','$location','$state','appService','$cookies',
    function($http,$rootScope,$scope,$timeout,$location,$state,appService,$cookies) {
    // $scope.initPro = function () {
    //     appService.getToken();
    // };

    //$scope.initPro();

    $timeout(function () {

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        if($("#sidebar-wrapper").width() > 0 ){
            $("#sidebar-wrapper").animate({width:"0"}, 100,function(){
                $("#page-content-wrapper").animate({"margin-left":"0"}, 300,function () {
                    $("#toggle-icon").removeClass("glyphicon-chevron-left").addClass("glyphicon-chevron-right");
                });
            });
        }else{
            $("#sidebar-wrapper").animate({width:"250px"}, 100,function(){
                $("#page-content-wrapper").animate({"margin-left":"250px"}, 300,function () {
                    $("#toggle-icon").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-left");
                });
            });
        }
    });

    var $primaryNav = $('.primary-nav');
    $primaryNav.find('li').removeClass('active');
    var currentNavArr = $location.path().split("/");
    var currentPrimaryNav = currentNavArr[currentNavArr.length-1];
    if(currentPrimaryNav === "login"){
        $("#page-content-wrapper").addClass("ml-0");
    } else {
        $("#page-content-wrapper").removeClass("ml-0");
    }
    var selectedPrimaryNav = $('#'+currentPrimaryNav+"-id");
    selectedPrimaryNav.addClass('active');
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
    },500);


    $scope.logout = function(id){
        $cookies.remove("username");
        $cookies.remove("password");
        $cookies.remove("token");
        $('#'+id).modal('hide');
        $timeout(function () {
            $state.go('login',{}, {reload: true});
        },100);


    }
}]);
