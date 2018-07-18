//图表的颜色定义
var color = ['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#8E8E38','#949494','#6A5ACD','#836FFF','#8F8F8F'];

$.fn.gisList = function(opts){
	var that = $(this);
	var operate = opts.operate;
	that.on("click",".g_search_item",function(e){
		$(this).addClass("current").siblings().removeClass("current");
	});
	$.each(operate,function(i,v){
		var el = v.selector;
		var fun = v.execute;
		that.on("click",el,function(e){
			fun($(this),$(this).parents(".g_search_item"));
		});
	});
};


/**
 * 通过dialog_id获取Iframe
 * @param dialog_id
 * @returns
 */
function get_fun_in_dialog(dialog_id) {
    var dlg = get_dialog(dialog_id);
    if (!dlg)return null;
    var iframe = $("iframe", dlg.element[0]);
    if (!iframe)return null;
    return iframe[0].contentWindow;
}

function cus_dialog(id, title, url, width, height, btn, reload, useiframe, cus_option, dlg_type, target) {
    if (window != top.window) {
        top.cus_dialog(id, title, url, width, height, btn, reload, useiframe, cus_option, dlg_type, target);
        return;
    }
    if (btn) {
        btn_running(btn);
    }
    var $el;
    if (id) {
        $el = $("#" + id);
    } else {
        id = "dlg_" + new Date().getTime();
    }
    if (!$el || $el.length == 0) {
        $el = $('<div id="' + id + '"></div>').appendTo('body');
    }
    if (useiframe == undefined || useiframe == null) {
        useiframe = true;
    }
    var win = $("#" + id).data("kendoWindow");
    if (win) {
        win.open();
        if (reload) {
            win.refresh({
                iframe: useiframe
            });
        }
        return;
    }

    var options = {
        title: title,
        content: url,
        //appendTo : top.window.document.body,
        iframe: useiframe,
        modal: false,
        pinned: true,
        actions: ["Maximize", "Refresh", "Close"],
        activate: function () {
            if (useiframe) {
                $("#" + id).addClass("k-window-iframecontent-loading");
                iframe_loaded($("iframe", "#" + id)[0], function () {
                    $("#" + id).removeClass("k-window-iframecontent-loading");
                });
            }
        },
        open: function () {
        	if (dlg_type && target) {
        		target.addClass("clicked");
        	}
            this.center();
        },
        close: function () {
            if (btn) {
                btn_enabled(btn);
            }
            if (dlg_type && target) {
            	target.removeClass("clicked");
            	var imgUrl = target.attr("src");
            	imgUrl = imgUrl.substring(0, imgUrl.indexOf("_hover")) + ".png";
            	target.attr("src", imgUrl).siblings(".g-bigscreen-btn-text").css({"color": "#fff"});
        	}
            this.destroy();
        }
    };
    if (width) {
        options.width = width;
        options.orginalWidth = width;
    }
    if (height) {
        options.height = height;
    }

    $el.hcWindow($.extend({}, options, cus_option));
}

/*禁用backspace键的后退功能，但是可以删除文本内容*/
document.onkeydown = function(e){
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    if ((code == 8) &&                                                    
         ((event.srcElement.type != "text" && 
         event.srcElement.type != "textarea" && 
         event.srcElement.type != "password")||(event.srcElement.readOnly == true))) {
        event.keyCode = 0; 
        event.returnValue = false; 
    }
	return true;
}
//ticc公交车饼图图表着色
function getStatusColorBus(status){
    var statusColor = '';
    if(status == 1){
        statusColor = '#FF0000';
    }else if(status == 2){
        statusColor = '#EEEE00';
    }else if(status == 3){
        statusColor = '#008B00';
    }
    return statusColor;
}

/* ========================================================================
 * tinycarousel - v2.1.6 - 2014-07-07
 * http://www.baijs.com/tinycarousel
 * ========================================================================
 * Copyright (c) 2014 Maarten Baijs <wieringen@gmail.com>
 * Licensed under the MIT license
 * ======================================================================== */
