
$(function () {

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        if($("#sidebar-wrapper").width() > 0 ){
            $("#sidebar-wrapper").animate({width:"0"}, 100,function(){
                $("#page-content-wrapper").animate({"margin-left":"0"}, 300);
            });
        }else{
            $("#sidebar-wrapper").animate({width:"250px"}, 100,function(){
                $("#page-content-wrapper").animate({"margin-left":"250px"}, 300);
            });
        }
    });

    var $primaryNav = $('.primary-nav');
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