//专题参数
var topicName;
//左侧图标参数
var box;
//数据更新计时器
var interval_1;
//实时滚动指标信息
var zbMap = [];
$(function () {
    //自适应
    leftAuto();
    $(window).resize(function () {
        leftAuto();
    });

    //绑定资源图层选择事件
    $(".layer").click(function () {
        //隐藏图例
        $(".tuli_txt").hide();
        //选择按钮恢复默认状态
        $("div.linan_tc_sel:first a").removeClass("c_add").css("display", "none"); //一直显示【定位】按钮
        //判断是否为选中状态，变更按钮样式
        var check_val = $(this).attr("check_sel");
        if (check_val == "n") {
            $(this).addClass("check_ico_add").attr("check_sel", "y");
        } else if (check_val == "y") {
            $(this).removeClass("check_ico_add").attr("check_sel", "n");
        }
        //循环遍历选择的图层
        var layerParam = {}; //图层信息
        $(".layer").each(function () {
            if ($(this).attr("check_sel") == "y" && $(this).attr("layerName") != undefined && $(this).attr("layerName") != "") {
                var layerNames = $(this).attr("layerName").split(',');
                var layerWheres = $(this).attr("layerWhere").split(';');
                for (var i = 0; i < layerNames.length; i++) {
                    var layerName = layerNames[i];
                    var layerWhere = "";
                    if (i < layerWheres.length) {
                        layerWhere = layerWheres[i];
                    }
                    if (layerParam[layerName] != null && layerParam[layerName] != "") {
                        layerParam[layerName] = layerParam[layerName] + ' OR ' + layerWhere;
                    } else {
                        layerParam[layerName] = layerWhere;
                    }
                    //根据图层名称  显示图例和散点聚合热力选择
                    $("div.linan_tc_sel a[layerBtn*='" + layerName + ",']").css("display", "inline-block");
                    //显示选择的图层图例
                    $("ul[tuli_name='" + layerName + "']").show();
                }
            }
        });
        //清空动态图层
        clearTileSource();
        //加载选择的图层
        addLayer(layerParam);
    });

    $(".switch01").click(function () {
        //判断场站是否打开，未打开则执行显示场站，已打开则关闭场站
        if ($(this).hasClass("check_ico_add") == false) {
            addCZ(); //显示场站
            $(".switch01").addClass("check_ico_add");  //样式修改为选择状态
        } else {
            removeCZ(); //去除场站
            $(".switch01").removeClass("check_ico_add"); //样式修改为关闭状态
        }
    });

    $(".switch02").click(function () {
        if ($(this).hasClass("check_ico_add") == false) {
            clearInterval(update_road_condition_interval);
            baidusate2.setVisible(true);
            update_road_condition();
            update_road_condition_interval = setInterval("update_road_condition()", 60000);
        } else {
            baidusate2.setVisible(false); //隐藏路况
            clearInterval(update_road_condition_interval);
        }
        $(".switch02").toggleClass("check_ico_add");
        $("ul[tuli_name='" + "road_condition" + "']").toggle();
    });

    //查看更多的点击事件
    $(".open_chart_window").click(function () {
        $(".chart_window").animate({"left": "0px"}, 600);
        $("#indicator").load(ROOT + "/screen/chart" + topicName + "All");
    });
    $(".close_chart_window").click(function () {
        $(".chart_window").animate({"left": "-150%"}, 600);
        $("#indicator").empty();
    });

    //左侧图表滚动控件初始化
    $("#chart_box").tinycarousel({
        start: 0,
        axis: "y",
        bullets: false,
        buttons: true,
        animation: true,
        animationTime: 1000,
        interval: false,
        intervalTime: 20000
    });
    box = $("#chart_box").data("plugin_tinycarousel");

    //地图放大缩小按钮
    $(".map_btn .bottom_icon_con").bind("click", function () {
        var max = 18, min = 0;
        var zoom = view.getZoom();
        if ($(this).hasClass("add")) {
            zoomTo(1);
            // view.setZoom(Math.min(max, zoom + 1));
        }
        else {
            zoomTo(0);
            // view.setZoom(Math.max(min, zoom - 1));
        }
    });

    //值班上传
    $(".zhiban_title").bind("click", function () {
        quick_dialog("upload_duty", "值班上传", ROOT + "/screen/uploadDutyInfo", 500, 140);
    });

    //搜索按钮，清除按钮状态切换
    $("#clearSearch").bind("click", function () {
        $("#search").toggle();
        $("#clearSearch").toggle();
        overlay.setPosition(undefined);

        clickLogOut();
        $("#popup-content").empty();
        searchSource.clear();
        closer.blur();
        clearInterval(busgps_interval);
        //还原之前的图层
        if ($(".switch01").hasClass("check_ico_add")) {
            addCZ(); //显示场站
        }
        var layerParam = {}; //图层信息
        $(".layer").each(function () {
            if ($(this).attr("check_sel") == "y" && $(this).attr("layerName") != undefined && $(this).attr("layerName") != "") {
                var layerNames = $(this).attr("layerName").split(',');
                var layerWheres = $(this).attr("layerWhere").split(';');
                for (var i = 0; i < layerNames.length; i++) {
                    var layerName = layerNames[i];
                    var layerWhere = "";
                    if (i < layerWheres.length) {
                        layerWhere = layerWheres[i];
                    }
                    if (layerParam[layerName] != null && layerParam[layerName] != "") {
                        layerParam[layerName] = layerParam[layerName] + ' OR ' + layerWhere;
                    } else {
                        layerParam[layerName] = layerWhere;
                    }
                    //根据图层名称  显示图例和散点聚合热力选择
                    $("div.linan_tc_sel a[layerBtn*='" + layerName + ",']").css("display", "inline-block");
                    //显示选择的图层图例
                    $("ul[tuli_name='" + layerName + "']").show();
                }
            }
        });
        //清空动态图层
        clearTileSource();
        //加载选择的图层
        addLayer(layerParam);
    });

});

/**
 * 专题页面切换
 * @param cid 专题参数，提供查询图表和指标的依据
 * @param num 左侧图表滚动的页数
 * @param index 动态图层layer编号
 * @param obj 元素
 */
function changetopic(cid, num, index, obj) {
    topicName = cid;
    //菜单切换时的图层切换与页面元素的还原。
    changeLayer(cid, index);
    //更新图表
    updateEcharts(cid, num);
    //更新指标项
    updateZhibiao(cid, obj);
    //添加高速封道tips
    if (cid == 'gqzt') {
        trafficEventRoadClosure();

    } else {
        clearInterval(_interval6);
        $('#roadTips').hide();
    }
}

/**
 * 更新指标项
 * @param cid 专题参数，查询专题对应的指标项
 */