(function (factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define(['jquery'], factory);
    }
    else if (typeof exports === 'object')
    {
        factory(require('jquery'));
    }
    else
    {
        factory(jQuery);
    }
}
(function ($)
{
    var pluginName = "tinycarousel"
        ,   defaults   =
        {
            start:          0      // The starting slide
            ,   axis:           "x"    // vertical or horizontal scroller? ( x || y ).
            ,   buttons:        true   // show left and right navigation buttons.
            ,   bullets:        false  // is there a page number navigation present?
            ,   interval:       false  // move to another block on intervals.
            ,   intervalTime:   3000   // interval time in milliseconds.
            ,   animation:      true   // false is instant, true is animate.
            ,   animationTime:  1000   // how fast must the animation move in ms?
            ,   infinite:       true   // infinite carousel.
        }
        ;

    function Plugin($container, options)
    {
        this.options   = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name     = pluginName;

        var self      = this
            ,   $viewport = $container.find(".ui-carousel-content:first")
            ,   $overview = $container.find(".items:first")
            ,   $slides   = 0
            ,   $next     = $container.find(".next:first")
            ,   $prev     = $container.find(".prev:first")
            ,   $bullets  = $container.find(".bullet")

            ,   viewportSize    = 0
            ,   contentStyle    = {}
            ,   slidesVisible   = 0
            ,   slideSize       = 0
            ,   slideIndex      = 0

            ,   isHorizontal  = this.options.axis === 'x'
            ,   sizeLabel     = isHorizontal ? "Width" : "Height"
            ,   posiLabel     = isHorizontal ? "left" : "top"
            ,   intervalTimer = null
            ;

        this.slideCurrent = 0;
        this.slidesTotal  = 0;

        function initialize()
        {
            self.update();
            self.move(self.slideCurrent);

            setEvents();

            return self;
        }

        this.update = function()
        {
            $overview.find(".mirrored").remove();

            $slides           = $overview.children();
            viewportSize      = $viewport[0]["offset" + sizeLabel];
            slideSize         = $slides.first()["outer" + sizeLabel](true);
            self.slidesTotal  = $slides.length;
            self.slideCurrent = self.options.start || 0;
            slidesVisible     = Math.ceil(viewportSize / slideSize);

            $overview.append($slides.slice(0, slidesVisible).clone().addClass("mirrored"));
            $overview.css(sizeLabel.toLowerCase(), slideSize * (self.slidesTotal + slidesVisible));

            return self;
        };

        function setEvents()
        {
            if(self.options.buttons)
            {
                $prev.click(function()
                {
                    self.move(--slideIndex);

                    return false;
                });

                $next.click(function()
                {
                    self.move(++slideIndex);

                    return false;
                });
            }

            $(window).resize(self.update);

            if(self.options.bullets)
            {
                $container.on("click", ".bullet", function()
                {
                    self.move(slideIndex = +$(this).attr("data-slide"));

                    return false;
                });
            }
        }

        this.start = function()
        {
            if(self.options.interval)
            {
                clearTimeout(intervalTimer);

                intervalTimer = setTimeout(function()
                {
                    self.move(++slideIndex);

                }, self.options.intervalTime);
            }

            return self;
        };

        this.stop = function()
        {
            clearTimeout(intervalTimer);

            return self;
        };

        this.move = function(index)
        {
            slideIndex        = index;
            self.slideCurrent = slideIndex % self.slidesTotal;

            if(slideIndex < 0)
            {
                self.slideCurrent = slideIndex = self.slidesTotal - 1;
                $overview.css(posiLabel, -(self.slidesTotal) * slideSize);
            }

            if(slideIndex > self.slidesTotal)
            {
                self.slideCurrent = slideIndex = 1;
                $overview.css(posiLabel, 0);
            }

            contentStyle[posiLabel] = -slideIndex * slideSize;

            $overview.animate(
                contentStyle
                ,   {
                    queue    : false
                    ,   duration : self.options.animation ? self.options.animationTime : 0
                    ,   always : function()
                    {
                        $container.trigger("move", [$slides[self.slideCurrent], self.slideCurrent]);
                    }
                });

            setButtons();
            self.start();

            return self;
        };

        function setButtons()
        {
            if(self.options.buttons && !self.options.infinite)
            {
                $prev.toggleClass("disable", self.slideCurrent <= 0);
                $next.toggleClass("disable", self.slideCurrent >= self.slidesTotal - slidesVisible);
            }

            if(self.options.bullets)
            {
                $bullets.removeClass("active");
                $($bullets[self.slideCurrent]).addClass("active");
            }
        }

        return initialize();
    }

    $.fn[pluginName] = function(options)
    {
        return this.each(function()
        {
            if(!$.data(this, "plugin_" + pluginName))
            {
                $.data(this, "plugin_" + pluginName, new Plugin($(this), options));
            }
        });
    };
}));
//数组移除  array：数组  removeStr：需移除的内容
function removeArray(array, removeStr) {
    var removeArray = removeStr.split(',');
    for(var i=0; i<removeArray.length; i++) {
        var j = array.indexOf(removeArray[i]);
        if(j>-1) {
            array.splice(j,1);
        }
    }
    return array;
}

