
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





})