function updateZhibiao(cid, obj) {
    //清空指标
    $(".right_zb_head").empty();
    $(".right_zb_list").remove();
    $(".zb_bk").remove();
    $(".last_zb_right").hide();
    var zbLength = 0;
    var zbNum = 0;
    //加载指标项
    jQuery.post(ROOT + "/screen/getMainDataByTopic?topic=" + cid.toUpperCase(), function (data) {
        zbMap = [];
        $.each(data, function (i, item) {
            //加载主题小指标
            if (item.mainTopic != "" && item.mainTopic != null && item.mainTopic.indexOf(cid.toUpperCase()) >= 0) {
                zbLength = zbLength + 59;
                zbNum = zbNum + 1;
                //有数据变化间隔时间则执行指标更实时的刷新方法
                if (!isNaN(item.zbTime)) {
                    var nowdate = new Date();
                    var zbFlowLeft = parseInt(item.mainValue * item.zbTime / (nowdate.getHours() * 60 * 60 + nowdate.getMinutes() * 60));
                    if (zbFlowLeft > item.mainValue) {
                        zbFlowLeft = item.mainValue;
                    }
                    var zbFlow = item.mainValue - zbFlowLeft;
                    zbMap.push({
                        zbFlow: zbFlow,
                        zbFlowLeft: zbFlowLeft,
                        zbTime: item.zbTime,
                        zbName: item.mainKey
                    });
                    $(obj).next().find(".last_zb_right").before('<div class="right_zb_list">' +
                        '<span class="right_zb_01">' + item.mainRemark + '</span>' +
                        '<span class="right_zb_02 odometer" style="font-size: 25px;" mainKey="' + item.mainKey + '"></span>' +
                        '<span class="right_zb_03">' + item.mainUnit + '</span>' +
                        '</div>');
                    if (!isNaN(item.mainValue)) {
                        var el = document.querySelector('span[mainKey=' + item.mainKey + ']');
                        var od = new Odometer({
                            el: el,
                            format: '(ddd).dd'
                        });
                    }
                } else {
                    if (!isNaN(item.mainValue)) {
                        $(obj).next().find(".last_zb_right").before('<div class="right_zb_list">' +
                            '<span class="right_zb_01">' + item.mainRemark + '</span>' +
                            '<span class="right_zb_02 odometer" style="font-size: 25px;" name="' + item.mainKey + '" mainKey="' + item.mainKey + '"></span>' +
                            '<span class="right_zb_03">' + item.mainUnit + '</span>' +
                            '</div>');
                        var el = document.querySelector('span[mainKey=' + item.mainKey + ']');
                        var od = new Odometer({
                            el: el,
                            format: '(ddd).dd'
                        });
                        el.innerHTML = item.mainValue;
                    } else {
                        $(obj).next().find(".last_zb_right").before('<div class="right_zb_list">' +
                            '<span class="right_zb_01">' + item.mainRemark + '</span>' +
                            '<span class="right_zb_02 odometer" style="font-size: 25px;" name="' + item.mainKey + '">' + item.mainValue + '</span>' +
                            '<span class="right_zb_03">' + item.mainUnit + '</span>' +
                            '</div>');
                    }
                }
            }
            //加载主题大指标
            if (item.mainTopicImp != "" && item.mainTopicImp != null && item.mainTopicImp.indexOf(cid.toUpperCase()) >= 0) {
                zbLength = zbLength + 97;
                zbNum = zbNum + 1;
                //有数据变化间隔时间则执行指标更实时的刷新方法
                if (!isNaN(item.zbTime)) {
                    var nowdate = new Date();
                    var zbFlowLeft = parseInt(item.mainValue * item.zbTime / (nowdate.getHours() * 60 * 60 + nowdate.getMinutes() * 60));
                    if (zbFlowLeft > item.mainValue) {
                        zbFlowLeft = item.mainValue;
                    }
                    var zbFlow = item.mainValue - zbFlowLeft;
                    zbMap.push({
                        zbFlow: zbFlow,
                        zbFlowLeft: zbFlowLeft,
                        zbTime: item.zbTime,
                        zbName: item.mainKey
                    });
                    if (item.mainUnit == null || item.mainUnit.trim() == "") {
                        $(obj).next().find(".right_zb_head").append('<li>' +
                            '<h5 class="right_zb_tit">' + item.mainRemark + '</h5>' +
                            '<div class="right_zb_val"><span class="odometer" mainKey="' + item.mainKey + '"></span>' +
                            '</div>');
                    } else {
                        $(obj).next().find(".right_zb_head").append('<li>' +
                            '<h5 class="right_zb_tit">' + item.mainRemark + '</h5>' +
                            '<div class="right_zb_val"><span class="odometer" mainKey="' + item.mainKey + '"></span>' +
                            '<span class="zb_dwval">' + item.mainUnit + '</span>' +
                            '</div>');
                    }
                    if (!isNaN(item.mainValue)) {
                        var el = document.querySelector('span[mainKey=' + item.mainKey + ']');
                        var od = new Odometer({
                            el: el,
                            format: '(ddd).dd'
                        });
                    }
                } else {
                    if (!isNaN(item.mainValue)) {
                        if (item.mainUnit == null || item.mainUnit.trim() == "") {
                            $(obj).next().find(".right_zb_head").append('<li>' +
                                '<h5 class="right_zb_tit">' + item.mainRemark + '</h5>' +
                                '<div class="right_zb_val"><span class="odometer" name="' + item.mainKey + '" mainKey="' + item.mainKey + '"></span>' +
                                '</div>');
                        } else {
                            $(obj).next().find(".right_zb_head").append('<li>' +
                                '<h5 class="right_zb_tit">' + item.mainRemark + '</h5>' +
                                '<div class="right_zb_val"><span class="odometer" name="' + item.mainKey + '" mainKey="' + item.mainKey + '"></span>' +
                                '<span class="zb_dwval">' + item.mainUnit + '</span>' +
                                '</div>');
                        }
                        var el = document.querySelector('span[mainKey=' + item.mainKey + ']');
                        var od = new Odometer({
                            el: el,
                            format: '(ddd).dd'
                        });
                        el.innerHTML = item.mainValue;
                    } else {
                        if (item.mainUnit == null || item.mainUnit.trim() == "") {
                            $(obj).next().find(".right_zb_head").append('<li>' +
                                '<h5 class="right_zb_tit">' + item.mainRemark + '</h5>' +
                                '<div class="right_zb_val"><span class="odometer" name="' + item.mainKey + '">' + item.mainValue + '</span>' +
                                '</div>');
                        } else {
                            $(obj).next().find(".right_zb_head").append('<li>' +
                                '<h5 class="right_zb_tit">' + item.mainRemark + '</h5>' +
                                '<div class="right_zb_val"><span class="odometer" name="' + item.mainKey + '">' + item.mainValue + '</span>' +
                                '<span class="zb_dwval">' + item.mainUnit + '</span>' +
                                '</div>');
                        }
                    }
                }
            }
        });
        clearInterval(interval_1);
        if (zbMap.length > 0) {
            showZBFlow();
            interval_1 = setInterval("showZBFlow()", 5000);
        }
        ;
        //展示指标边框
        showZBFrame(zbLength, zbNum);
        //渐现指标项
        $(".linan_target_box div").lazyFade({
            reverse: false,
            duration: 500,
            delay: 2,
            opacity: {
                start: 0.01,
                end: 1
            }
        });

    });
}

/**
 * 更新指标项
 * @param cid 专题参数，查询专题对应的图表信息
 * @param num 图表滚动的页数
 */