/**
 * 通用时间控件方法，待扩展
 * 扩展功能：显示时间、格式化、国际化、开始结束时间约束
 * BY： Aaron.CN
 * startId：开始时间控件
 * endId：结束时间控件
 * formatStr：时间格式  yyyy-MM-dd HH:mm:ss
 * local：国际化  zh-CN
 */

var startTime;
var endTime;
var endDate;
var startDate;

function startChange()
{
    startDate = startTime.value(),
        endDate = endTime.value();

    if (startDate) {
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate());
        endTime.min(startDate);
    } /*else if (endDate) {
     startTime.max(new Date(endDate));
     } */else {
        //endDate = new Date();
        //startTime.max(endDate);
        endTime.min('');
    }
}

function endChange()
{
    startDate = startTime.value(),
        endDate = endTime.value();

    if (endDate) {
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate());
        startTime.max(endDate);
    } /*else if (startDate) {
     endTime.min(new Date(startDate));
     }*/ else {
        // endDate = new Date();
        startTime.max('');
        //endTime.min(endDate);
    }
}

function commonDate(startId, endId, formatStr, local)
{
    //加载时间控件
    $("#" + startId).hcDateTimePicker({
        format: formatStr,
        culture: local,
        change: startChange,
        interval: 30

    });
    $("#" + endId).hcDateTimePicker({
        format: formatStr,
        culture: local,
        change: endChange,
        interval: 30
    });

    startTime = $("#" + startId).data("kendoDateTimePicker");
    endTime = $("#" + endId).data("kendoDateTimePicker");
    startChange();
    endChange();
}

function commonDateNoTime(startId, endId, formatStr, local)
{
    //加载时间控件
    $("#" + startId).hcDatePicker({
        format: formatStr,
        culture: local,
        change: startChange

    });
    $("#" + endId).hcDatePicker({
        format: formatStr,
        culture: local,
        max: new Date(),
        change: endChange
    });

    startTime = $("#" + startId).data("kendoDatePicker");
    endTime = $("#" + endId).data("kendoDatePicker");
    startChange();
    endChange();
}

function commonTime(startId, endId, formatStr, local)
{
    //加载时间控件
    $("#" + startId).hcTimePicker({
        format: formatStr,
        culture: local,
        change: startChange

    });
    $("#" + endId).hcTimePicker({
        format: formatStr,
        culture: local,
        change: endChange
    });

    startTime = $("#" + startId).data("kendoTimePicker");
    endTime = $("#" + endId).data("kendoTimePicker");
    startChange();
    endChange();
}

function commonTimeWithOut(startId,formatStr, local)
{
    //加载时间控件
    $("#" + startId).hcTimePicker({
        format: formatStr,
        culture: local
//        interval:5
    });
    startTime = $("#" + startId).data("kendoTimePicker");
}

/**
 * 通用时间控件方法，待扩展 没有时分秒
 * 扩展功能：显示时间、格式化、国际化、开始结束时间约束
 * BY： Aaron.CN
 * startId：开始时间控件
 * endId：结束时间控件
 * formatStr：时间格式  yyyy-MM-dd
 * local：国际化  zh-CN
 */
function commonDateCompare(startId, endId, formatStr, local)
{
    //加载时间控件
    $("#" + startId).hcDatePicker({
        format: formatStr,
        culture: local,
        change: startChange
    });
    $("#" + endId).hcDatePicker({
        format: formatStr,
        culture: local,
        change: endChange
    });

    startTime = $("#" + startId).data("kendoDatePicker");
    endTime = $("#" + endId).data("kendoDatePicker");
    startChange();
    endChange();
}

function commonDateWithout(startId, formatStr, local)
{
    //加载时间控件
    $("#" + startId).hcDatePicker({
        format: formatStr,
        culture: local
    });
}

function commonDateLocal(startId, formatStr, local,temp)
{
    //加载时间控件
    $("#" + startId).hcDatePicker({
        format: formatStr,
        culture: local,
        start:temp,
        depth:temp
    });
}

function commonDateTimeLocal(startId, formatStr, local,temp)
{
    //加载时间控件
    $("#" + startId).hcDateTimePicker({
        format: formatStr,
        culture: local,
        start:temp,
        depth:temp,
        interval:60
    });
}

