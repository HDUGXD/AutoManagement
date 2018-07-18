
$(document).ready(function () {
    var docHeight = $(document).height();
    var $iframe = $("#_main_frame");
    var iframe = document.getElementById("_main_frame");
    var $sideBar = $(".side-bar");
    var $sideBarHeight = docHeight-116+"px";
    $sideBar.height($sideBarHeight);
    /**
     * f5刷新获取cookie
     * 记忆旧地址
     * */
    getOldUrl();
    function getOldUrl(){
        if($.cookie("oldUrl")){
            $("#firstPage").html($.cookie("firstpageTitle"));
            $("#secondPage").html($.cookie("secondpageTitle"));
            if($.cookie("threepageTitle")){
                $("#secondPage").parent("li").after("<li><i class='fa fa-lg fa-angle-right'></i></li><li><a href='#' id='threePage'>" + $.cookie("threepageTitle") + "</a></li>");
            }
            $(".tooltip-tip").each(function(){
                if($(this).attr("link") == $.cookie("oldUrl")){
                    $(this).addClass("menuHover");
                }
            })
            $iframe.attr("src", $.cookie("oldUrl"));
        }else{
            var firstUrl = $(".topnav").eq(0).find("li").eq(0).find("a").attr("link");
            if(firstUrl!=ROOT) {
                $iframe.attr("src", firstUrl);
            } else {
                removeLoading("iframes");
            }
            $(".tooltip-tip").eq(0).addClass("menuHover");
        }
    }
    loadIframe($iframe);

    /*background change*/
    $("li.theme-bg div").bind("click",function(){

        if($(this).html().length > 0)
            return;

        var url = 'assets/css/img/'+ $(this).attr("bg") +'.jpg';
        $("body").css({
            "background": "url('"+ url +"')no-repeat center center fixed",
            "background-size": "100% 100%"
        });

        $("li.theme-bg div").html("");
        $(this).html('<i class="fa fa-check" title="选中" style="margin: 2px 2px;color: #42ff42;"></i>');

        $.ajax({
            type: "POST",
            url: ROOT + "/expandindex/updateSkin",
            data: "skin=" + $(this).attr("bg"),
            success: function(msg){}
        });

    });

    /*quick search*/
    $('input.id_search').quicksearch('#menu-showhide li, .menu-left-nest li');

    /*tooltip*/
    $('.tooltip-tip-x').tooltipster({
        position: 'right'
    });
    $('.tooltip-tip').tooltipster({
        position: 'right',
        animation: 'slide',
        theme: '.tooltipster-shadow',
        delay: 1,
        offsetX: '-12px',
        onlyOne: true
    });
    $('.tooltip-tip2').tooltipster({
        position: 'right',
        animation: 'slide',
        offsetX: '-12px',
        theme: '.tooltipster-shadow',
        onlyOne: true
    });
    $('.tooltip-top').tooltipster({
        position: 'top'
    });
    $('.tooltip-right').tooltipster({
        position: 'right'
    });
    $('.tooltip-left').tooltipster({
        position: 'left'
    });
    $('.tooltip-bottom').tooltipster({
        position: 'bottom'
    });
    $('.tooltip-reload').tooltipster({
        position: 'right',
        theme: '.tooltipster-white',
        animation: 'fade'
    });
    $('.tooltip-fullscreen').tooltipster({
        position: 'left',
        theme: '.tooltipster-white',
        animation: 'fade'
    });
    /*clock*/
    $('#digital-clock').clock({
        offset: '+5',
        type: 'digital'
    });
    //暂时先不要滚动了
    // var nt_title = $('#nt-title').newsTicker({
    //     row_height: 18,
    //     max_rows: 1,
    //     duration: 5000,
    //     pauseOnHover: 0
    // });
    /*skin-select*/
    $("#skin-select #toggle").click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $('#skin-select').animate({left: 0}, 100);
            $('.wrap-fluid').css({"width": "auto", "margin-left": "250px"});
            $('.navbar').css({"margin-left": "240px"});
            $('#skin-select li').css({"text-align": "left"});
            $('#skin-select li span, .side-dash, .noft-blue, .noft-purple-number, .noft-blue-number, .title-menu-left').css({
                "display": "inline-block",
                "float": "none"
            });
            $('.ul.topnav li a:hover').css({" background-color": "green!important"});
            $('.tooltip-tip2').addClass('tooltipster-disable');
            $('.tooltip-tip').addClass('tooltipster-disable');
            $('.datepicker-wrap').css({"position": "absolute", "right": "300px"});
            $('.skin-part').css({"visibility": "visible", "top": "5px"});
            $('.menu-left-nest').css({"margin": "0px 0 10px 10px"});
            $('.dark').css({"display": "block"});
            $('.search-hover').css({"display": "none"});
            $(".side-bar").css({"margin":"0px 10px 0px 0px"});
            $(".leftTitle a span").show();
            $(".leftTitle a label").show();
            $(".leftTitle").css({"text-align":"center"});
            $('.tooltip-tip h4').css({"display": "block"});
        } else {
            $(this).addClass('active')
            $('#skin-select').animate({left: -200}, 100);
            $('.wrap-fluid').css({"width": "auto", "margin-left": "50px"});
            $('.navbar').css({"margin-left": "50px"});
            $('#skin-select li').css({"text-align": "right"});
            $('#skin-select li span, .tooltip-tip h4, .side-dash, .noft-blue, .noft-purple-number, .noft-blue-number, .title-menu-left').css({"display": "none"});
            $('.tooltip-tip2').removeClass('tooltipster-disable');
            $('.tooltip-tip').removeClass('tooltipster-disable');
            $('.datepicker-wrap').css({"position": "absolute", "right": "84px"});
            $('.skin-part').css({"visibility": "visible", "top": "50px"});
            $('.dark').css({"display": "none"});
            $('#menu-showhide, .menu-left-nest').css({"margin": "0"});
            $('.search-hover').css({"display": "block", "position": "absolute", "right": "-100px"});
            $(".side-bar").css({"margin":"0px"});
            $(".leftTitle a span").hide();
            $(".leftTitle a label").hide();
            $(".leftTitle").css({"text-align":"right"});
        }
    });
    setTimeout(function () {
        $("#skin-select #toggle").addClass('active').trigger('click');
    }, 10);

    /*点击二级菜单*/
    $(".topnavLi .tooltip-tip").on("click", function () {
        showLoading();
        Pace.start(200);
        Pace.stop();
        if ($(this).siblings(".submenu").is(":hidden")) {
            $(this).find("img").attr("src", ROOT + "/assets/css/img/minus.png")
        } else {
            $(this).find("img").attr("src", ROOT + "/assets/css/img/plus.png")
        }
        $(this).addClass("menuHover");
        $(this).parent(".topnavLi").siblings("li").find(".tooltip-tip").removeClass("menuHover");
        $(this).parents(".menuColpase").siblings(".menuColpase").find(".tooltip-tip").removeClass("menuHover");
        $(this).siblings(".submenu").stop(false, true).slideToggle();
        $(this).parent(".topnavLi").siblings("li").find(".submenu").stop(false, true).slideUp();
        $(this).parent(".topnavLi").siblings("li").find(".tooltip-tip").find("img").attr("src", ROOT + "/assets/css/img/plus.png");
        var firstpageTitle = $(this).parents(".topnav").siblings(".titlenav").find("a").attr("title");
        var secondpageTitle = $(this).find("span").html();
        var linkUrl = $(this).attr("link");
        $("#firstPage").html(firstpageTitle);
        $("#secondPage").html(secondpageTitle);
        if ($("#threePage").length > 0) {
            $("#threePage").parent("li").prev("li").remove();
            $("#threePage").remove();
        }
        if(linkUrl!=ROOT) {
            $iframe.attr("src", linkUrl);
            $.cookie("oldUrl",linkUrl);
            $.cookie("firstpageTitle",firstpageTitle);
            $.cookie("secondpageTitle",secondpageTitle);
        } else {
            removeLoading("iframes");
        }
    });

    /*点击三级菜单*/
    $(".submenu li a").on("click", function () {
        showLoading();
        Pace.start(200);
        Pace.stop();
        $(this).parent(".submenu").show();
        var firstpageTitle = $(this).parents(".topnav").siblings(".titlenav").find("a").attr("title");
        var secondpageTitle = $(this).parents(".submenu").siblings("a").find("span").html();
        var threepageTitle = $(this).find("span").html();
        var linkUrl = $(this).attr("link");
        $(".tooltip-tip2").removeClass("menuHover");
        $(this).addClass("menuHover");
        var iframeHeight;
        $("#firstPage").html(firstpageTitle);
        $("#secondPage").html(secondpageTitle);
        if(linkUrl!=ROOT) {
            $iframe.attr("src", linkUrl);
            $.cookie("oldUrl",linkUrl);
            $.cookie("firstpageTitle",firstpageTitle);
            $.cookie("secondpageTitle",secondpageTitle);
            $.cookie("threepageTitle",threepageTitle);
        } else {
            removeLoading("iframes");
        }
        if ($("#threePage").length > 0) {
            $("#threePage").html(threepageTitle);
        } else {
            $("#secondPage").parent("li").after("<li><i class='fa fa-lg fa-angle-right'></i></li><li><a href='#' id='threePage'>" + threepageTitle + "</a></li>");
        }
    })

    function saveImg() {
        $.ajax({
            url: "",
            type: "",
            data: "",
            success: function (result) {

            },
            error: function (err) {
                console.log(JSON.stringify(err));
            }
        })
    }
    /*
    * 加载iframe
    * */
    function loadIframe(opt) {
        var addHeight = docHeight - 187;
        opt.css({"height": addHeight});
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () { // IE
                removeLoading("iframes");
            });
        } else {
            iframe.onload = function () { // 非IE
                removeLoading("iframes");
            };
        }
    }
    /*
    * 展示转圈效果
    * */
    function showLoading() {
        $('body').loading({
            loadingWidth: 240,
            title: '',
            name: 'iframes',
            discription: '正在拼命加载...',
            direction: 'column',
            type: 'origin',
            // originBg:'#71EA71',
            originDivWidth: 40,
            originDivHeight: 40,
            originWidth: 6,
            originHeight: 6,
            smallLoading: false,
            loadingMaskBg: 'rgba(0,0,0,0.2)'
        });
    }

    /**
     * 监听窗口高度变化*/
    $(window).resize(function(){
        var winHeight = $(window).height()-187;
        $sideBarHeight = winHeight+75 +"px";
        $iframe.css({"height":winHeight});
        $sideBar.height($sideBarHeight);
    });
    /*点击收缩菜单高度*/
    $(".title-menu-left").on("click",function(){
        if($(this).hasClass("active")){
            $(this).parents(".titlenav").siblings(".topnav").slideUp();
            $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-right");
            $(this).removeClass("active");
        }else{
            $(this).parents(".titlenav").siblings(".topnav").slideDown();
            $(this).find("i").removeClass("fa-angle-right").addClass("fa-angle-down");
            $(this).addClass("active");
        }
    });
});