function updateEcharts(cid, num) {
    box.move(0);
    box.stop();
    //去除原图表
    $("#chart_items").empty();
    $("#chart_loading").show();
    //增加新图表
    for (var i = 1; i <= num; i++) {
        $("#chart_items").append('<li class="item" style="width: 100%;"><iframe id="' + cid + i + '" src="' + ROOT + '/screen/chart' + cid + i + '" style="height: 100%;width: 100%;border: 0;overflow: hidden;"></iframe></li>');
    }
    $(".chart_content .items .item").css("height", $(".container").height() - 400 + "px");
    box.update();
    $("#" + cid + "1").load(function () {
        setTimeout(function () {
            $("#chart_loading").hide();
            box.start();
        }, 500);
    });
}

/**
 * 切换专题时图层图例等信息的切换
 * @param cid 专题参数
 * @param index 动态图层layer编号
 */
function changeLayer(cid, index) {
    //隐藏图例
    $(".tuli_txt").hide();
    //隐藏所有弹窗
    $(".open_window").hide();
    //图层选择都改为未选中状态
    $(".check_ico").removeClass("check_ico_add").attr("check_sel", "n");
    if ($("#dw").css("display") == "none") {
        loadingEndCallback();
    }
    //选择按钮恢复默认状态
    $("div.linan_tc_sel a").removeClass("c_add").css("display", "none");
    $("#dw").css("display", "inline-block");
    $('#bottom_right_select').hide();
    $.each(index, function (key, values) {
        //根据图层名称  显示图例和散点聚合热力选择
        $("div.linan_tc_sel a[layerBtn*='" + key + ",']").css("display", "inline-block");
        //显示选择的图层图例
        $("ul[tuli_name='" + key + "']").show();
        //选中选择的图层
        $("span[layerName='" + key + "']").addClass("check_ico_add").attr("check_sel", "y");
    });
    if (cid == "yjzh") {
        $("ul[tuli_name='" + cid + "']").show();
    }

    //清空所有图层和弹窗
    removeAllFeatureLayers();
    if (cid == "weather") {
        $("#map_box").hide();
        $("#weather_box").show();
        //$("#weather_ifr").attr("src","http://www.wz121.com/typhoonweb/Nowtf/map/map.htm");
        $("#weather_ifr").attr("src", "http://typhoon.zjwater.gov.cn/default.aspx");
    } else {
        $("#weather_box").hide();
        $("#map_box").show();
        //交通总览,g20首页 触发显示场站事件
        if (cid == "general" || cid == "regional") {
            $(".switch01").trigger("click");
        } else if (cid == "urban") {
            addPolygonByPoint(119.6989569683, 30.2240957924, 0.01); //城市交通  显示固定区域内的静态点位
        } else if (cid == "travel") {
            addTravel();
        } else if (cid == "road_condition") {   //实时路况
            baidusate2.setVisible(true);
            update_road_condition();
            update_road_condition_interval = setInterval("update_road_condition()", 60000);
        } else if (cid == "bus_country") {

            var thisStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(221, 99, 0, 1)'
                }),
                stroke: new ol.style.Stroke({
                    lineDash: [1, 2, 3, 4],
                    color: /*[237, 212, 0, 0.8]*/'red',
                    width: 2,
                })
            });

            $.ajax({
                type: "POST",
                url: ROOT + "/screen/getEfenceinfo",
                //async:false,
                success: function (msg) {
                    if (msg && msg.length > 0) {
                        for (var i = 0; i < msg.length; i++) {

                            var area_point = msg[i]["AREA_POINT"];
                            var bus_area = new ol.geom.LineString(eval(area_point));
                            var feature = new ol.Feature({
                                type: 'route',
                                geometry: bus_area
                            });
                            feature.setStyle(thisStyle);
                            vectorPointSource.addFeature(feature);
                        }
                    }
                    addLayer(index);
                }
            });

        } else {
            //添加图层
            addLayer(index);
        }
    }
}

/**
 * 自动补全带缓存
 * @param autoCompleteId
 * @param autoCompletePath
 */
function showAutoComplete(autoCompleteId, autoCompletePath) {
    $("#" + autoCompleteId).kendoAutoComplete({
        dataSource: new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
                read: autoCompletePath,
                parameterMap: function (options) {
                    return {filter: options.filter.filters[0].value, prefix: $("#search_prefix").html()};
                }
            },
            pageSize: 1000
        }),
        filter: "contains",
        select: function (e) {
            var text = e.item.text();
            $("#" + autoCompleteId).val(text);
        }
    });
}

//获取指标信息并更新相应指标
function getMainData() {
    jQuery.post(ROOT + "/screen/getMainData", function (data) {
        $.each(data, function (i, item) {
            if (item.mainValue) {
                $("span[name=" + item.mainKey + "]").each(function () {
                    $(this).text(item.mainValue);
                });
            }
        });
    });
}

//指标实时滚动算法刷新
function showZBFlow() {
    for (var i = 0; i < zbMap.length; i++) {
        var zbTime = zbMap[i].zbTime;
        var zbFlow = zbMap[i].zbFlow;
        var zbFlowLeft = zbMap[i].zbFlowLeft;
        var zbName = zbMap[i].zbName;
        if (zbTime <= 0) {
            jQuery.post(ROOT + "/screen/getMainDataByKey?mainKey=" + zbName, function (data) {
                zbTime = data.zbTime;
                if (data.mainValue < zbFlow) {
                    var nowdate = new Date();
                    zbFlowLeft = parseInt(data.mainValue * data.zbTime / (nowdate.getHours() * 60 * 60 + nowdate.getMinutes() * 60));
                    if (zbFlowLeft > data.mainValue) {
                        zbFlowLeft = data.mainValue;
                    }
                    zbFlow = data.mainValue - zbFlowLeft;
                } else {
                    zbFlowLeft = data.mainValue - zbFlow;
                }
                if (zbTime <= 5) {
                    zbMap[i].zbFlowLeft = 0;
                    zbMap[i].zbFlow = zbFlow + zbFlowLeft;
                    zbMap[i].zbTime = 0;
                } else {
                    var value1 = parseInt(zbFlowLeft * Math.random() * 2 * 5 / zbTime);
                    if (value1 > zbFlowLeft) {
                        value1 = zbFlowLeft;
                    }
                    zbMap[i].zbFlowLeft = zbFlowLeft - value1;
                    zbMap[i].zbFlow = zbFlow + value1;
                    zbMap[i].zbTime = zbTime - 5;
                }
                $("span[mainKey=" + zbName + "]").html(zbMap[i].zbFlow);
            });
        } else {
            if (zbTime <= 5) {
                zbMap[i].zbFlowLeft = 0;
                zbMap[i].zbFlow = zbFlow + zbFlowLeft;
                zbMap[i].zbTime = 0;
            } else {
                var value1 = parseInt(zbFlowLeft * Math.random() * 2 * 5 / zbTime);
                if (value1 > zbFlowLeft) {
                    value1 = zbFlowLeft;
                }
                zbMap[i].zbFlowLeft = zbFlowLeft - value1;
                zbMap[i].zbFlow = zbFlow + value1;
                zbMap[i].zbTime = zbTime - 5;
            }
            $("span[mainKey=" + zbName + "]").html(zbMap[i].zbFlow);
        }
    }
}