/**
 * 展示时间值
 * @param isDate day:天 month:月 year:年
 * @param showTimeId 需要放置的INPUT的ID
 * @param isPre 是否是需要昨天 上月 去年 ture为是
 */
function showTime(isDate,showTimeId,isPre)
{
    var date = new Date();
    if(isPre)
    {
        if(isDate=="hour")
        {
            date=new Date(date.getTime()-isPre*60*60*1000);
            $("#"+showTimeId).val(date.format("yyyy-MM-dd HH")+':00:00');
        }
        else if(isDate=="day")
        {
            date.setDate(date.getDate()-isPre);
            $("#"+showTimeId).val(date.format("yyyy-MM-dd"));
        }
        else if(isDate=="month")
        {
            //date = new Date(date.getFullYear(),,date.getDate());//上个月
            date.setMonth(date.getMonth()-isPre);
            $("#"+showTimeId).val(date.format("yyyy-MM"));
        }
        else
        {
            var vYear = date.getFullYear();
            vYear=vYear-isPre;
            $("#"+showTimeId).val(vYear);
        }
    }
    else
    {
        if(isDate=="hour")
        {
            date=new Date(date.getTime());
            $("#"+showTimeId).val(date.format("yyyy-MM-dd HH")+':00:00');
        }
        else if(isDate=="day")
        {
            $("#"+showTimeId).val(date.format("yyyy-MM-dd"));
        }
        else if(isDate=="month")
        {
            $("#"+showTimeId).val(date.format("yyyy-MM"));
        }
        else if(isDate=="month-year")
        {
            date.setMonth(date.getMonth()-1)
            var vYear = date.getFullYear();
            $("#"+showTimeId).val(vYear);

        }
        else
        {
            var vYear = date.getFullYear();
            $("#"+showTimeId).val(vYear);
        }
    }
}

/**
 * 创建复选树
 * @param type 复选树名
 * @param treePath 复选树查询路径
 * @param treeData 复选树查询参数
 * @param treeCul 复选框展示的的class
 * @param typeNodes 是否有勾选值赋值，不赋值传'null' 赋值传赋的ID
 */
function createCheckTree(type,treePath,treeData,treeCul,typeNodes,isName)
{
    /*----------------------多选树-------------------------*/
    var treeObj;
    var treeName;
    var treeCode;

    if(!isName)
    {
        isName=false;
    }
    var setting = {
        check: {
            enable: true
            //chkStyle : "radio", //这两个参数可以将
            //radioType : "all"	  //多选树置换成单选数
        },
        //callback:{onCheck:onConfirm},
        data: {simpleData: {enable: true}}
    };

    //node选中事件
    function onConfirm(event, treeId, treeNode){}

    //初始化选中treeNodes
    function initTreeNodes(){
        var chkNodes = treeObj.getCheckedNodes(true);
        treeName= new Array();
        treeCode=new Array();
        jQuery.each(chkNodes,function(idx,node){
            if(node.check_Child_State == -1 ||node.check_Child_State == 2){
                if(isName)
                {
                    treeCode.push("'"+node.name+"'");
                }
                else
                {
                    treeCode.push(node.code);
                }
                treeName.push(node.name);
            }
        });
        $("#"+type+"name").attr("value",treeName);
        $("#"+type+"name").attr("title",treeName);
        $("#"+type).attr("value",treeCode);
    }

    /*---------------初始化车辆类型树-----------------*/

    $("#"+type+"select").jselect();

    var treeNodes= ('null'==typeNodes?"":typeNodes);

    if(treeNodes=="")
    {
        //动态取树
        jQuery.ajax({
            type: "POST",
            url: treePath,
            data:treeData,
            dataType: 'json',
            success: function(msg){
                treeObj = $.fn.zTree.init($("#"+type+"tree"), setting, msg);
            },
            error: function(msg){
                alert("error:"+msg);
            }
        });
    }
    else
    {
        jQuery.ajax({
            type: "POST",
            url: treePath,
            data:treeData+"&check="+treeNodes,
            dataType: 'json',
            success: function(msg){
                treeObj = $.fn.zTree.init($("#"+type+"tree"), setting, msg);
                if(""!=treeNodes){
                    initTreeNodes();
                }
            },
            error: function(msg){
                alert("error:"+msg);
            }
        });
    }

    //选中树
    $("#"+type+"btn").click(function(){
        initTreeNodes();
        $("."+treeCul).hide();
    });

    $("#"+type+"clear").click(function(){
        $("#"+type+"name").attr("value","");
        $("#"+type).attr("value","");
        $("."+treeCul).hide();
        treeObj.checkAllNodes(false);
        treeObj.expandAll(false);
    })

    $('#resetBtn').click(function(){
        $("#"+type+"name").attr("value","");
        $("#"+type).attr("value","");
        $("."+treeCul).hide();
        treeObj.checkAllNodes(false);
        treeObj.expandAll(false);
    })
}