//获取交通事件信息
function getTrafficEvent() {
    jQuery.ajax({
        type: "get",
        url: ROOT + "/screen/getTrafficEventList",
        data: {"pageNo": 1, "pageSize": 10},
        dataType: "json",
        success: function (result) {
            var eventHtml = '';
            for (var i = 0; i < result.rows.length; i++) {
                eventHtml = eventHtml + "<span class='traffic_txt'>" + result.rows[i].des + "</span>";
            }
            //交通事件滚动内容
            $("#trafficEvent").html(eventHtml);
            $('#trafficEvent').liMarquee({
                // scrollamount:80   调节速度
            });
        },
        error: function (e) {

        }
    });
}

//获取交通事件封道信息
var roadmsg = [];
var today = new Date().getDate();
function trafficEventRoadClosure() {
    jQuery.ajax({
        type: "get",
        url: ROOT + "/screen/trafficEventTips",
        // data: {"pageNo": 1, "pageSize": 10},
        dataType: "json",
        success: function (result) {
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    if (roadmsg.indexOf(result[i].des)<0) {
                        $('#roadTipsText').text(result[i].des);
                         $('#roadTips').show();
                        // $('.layui-layer-dialog').empty();
                        // layer.msg('<span style="font-size: 25px;color: yellow;font-weight: bold">' + result[i].des + '</span>', {
                        //     time: 0,
                        //     anim: 2,
                        //     maxWidth: 600
                        // })
                        // $('.layui-layer-dialog').css('top', '100px');
                        $('#roadTips').on('click', function () {
                            $('#roadTips').hide();
                            roadmsg.push(result[i].des);
                            clearInterval(_interval6);
                            _interval6 = setInterval("trafficEventRoadClosure()", 60000);
                        })
                        if(new Date().getDate() != today){
                            roadmsg = [];
                            today = new Date().getDate();
                        }
                        clearInterval(_interval6);
                        break;
                    }
                }

            }
        },
        error: function (e) {

        }
    });
}

//获取天气信息
function getWeatherInfo() {
    //设置当前是日期
    var myDate = new Date();
    var dataString = myDate.getFullYear() + "." + (fillZero(myDate.getMonth() + 1)) + "." + fillZero(myDate.getDate());
    $("#date").text(dataString);

    jQuery.ajax({
        type: "get",
        url: ROOT + "/weather/json",
        dataType: "json",
        success: function (data) {
            var result = eval(data);
            var now = result["result"]["HeWeather5"][0]["now"];//当前天气
            var weather_code = now["cond"]["code"];
            var weatherText = now["cond"]["txt"] + " " + now["tmp"] + "℃ ";

            $("#weather_text").html(weatherText);
            if (weather_code == "100") {//晴
                $("#weather_ico").html('<img src="' + ROOT + '/assets/images/screen/sun.png">');
            } else if (weather_code == "101") {//多云
                $("#weather_ico").html('<img src="' + ROOT + '/assets/images/screen/cloud.png">');
            } else if (weather_code == "102") {//少云
                $("#weather_ico").html('<img src="' + ROOT + '/assets/images/screen/few-cloud.png">');
            } else if (weather_code == "103") {//晴间多云
                $("#weather_ico").html('<img src="' + ROOT + '/assets/images/screen/sun-cloud.png">');
            } else if (weather_code == "104") {//阴
                $("#weather_ico").html('<img src="' + ROOT + '/assets/images/screen/yin.png">');
            } else if (weather_code.substring(0, 1) == "2") {//风
                $("#weather_ico").html('<img src="' + ROOT + '/assets/images/screen/wind.png">');
            } else if (weather_code.substring(0, 1) == "3") {//雨
                $("#weather_ico").html('<img src="' + ROOT + '/assets/images/screen/rain.png">');
            } else if (weather_code.substring(0, 1) == "4") {//雪
                $("#weather_ico").html('<img src="' + ROOT + '/assets/images/screen/snow.png">');
            } else if (weather_code.substring(0, 1) == "5") {//雾
                $("#weather_ico").html('<img src="' + ROOT + '/assets/images/screen/wu.png">');
            }

            var weather_text = now["cond"]["txt"];
            if (weather_text.indexOf("中雨") >= 0 || weather_text.indexOf("大雨") >= 0
                || weather_text.indexOf("暴雨") >= 0 || weather_text.indexOf("雪") >= 0 || weather_text.indexOf("冻雨") >= 0 ||
                weather_text.indexOf("冰雹") >= 0) {
                $("#weather_ico img").addClass("weather_plan");
                $("#weather_ico").attr("title", "预案详情");
                $("#weather_ico").css("cursor", "pointer");

                //与天气相关预案 弹窗
                $('#weather_text').hDialog({
                    box: '#weather_plan',
                    width: '850',
                    height: '650',
                    beforeShow: function () {
                        $.ajax({
                            url: ROOT + "/czxt/plan/getPlanDjByWeather",
                            data: "weather=" + $("#weather_text").html(),
                            dataType: "json",
                            type: 'POST',
                            success: function (msg) {
                                plan_info = msg;
                                var html = "";
                                for (var key in plan_info) {
                                    html += '<a href="javascript:void(0)">' + key + '</a>';
                                }
                                $(".plan_name a").remove("");
                                $(".plan_name .span_m").after(html);

                                $(".plan_dj a").remove("");
                                $("#weather_plan tbody").html("");
                            }
                        });
                    }
                });

                $("#weather_ico").bind("click", function () {
                    $("#weather_text").click();
                });
            }
        },
        error: function (e) {

        }

    });
}

//获取值班人员信息
function getOnDutyInfo() {
    jQuery.post(ROOT + "/screen/getOnDutyInfo", function (data) {
        var html = '<div class="JQ-content-box"> <ul class="JQ-slide-content" style="margin-top: 0px;">';
        for (var i = 0; i < data.length; i++) {

            var otherHtml = "";
            var other = data[i].other;
            for (var j = 0; j < other.length; j++) {
                otherHtml += "<i>" + other[j] + "</i>"
            }
            html += "<li>"
                + '<span class="zhiban_bm">' + data[i].dep + '</span>'
                + '<span class="zhiban_lader">值班领导—</span>'
                + '<span class="zhiban_lader_name">' + data[i].lead + '</span>'
                + '<span class="zhiban_person">值班人员—</span>'
                + '<span class="zhiban_person_name">'
                + otherHtml
                + '</span>'
                + '</li>';
        }
        html += "</ul></div>";
        $("#temp5").html(html);
        //值班人员自由滚动
        $("#temp5").Slide({
            effect: "scroolTxt",
            speed: "normal",
            timer: 3000,
            steps: 1
        });
    });
}

//左侧底部的表格信息自适应
function leftAuto() {
    var bodyHeight = $(".container").height();
    var bodyWidth = $(".container").width();
    //左侧自适应
    $(".left_bottom_box").css("height", bodyHeight - 320 + "px");
    $(".chart_content").css("height", bodyHeight - 430 + "px");
    $(".left_box").css("height", bodyHeight - 218 + "px")
    //中部自适应
    $(".map_box").css("width", bodyWidth - 610 + "px");
    $(".map_box").css("height", bodyHeight - 140 + "px");

    $(".map_top").css("width", bodyWidth - 236 + "px");
    $(".top_rq").css("width", bodyWidth - 280 + "px")
    $(".map_bottom").css("width", bodyWidth + "px");
    $(".map_bottom").css("height", "70px");
    //右侧自适应
    $(".right_box").css("height", bodyHeight - 70 + "px");
}

//插入分页信息
function insertPageInfo(result, pageName) {
    if (result.total == 0) {
        $(pageName).find(".page_now").text("0");
        $(pageName).find(".page_all").text("0");
        $(pageName).find(".num_now").text("0-0");
        $(pageName).find(".num_all").text("0");
    } else {
        $(pageName).find(".page_now").text(result.pageNo);
        $(pageName).find(".page_all").text(Math.ceil(result.total / result.pageSize));
        $(pageName).find(".num_now").text(((result.pageNo - 1) * result.pageSize + 1) + "-" + ((result.pageNo - 1) * result.pageSize + result.rows.length));
        $(pageName).find(".num_all").text(result.total);
    }
}

//查询高速事件信息
function queryTrafficEvent(pageSize, selector, direction) {
    var pageNo = parseInt($(selector).find(".page_now").text());
    var pageAll = parseInt($(selector).find(".page_all").text());
    var condition;
    if ((pageNo < pageAll && direction == "next") || (pageNo > 1 && direction == "prev") || direction == undefined || direction == "") {
        $(".data_loading").show();
        //默认一页显示10条
        if (pageSize == "" || pageSize == undefined) {
            pageSize = 10;
        }

        if (direction == "next") {
            pageNo = pageNo + 1;
        } else if (direction == "prev") {
            pageNo = pageNo - 1;
        } else {
            pageNo = 1;
            $(selector).find("input[name=condition_keyword]").val($(selector).find("input[name=keyword]").val());
        }
        condition = $(selector).find("input[name=condition_keyword]").val();

        jQuery.ajax({
            type: "get",
            url: ROOT + "/screen/getTrafficEventList",
            dataType: "json",
            data: {"pageNo": pageNo, "pageSize": pageSize, "condition.des": condition},
            success: function (result) {
                $(".data_loading").hide();
                //插入分页信息
                insertPageInfo(result, selector)
                //插入列表记录
                insertTrafficEventTbody(result);
            },
            error: function (e) {

            }
        });
    }
}

//插入高速事件列表记录
function insertTrafficEventTbody(result) {
    var tbody_html = "";
    for (var i = 0; i < result.rows.length; i++) {
        tbody_html = tbody_html + "<li><span class='road_ico'></span><span>" + result.rows[i].des + "</span><span class='bj_li_con'></span></li>";
    }
    $("#trafficEventMore").html(tbody_html);
}

$(function () {
    $(".lianan_home p").click(function () {
        $(".linan_nav_addIco").removeClass("linan_nav_addIco_reduce");
        $(".linan_target_box").slideUp(300);
        $(".slide_box").slideUp(300);
        //$(".linan_nav p").removeClass("hov_add");
        $(this).parent().find(".linan_target_box_home").show(300);
        $(".linan_target_box_home").css("position", "absolute");
        var nn = $(this).parent().attr("linan_w");
        $(".page_title_text").attr("page_state", nn);
        $(".page_title_text").html("交通总览");
    })
    $(".linan_nav p").click(function () {
        $(".linan_target_box_home").fadeOut(300);
        //切换页面标题
        var nn = $(this).parent(".linan_nav").attr("linan_nav_val");
        var tt = $(this).find("span").eq(1).html();
        var yes = $(this).attr("yes");
        if (yes == "y") {
            $(".page_title_text").attr("page_state", nn);
            $(".page_title_text").html(tt);
            $(".linan_nav").find(".linan_nav").find("p").removeClass("hov_add");
            $(".linan_target_box_son").slideUp(300);
            $(this).parent(".linan_nav").find(".linan_target_box_father").slideDown(300);
        }
        //普通切换
        $(this).addClass("hov_add").parent(".linan_nav").siblings().find("p").removeClass("hov_add");
        ;
        $(this).parent(".linan_nav").find(".slide_box").slideDown(400);
        $(this).parent(".linan_nav").siblings().find(".slide_box").slideUp(400);

        //子菜单恢复默认
        var fa = $(this).parent(".linan_nav").attr("father");
        $(".linan_nav_addIco").removeClass("linan_nav_addIco_reduce");
        if (fa == "y") {
            $(this).parent(".linan_nav").siblings().find(".linan_target_box").slideUp(200);
            $(this).find(".linan_nav_addIco").addClass("linan_nav_addIco_reduce");
        } else if (fa == "n") {
            $(this).parent().parent().parent(".linan_nav").find(".linan_nav_addIco").addClass("linan_nav_addIco_reduce");
        }
    });

    $(".linan_nav_son").click(function () {
        $(this).find(".linan_target_box").slideDown(300).end().siblings().find(".linan_target_box").slideUp(300);
        $(".linan_target_box_father").slideUp(300);
    });

    $(".linan_tc_sel .linan_tc_lish").click(function () {
        $(this).addClass("c_add").siblings().removeClass("c_add");
    });

    //右侧鼠标移出事件
    $(".right_box").mouseleave(function () {
        $(".linan_nav_addIco").removeClass("linan_nav_addIco_reduce");
        var page_state = $(".page_title_text").attr("page_state");
        var linan_nav_f = $("." + page_state).attr("father");
        if (linan_nav_f == "y") {
            $("." + page_state).find(".slide_box").slideDown(400);
            $("." + page_state).children("p").addClass("hov_add");
            //$("." + page_state).siblings(".linan_nav").children("p").removeClass("hov_add");
            $("." + page_state).siblings(".linan_nav").find(".slide_box").slideUp(400);
            $("." + page_state).children(".linan_target_box_father").slideDown(400);
            $("." + page_state).find(".linan_nav_addIco").addClass("linan_nav_addIco_reduce");
        } else if (linan_nav_f == "n") {
            $("." + page_state).find("p").addClass("hov_add");
            $("." + page_state).parent().parent(".linan_nav").find(".slide_box").slideDown(400);
            $("." + page_state).parent().parent(".linan_nav").children("p").addClass("hov_add");
            //$("." + page_state).parent().parent(".linan_nav").siblings(".linan_nav").children("p").removeClass("hov_add");
            $("." + page_state).parent().parent(".linan_nav").siblings(".linan_nav").find(".slide_box").slideUp(400);
            $("." + page_state).children(".linan_target_box_son").slideDown(400);
            $("." + page_state).parent().parent(".linan_nav").find("p").find(".linan_nav_addIco").addClass("linan_nav_addIco_reduce");
        }
        // alert(page_state)
        if (page_state == "linan_jtzl") {
            $(".slide_box").slideUp(300);
            $(".linan_target_box").slideUp(300);
            //$(".linan_nav p").removeClass("hov_add");
            $(".linan_target_box_home").stop(true).fadeIn(300);
        }
    });

    //图例
    $(".tuli_box").hover(function () {
        var show_count = 0;
        var li_val = $(".tuli_box .tuli_txt").length;
        for (i = 0; i < li_val; i++) {
            var hidden_val = $(".tuli_box .tuli_txt").eq(i).css("display");
            if (hidden_val == "block") {
                show_count++;
            }
        }
        var box_height = 38 * show_count;
        $(".tuli_box").stop().animate({"height": box_height + "px"}, 200);
    }, function () {
        $(".tuli_box").stop().animate({"height": "38px"}, 200);
    })


    //触发
    $('.linan_tc_lish,.tab_bk').hover(
        function () {
            var bk_span = '<span class="bk bk_left"></span><span class="bk bk_top"></span><span class="bk bk_right"></span><span class="bk bk_bottom"></span>';
            var obj = $(this);
            obj.find("span.bk").remove();
            obj.css("position", "relative");
            obj.append(bk_span);
            biankuang(obj);
        },
        function () {
            var obj = $(this);
            biankuang1(obj);
        }
    );

    $(".history_text ul li").hover(function () {
        $(this).addClass("se_add").find("p").addClass("sep_add");
    }, function () {
        $(this).removeClass("se_add").find("p").removeClass("sep_add");
    })

    //搜索下拉列表框

    $('.se_ok').click(function () {
        var sel_o = $(this).attr('se_ok');
        if (sel_o == 'y') {
            $('.se_ul').slideDown(200);
            $(this).attr('se_ok', 'n');
        } else if (sel_o == 'n') {
            $('.se_ul').slideUp(200);
            $(this).attr('se_ok', 'y');
        }
        return false;
    });
    $('.se_ul li').click(function () {
        var sel_w = $(this).html();
        $('.se_ok').html(sel_w);
        $('.se_ul').slideUp(200);
        $('.se_ok').attr('se_ok', 'y');
    });

    $('#search_HBox').on('click', function () {
        $('.se_ul').slideUp(200);
        $('.se_ok').attr('se_ok', 'y');
    });
    //底部弹出tab选择
    //$(".btn_top").click(function(){
    //    $(".b_tWindow").show();
    //    $(this).hide();
    //});
    //$(".top_tab li").parent().siblings(".top_tab_con").eq(0).show();
    //$(".top_tab li").click(function(){
    //    var $liVal = $(this).index();
    //    $(this).addClass("top_tabAdd").siblings().removeClass("top_tabAdd");
    //    $(this).parent().siblings(".top_tab_con").hide();
    //    $(this).parent().siblings(".top_tab_con").eq($liVal).show();
    //});
    //
    //$(".w_close_ico").click(function(){
    //    $(this).parents(".open_window").hide();
    //    var zdy = $(this).attr("zdy");
    //    if(zdy=="bj"){
    //        $(".btn_top").show();
    //    }
    //    $(".btn_top").show();
    //
    //});


});