/* 显示遮罩层 */
function showOverlay() {
    $("#overlay").height(document.body.scrollHeight);
    $("#overlay").width(document.body.scrollWidth);
    // fadeTo第一个参数为速度，第二个为透明度
    // 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
    $("#overlay").fadeTo(200, 0.5);
}
/* 隐藏覆盖层 */
function hideOverlay() {
    $("#overlay").fadeOut(200);
}
//两位数补零
function fillZero(v) {
    if (v < 10) {
        v = "0" + v;
    }
    return v;
}

function hcSelectCombox(selectId)
{
    $("#"+selectId).hcComboBox();
    var comboBox = $("#"+selectId).data("kendoComboBox");
    comboBox.input.on("keydown", function(e) {
        return false;
    });
}


function searchFile(fileAddress,url,marginTop)
{
    $(".look_xqBox").css({"width":"1050px","height":"600px"});
    $("#processImg").attr("src",url+"/upload/"+fileAddress);
    isImgLoad(function(){
        // 加载完成
        var img = new Image();
        img.src =$('#processImg').attr("src") ;
        var imageHeight = img.height;
        var imageWidth = img.width;
        if(imageHeight>500||imageWidth>800)
        {
            var heightRate=imageHeight/500;
            var widthRate=imageWidth/800;
            if(heightRate>widthRate)
            {
                imageHeight=500;
                imageWidth=imageWidth/heightRate;
            }
            else
            {
                imageWidth=800;
                imageHeight=imageHeight/widthRate;
            }
        }
        var contentWidth=imageWidth+40;
        var contentHegith=imageHeight+40;
        var contentMarginLeft=-(contentWidth/2);
        var contentTop=(600-contentHegith-40+marginTop)/2;
        $("#processImg").css({"width":imageWidth+"px","height":imageHeight+"px"});
        $(".look_xqContent").css({"width":contentWidth+"px","height":contentHegith+"px","margin-left":contentMarginLeft+"px","top":contentTop+"px"})
        $(".look_xqBox").show(0);
    });
}

function isImgLoad(callback){
    // 注意我的图片类名都是cover，因为我只需要处理cover。其它图片可以不管。
    // 查找所有封面图，迭代处理
    $('.look_con').each(function(){
        // 找到为0就将isLoad设为false，并退出each
        if(this.height === 0){
            isLoad = false;
            return false;
        }
    });
    // 为true，没有发现为0的。加载完毕
    if(isLoad){
        clearTimeout(t_img); // 清除定时器
        // 回调函数
        callback();
        // 为false，因为找到了没有加载完成的图，将调用定时器递归
    }else{
        isLoad = true;
        t_img = setTimeout(function(){
            isImgLoad(callback); // 递归扫描
        },500); // 我这里设置的是500毫秒就扫描一次，可以自己调整
    }
}


function readloadFile(fileName,fileAddress,filePath)
{
    if(fileAddress){
        console.log(filePath);
        var ledgerName=encodeURI(fileName);
        quick_dialog_img("process_show_img", "图片预览",ROOT+"/alertProcess/read?alertProcess.fileAddress="+fileAddress+"&alertProcess.filePath="+filePath, 900, 600);
    }else{
        $.message("文档不存在！", 1, 4, true, true);
    }
}

function downloadFile(fileName,fileAddress,filePath)
{
    if(fileAddress){
        var ledgerName=encodeURI(fileName);
        window.open(ROOT+"/alertProcess/downFile?fileName="+encodeURI(ledgerName)+"&fileAddress="+fileAddress+"&filePath="+filePath,"_blank");
    }else{
        $.message("文档不存在！", 1, 4, true, true);
    }
}

function deleteFile(id,fileAddress,uuuId,filePath)
{
    if(fileAddress){
        if(confirm("确定要删除该上传资料？")){
            jQuery.ajax({
                type: "post",
                url: ROOT+"/alertProcess/deleteFile",
                dataType: "json",
                data: "id="+id+"&fileAddress="+fileAddress+"&filePath="+filePath,
                success: function(data,textStatus) {
                    if(data)
                    {
                        $("#"+uuuId).remove();
                    }
                }
            });
        }
    }else{
        $.message("文档不存在！", 1, 4, true, true);
    }
}