//边框特效
//边框效果--移入
function biankuang(obj) {
    $(obj).find('.bk_left').stop(true).animate({
        height: '36px'
    }, 200)
    $(obj).find('.bk_bottom').stop(true).delay(100).animate({
        width: '74px'
    }, 200)
    $(obj).find('.bk_right').stop(true).animate({
        height: '36px'
    }, 200)
    $(obj).find('.bk_top').stop(true).delay(100).animate({
        width: '74px'
    }, 200)
}

//边框效果--移出
function biankuang1(obj) {

    $(obj).find('.bk_left').stop(true).delay(50).animate({
        height: '0px'
    }, 100)
    $(obj).find('.bk_bottom').stop(true).animate({
        width: '0px'
    }, 100)
    $(obj).find('.bk_right').stop(true).delay(50).animate({
        height: '0px'
    }, 100)
    $(obj).find('.bk_top').stop(true).animate({
        width: '0px'
    }, 100)
}

//指标展示特效
function showZBFrame(zbLength, zbNum) {
    $(".zb_bk").remove();
    $(".linan_target_box").append('<span class="zb_bk zb_bk_left"></span><span class="zb_bk zb_bk_right"></span><span class="zb_bk zb_bk_top"></span><span class="zb_bk zb_bk_bottom"></span><span class="zb_bk zb_bk_xie"></span><span class="zb_bk zb_bk_middle"></span>');
    $(".linan_target_box_son,.linan_target_box_father").css("position", "relative");
    $(".zb_bk_left").stop(true).delay(500).animate({
        height: zbLength + "px"
    }, 150 * zbNum);
    $(".zb_bk_right").stop(true).delay(500).animate({
        height: (zbLength + 65) + "px"
    }, 150 * zbNum * (zbLength + 65) / zbLength);
    $(".zb_bk_top").stop(true).delay(500).animate({
        width: "196px"
    }, 150 * zbNum);
    $(".zb_bk_xie").stop(true).delay(500 + 150 * zbNum).animate({
        width: "103px"
    }, 500);
    $(".zb_bk_bottom").stop(true).delay(1000 + 150 * zbNum).animate({
        width: "116px"
    }, 500);
    $(".zb_bk_middle").stop(true).delay(1500 + 150 * zbNum).animate({
        width: "160px"
    }, 500);
}


/********路段信息表 开始*******/
function queryRoadInfo(pageSize, selector, direction) {
    var pageNo = parseInt($(selector).find(".page_now").text());
    var pageAll = parseInt($(selector).find(".page_all").text());
    var condition;
    if ((pageNo < pageAll && direction == "next") || (pageNo > 1 && direction == "prev") || direction == undefined || direction == "") {
        $(".data_loading").show();
        //默认一页显示10条
        if (pageSize == "" || pageSize == undefined) {
            pageSize = 10;
        }

        if (direction == "next") {
            pageNo = pageNo + 1;
        } else if (direction == "prev") {
            pageNo = pageNo - 1;
        } else {
            pageNo = 1;
            $(selector).find("input[name=condition_keyword]").val($(selector).find("input[name=keyword]").val());
        }
        condition = $(selector).find("input[name=condition_keyword]").val();

        jQuery.ajax({
            type: "get",
            url: ROOT + "/screen/getRoadInfoList",
            dataType: "json",
            data: {"pageNo": pageNo, "pageSize": pageSize, "condition": condition},
            success: function (result) {
                $(".data_loading").hide();
                //插入分页信息
                insertPageInfo(result, selector);
                //插入列表记录
                insertRoadInfo(result, selector);
            },
            error: function (e) {

            }
        });
    }
}

function insertRoadInfo(result, selector) {
    var size = result.rows.length;
    var html = "";
    for (var i = 0; i < size; i++) {
        html += "<tr>"
            + "<td>" + result.rows[i].xzdj + "</td>"
            + "<td>" + result.rows[i].xlbh + "</td>"
            + "<td>" + result.rows[i].xlmc + "</td>"
            + "<td>" + result.rows[i].zh + "</td>"
            + "<td>" + result.rows[i].lc + "</td>"
            + "<td>" + result.rows[i].ssld + "</td>"
            + "<td>" + result.rows[i].lxr + "</td>"
            + "<td>" + result.rows[i].lxdh + "</td>"
            + "</tr>"
    }
    html = html.replace(/undefined/g, "");
    $(selector).find("tbody").html(html);
}

/********路段信息表 结束*******/


/************报警开始 ************/

function queryAlarmListInfo(pageSize, selector, direction) {
    var pageNo = parseInt($(selector).find(".page_now").text());
    var pageAll = parseInt($(selector).find(".page_all").text());
    var plateNumber, plateType, alarmType;
    if ((pageNo < pageAll && direction == "next") || (pageNo > 1 && direction == "prev") || direction == undefined || direction == "") {
        $(".data_loading").show();
        //默认一页显示10条
        if (pageSize == "" || pageSize == undefined) {
            pageSize = 10;
        }

        if (direction == "next") {
            pageNo = pageNo + 1;
        } else if (direction == "prev") {
            pageNo = pageNo - 1;
        } else {
            pageNo = 1;
            $(selector).find("input[name=condition_plateNumber]").val($(selector).find("input[name=plateNumber]").val());
            $(selector).find("input[name=condition_plateType]").val($(selector).find("select[name=plateType]").val());
            $(selector).find("input[name=condition_alarmType]").val($(selector).find("select[name=alarmType]").val());
        }
        plateNumber = $(selector).find("input[name=condition_plateNumber]").val();
        plateType = $(selector).find("input[name=condition_plateType]").val();
        alarmType = $(selector).find("input[name=condition_alarmType]").val();

        jQuery.ajax({
            type: "get",
            url: ROOT + "/screen/getAlarmList",
            dataType: "json",
            data: {
                "pageNo": pageNo,
                "pageSize": pageSize,
                "plateNumber": plateNumber,
                "plateType": plateType,
                "alarmType": alarmType,
                "alarmDate": $("#alarmDate").val().replace(/-/g, "")
            },
            success: function (result) {
                $(".data_loading").hide();
                //插入分页信息
                insertPageInfo(result, selector);
                //插入列表记录
                insertAlarmList(result, selector);
            },
            error: function (e) {

            }
        });
    }
}

function insertAlarmList(result, selector) {
    var size = result.rows.length;
    var html = "";
    for (var i = 0; i < size; i++) {
        html += "<tr>"
            + "<td onclick='queryById(\"[" + result.rows[i].plateTypeName + "]" + result.rows[i].plateNumber + "\")'>" + result.rows[i].plateNumber + "</td>"
            + "<td>" + result.rows[i].plateTypeName + "</td>"
            + "<td>" + result.rows[i].alarmTypeName + "</td>"
            + "<td>" + result.rows[i].startTime + "</td>"
            + "<td>" + result.rows[i].endTime + "</td>"
            + "<td><span style='color:#FEAE1B;cursor:pointer;font-weight: 600;' onclick='alarmPlayBack(" + JSON.stringify(result.rows[i]) + ")'>" + "轨迹回放</span></td>"
            + "</tr>";
    }
    html = html.replace(/undefined/g, "");
    $(selector).find("tbody").html(html);
}


/************报警结束 ***************/

/********应急预案列表 开始*******/
function queryPlanList(pageSize, selector, direction) {
    var pageNo = parseInt($(selector).find(".page_now").text());
    var pageAll = parseInt($(selector).find(".page_all").text());
    var condition;
    if ((pageNo < pageAll && direction == "next") || (pageNo > 1 && direction == "prev") || direction == undefined || direction == "") {
        $(".data_loading").show();
        //默认一页显示10条
        if (pageSize == "" || pageSize == undefined) {
            pageSize = 10;
        }

        if (direction == "next") {
            pageNo = pageNo + 1;
        } else if (direction == "prev") {
            pageNo = pageNo - 1;
        } else {
            pageNo = 1;
            $(selector).find("input[name=condition_keyword]").val($(selector).find("input[name=keyword]").val());
        }
        condition = $(selector).find("input[name=condition_keyword]").val();

        jQuery.ajax({
            type: "post",
            url: ROOT + "/plan/list",
            dataType: "json",
            data: {"pageNo": pageNo, "pageSize": pageSize, "condition.yamc": condition},
            success: function (result) {
                $(".data_loading").hide();
                //插入分页信息
                insertPageInfo(result, selector);
                //插入列表记录
                insertPlanList(result, selector);
            },
            error: function (e) {

            }
        });
    }
}

function insertPlanList(result, selector) {
    var size = result.rows.length;
    var html = "";
    for (var i = 0; i < size; i++) {
        html += "<tr>"
            + "<td>" + result.rows[i].dw + "</td>"
            + "<td>" + result.rows[i].yamc + "</td>"
            + "<td>" + result.rows[i].wjh + "</td>"
            + "<td>" + result.rows[i].fwsj + "</td>"
            + "<td>" + result.rows[i].sxsj + "</td>"
            + "<td><a href=\"javascript:void(0)\" title=\"下载\" onclick=\"downloadFile(" + result.rows[i].id + ")\" style='color: #FEAE1B'>下载</a></td>"
            + "</tr>"
    }
    html = html.replace(/undefined/g, "");
    $(selector).find("tbody").html(html);
}

/********应急预案列表 结束*******/

/************报警轨迹播放 开始*************/

function alarmPlayBack(obj) {

    var type = obj.plateTypeName;
    var paramMap = {};
    paramMap["playbackName"] = obj.plateNumber;
    paramMap["startTime"] = obj.startTime;
    paramMap["endTime"] = obj.endTime;
    if (type == "公交车") {
        paramMap["playbackType"] = "bus";
    } else if (type == "出租车") {
        paramMap["playbackType"] = "taxi";
    } else {

    }

    $.ajax({
        url: ROOT + "/screen/playback",
        data: paramMap,
        dataType: 'json',
        type: 'post',
        success: function (data) {
            if (data.list.length > 0) {
                data.playback["source"] = "alarm";
                data.playback["alarmTypeName"] = obj.alarmTypeName;
                playbackInit(data);
                if (type == "公交车") {
                    showBusLineById(parseInt(obj.lineId));
                }
            } else {
                notify("暂无GPS数据", "warn");
            }
        }, error: function (msg) {
            notify("暂无GPS数据", "warn");
        }
    });
}

/************报警轨迹播放 结束*************/
function downloadFile(id) {
    window.open(ROOT + "/plan/downloadFile?id=" + id, "_blank");
}

/********************应急指挥 开始****************/
function show_operate_record(obj) {

    $("#operate_recoder_HBox").find("input[name=keyword]").attr("hidevalue", obj);
    $("#operate_recoder_btn").click();
}

/**
 * 操作日志 分页展示
 * @param pageSize
 * @param selector
 * @param direction
 */
function query_operate_record(pageSize, selector, direction) {

    $(selector).show();
    var pageNo = parseInt($(selector).find(".page_now").text());
    var pageAll = parseInt($(selector).find(".page_all").text());
    var condition;
    if ((pageNo < pageAll && direction == "next") || (pageNo > 1 && direction == "prev") || direction == undefined || direction == "") {
        $(".data_loading").show();
        //默认一页显示10条
        if (pageSize == "" || pageSize == undefined) {
            pageSize = 10;
        }

        if (direction == "next") {
            pageNo = pageNo + 1;
        } else if (direction == "prev") {
            pageNo = pageNo - 1;
        } else {
            pageNo = 1;
        }

        condition = $(selector).find("input[name=keyword]").val();
        jQuery.ajax({
            type: "POST",
            url: ROOT + "/czxt/operaterecord/list",
            dataType: "json",
            data: {"pageNo": pageNo, "pageSize": pageSize, "name": condition},
            success: function (result) {
                $(".data_loading").hide();
                //插入分页信息
                insertPageInfo(result, selector);
                //插入列表记录
                inserOperate_record(result, selector);
            },
            error: function (e) {
            }
        });
    }
}

function inserOperate_record(result, selector) {
    var size = result.rows.length;
    var html = "";
    for (var i = 0; i < size; i++) {
        html += "<tr style='line-height: 38px;'>"
            + "<td>" + result.rows[i].name + "</td>"
            + "<td>" + result.rows[i].ip + "</td>"
            + "<td>" + result.rows[i].btn + "</td>"
            + "<td>" + result.rows[i].describe + "</td>"
            + "<td>" + result.rows[i].clickTime + "</td>"
            + "</tr>"
    }
    html = html.replace(/undefined/g, "");
    $(selector).find("tbody").html(html);
}

function query_zfc_list(pageSize, selector, direction) {

    var pageNo = parseInt($(selector).find(".page_now").text());
    var pageAll = parseInt($(selector).find(".page_all").text());
    var condition;
    if ((pageNo < pageAll && direction == "next") || (pageNo > 1 && direction == "prev") || direction == undefined || direction == "") {
        $(".data_loading").show();
        //默认一页显示10条
        if (pageSize == "" || pageSize == undefined) {
            pageSize = 10;
        }

        if (direction == "next") {
            pageNo = pageNo + 1;
        } else if (direction == "prev") {
            pageNo = pageNo - 1;
        } else {
            pageNo = 1;
        }

        condition = $(selector).find("input[name='keyword']").val();
        jQuery.ajax({
            type: "POST",
            url: ROOT + "/czxt/screen/zfclist",
            dataType: "json",
            data: {"pageNo": pageNo, "pageSize": pageSize, "name": condition},
            success: function (result) {
                $(".data_loading").hide();
                //插入分页信息
                insertPageInfo(result, selector);
                //插入列表记录
                inserZfclist(result, selector);
            },
            error: function (e) {
            }
        });
    }
}

function inserZfclist(result, selector) {

    var size = result.rows.length;
    var html = "";
    for (var i = 0; i < size; i++) {

        var color = result.rows[i].PLA_TYPE;
        if (color == '1') {
            color = '蓝';
        } else if (color == '2') {
            color = '黄';
        } else if (color == '3') {
            color = '黄';
        }
        else {
            color = '白';
        }

        html += "<tr style='line-height: 38px;'>"
            + "<td onclick=\"queryById_yjzh(\'" + "[执法车]" + result.rows[i].PLA_NO + "\')\"><span style='font-weight:600;color:#FEAE1B;cursor:pointer;'>" + result.rows[i].PLA_NO + "</span></td>"
            + "<td>" + color + "</td>"
            + "<td>" + result.rows[i].XH + "</td>"
            + "<td>" + result.rows[i].SSBM + "</td>"
            + "<td>" + result.rows[i].SSDW + "</td>"
            + "</tr>"
    }
    html = html.replace(/undefined/g, "");
    $(selector).find("tbody").html(html);
}

function query_event_his(pageSize, selector, direction) {

    var pageNo = parseInt($(selector).find(".page_now").text());
    var pageAll = parseInt($(selector).find(".page_all").text());
    var condition;
    if ((pageNo < pageAll && direction == "next") || (pageNo > 1 && direction == "prev") || direction == undefined || direction == "") {
        $(".data_loading").show();
        //默认一页显示10条
        if (pageSize == "" || pageSize == undefined) {
            pageSize = 10;
        }

        if (direction == "next") {
            pageNo = pageNo + 1;
        } else if (direction == "prev") {
            pageNo = pageNo - 1;
        } else {
            pageNo = 1;
        }

        condition = $(selector).find("input[name=condition_keyword]").val();
        var time = $("#event_his_date").val();
        jQuery.ajax({
            type: "POST",
            url: ROOT + "/czxt/event/listhis",
            dataType: "json",
            data: {"pageNo": pageNo, "pageSize": pageSize, "name": condition, "happenTime": time},
            success: function (result) {
                $(".data_loading").hide();
                //插入分页信息
                insertPageInfo(result, selector);
                //插入列表记录
                insert_event_his(result, selector);
            },
            error: function (e) {

            }
        });
    }
}

function insert_event_his(result, selector) {

    var html = "";
    for (var i = 0; i < result.rows.length; i++) {
        html += '<tr>'
            + "<td>" + result.rows[i].name + "</td>"
            + "<td>" + result.rows[i].happenTime + "</td>"
            + "<td>" + result.rows[i].site + "</td>"
            + "<td>" + result.rows[i].planName + "</td>"
            + "<td>" + result.rows[i].planDjName + "</td>"
            + "<td><a eventid='" + result.rows[i].id + "' eventdetail='" + encodeURIComponent(JSON.stringify(result.rows[i])) + "' style='color:#FEAE1B;cursor:pointer;font-weight:600;'>查看详情</a></td>"
            + '</tr>';
    }
    html = html.replace(/undefined/g, "");
    $(selector).find("tbody").html(html);

    $(selector + " tr td a").on("click", function () {
        $('#HCloseBtn').click();
        var data = $(this).attr("eventdetail");
        data = eval("(" + decodeURIComponent(data) + ")");
        returnData = data;

        for (var key in data) {
            $("#" + key).html(data[key]);
        }

        var arr = [data];
        var frames = parent.frames;
        for (var i = 0; i < frames.length; i++) {
            if (frames[i].frameElement.id == "yjzh1") {
                window.parent.addeventpoint(arr, true);
                //$(".right_bottom_win").css("bottom","130px").css("opacity","1");
                return;
            }
        }
    });
}

//获取部门人员列表
function query_dept_people(pageSize, selector, direction) {

    var pageNo = parseInt($(selector).find(".page_now").text());
    var pageAll = parseInt($(selector).find(".page_all").text());
    var condition;
    if ((pageNo < pageAll && direction == "next") || (pageNo > 1 && direction == "prev") || direction == undefined || direction == "") {
        $(".data_loading").show();
        //默认一页显示10条
        if (pageSize == "" || pageSize == undefined) {
            pageSize = 10;
        }

        if (direction == "next") {
            pageNo = pageNo + 1;
        } else if (direction == "prev") {
            pageNo = pageNo - 1;
        } else {
            pageNo = 1;
        }

        var name = $(selector).find("input[name='name']").val();
        var department = $(selector).find("input[name='department']").val();
        jQuery.ajax({
            type: "POST",
            url: ROOT + "/addressBook/list",
            dataType: "json",
            data: {"pageNo": pageNo, "pageSize": pageSize, "condition.name": name, "condition.department": department},
            success: function (result) {
                $(".data_loading").hide();
                //插入分页信息
                insertPageInfo(result, selector);
                //插入列表记录
                insert_dept_people(result, selector);
            },
            error: function (e) {

            }
        });
    }
}

function insert_dept_people(result, selector) {
    var size = result.rows.length;
    var html = "";
    for (var i = 0; i < size; i++) {

        html += "<tr style='line-height: 38px;'>"
            + "<td>" + result.rows[i].name + "</td>"
            + "<td>" + result.rows[i].mobile + "</td>"
            + "<td>" + result.rows[i].job + "</td>"
            + "<td>" + result.rows[i].departmentName + "</td>"
            + "<td>" + result.rows[i].section + "</td>"
            + "<td>" + result.rows[i].remark + "</td>"
            + "</tr>"
    }
    html = html.replace(/undefined/g, "");
    $(selector).find("tbody").html(html);
}

/********************应急指挥 结束****************/
