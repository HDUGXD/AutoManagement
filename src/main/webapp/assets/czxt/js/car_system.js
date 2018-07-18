$(function(){
	//各个模块高度和宽度自适应
	function window_auto(){
		//首页的适应
		var c_sys_width = $('.c_sys_contianer').width();
		var c_sys_height = $('.c_sys_contianer').height();
		$('.c_sys_left').css('height',(c_sys_height-120)+'px');
		$('.event_height').css('height',(c_sys_height-186)+'px');
		$('.c_sys_right').css('height',(c_sys_height-120)+'px');
		$('.c_sys_right').css('width',(c_sys_width-395)+'px');
		$('.right_bottom_win').css('width',(c_sys_width-480)+'px');
		//执行页面的适应
		var c_zhixing_width = $('.zhixing_box_con').width();
		var c_zhixing_height = $('.zhixing_box_con').height();
		$('.car_track_map').css('width',(c_zhixing_width-410)+'px');
		$('.car_track_map').css('height',(c_zhixing_height-180)+'px');
		$('.block_btns').css('width',(c_zhixing_width-410)+'px');
		$('.plan_yu_list').css('height',(c_zhixing_height-115)+'px');
	}
	window_auto();
	window.onresize = function(){
		window_auto();
	}

	$('.dw_icon').click(function(){
		$('.right_bottom_win').animate({'bottom':'30px','opacity':'1'}, 600);
	})
	//事件点击变色
	$('li.event_list').on('click',function(){
		//alert(0)
		$(this).find('.c_event_con').css('color','#f00');
	});
	// 执行窗口关闭/弹出
	$('.zhixing_box').hide(0);
	$('.leave_page').click(function(){
		window.parent.clearFrame();
	});
	$('.star_zx').click(function(){
		var id = $("#id").val();
		$("#ifr").attr("src",ROOT + "/czxt/screen/index1?sendId=czxt&id=" + id );
		$('.zhixing_box').show();
	});

	// 执行界面对话框
	$('.open_left').click(function(){
		$(this).hide(300);
		$(this).removeClass("open_left_add");
		$('.right_talk_box').animate({'right':'0px'}, 400);
	});
	$('.open_right').click(function(){
		$('.open_left').show(400);
		$('.right_talk_box').animate({'right':'-510px'}, 400);
	});
});

function queryRoadInfo(pageSize,selector,direction){
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
			type: "POST",
			url: ROOT + "/czxt/device/list",
			dataType: "json",
			data: {"pageNo": pageNo, "pageSize": pageSize, "name": condition},
			success: function (result) {
				$(".data_loading").hide();
				//插入分页信息
				insertPageInfo(result, selector);
				//插入列表记录
				insertRoadInfo(result, selector);
			},
			error: function (e) {}
		});
	}
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


function insertRoadInfo(result,selector){
	var size = result.rows.length;
	var html = "";
	for(var i =0;i<size;i++){
		html += "<tr style='line-height: 38px;'>"
			+ "<td>" + result.rows[i].code + "</td>"
			+ "<td>" + result.rows[i].name + "</td>"
			+ "<td>" + result.rows[i].owner + "</td>"
			+ "<td>" + result.rows[i].state   + "</td>"
			+ "<td>" + result.rows[i].num   + "</td>"
			+ "</tr>";
	}
	html = html.replace(/undefined/g,"");
	$(selector).find("tbody").html(html);
}

function queryEventInfo(pageSize,selector,direction){
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
		var time = $("#alarmDate2").val();
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
                insertHisEventInfo(result, selector);
            },
            error: function (e) {

            }
        });
    }
}

/**
 * 操作日志 分页展示
 * @param pageSize
 * @param selector
 * @param direction
 */
function query_operate_record(pageSize,selector,direction){
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
			error: function (e) {}
		});
	}
}

function inserOperate_record(result,selector){
	var size = result.rows.length;
	var html = "";
	for(var i =0;i<size;i++){
		html += "<tr style='line-height: 38px;'>"
			+ "<td>" + result.rows[i].name + "</td>"
			+ "<td>" + result.rows[i].ip + "</td>"
			+ "<td>" + result.rows[i].btn + "</td>"
			+ "<td>" + result.rows[i].describe   + "</td>"
			+ "<td>" + result.rows[i].clickTime   + "</td>"
			+ "</tr>"
	}
	html = html.replace(/undefined/g,"");
	$(selector).find("tbody").html(html);
}


function insertHisEventInfo(result,selector){
    var size = result.rows.length;
    var html = "";
    for(var i =0;i<size;i++){
        html += "<tr style='line-height: 38px;'>"
            + "<td><span>" + result.rows[i].name + "</span></td>"
            + "<td>" + result.rows[i].happenTime + "</td>"
            + "<td>" + result.rows[i].site + "</td>"
            + "<td>" + result.rows[i].planName   + "</td>"
            + "<td>" + result.rows[i].planDjName   + "</td>"
			+ "<td><a eventid='"+result.rows[i].id+"' eventdetail='"+ encodeURIComponent(JSON.stringify(result.rows[i])) +"'><span style='color:#FEAE1B;cursor:pointer;font-weight:600;' title='事件详情'>查看详情</span></a></td>"
            + "</tr>";
    }
    html = html.replace(/undefined/g,"");
    $(selector).find("tbody").html(html);

	$(".tab_xin_c tr td a").on("click",function () {
		$('#HCloseBtn').click();
        var data = $(this).attr("eventdetail");
        data = eval("(" + decodeURIComponent(data) + ")");

        $(".event_height").find("li").removeClass("event_choice");
        $("div[id*='anchor']").remove();
        $("#overlaycontent").append(
            '<div id="anchor">' + '<img id="anchorImg" src="'+ROOT+'/assets/czxt/images/event.png" > ' +
            '</div>');
        var pointOverlay = new ol.Overlay({
            element: document.getElementById('anchor'),
        });

        pointOverlay.setPosition([data.longitude,data.latitude]);
        map.addOverlay(pointOverlay);
        pointOverlay.setPositioning([data.longitude,data.latitude]);
        panzoomTo([data.longitude,data.latitude], data.mapLevel, 0.01);
        view.setCenter([data.longitude,data.latitude]);

        for(var key in data){
			if(key == "id") {
				$("#id").val(data[key]);
			}
			if(key == "name"){
				$("#" + key).html(data[key] + "<span onclick='show_operate_record(\""+ data[key] +"\")' style='font-weight:600;color:#FEAE1B;cursor:pointer;'> 操作日志 </span>");
			}else{
				$("#" + key).html(data[key]);
			}
        }

        $('.dw_icon').click();
    })
}

function show_operate_record(obj){
	$("#btn_groups_03").unbind("click");
	$('#btn_groups_03').hDialog({
		box:'#operate_record_HBox',
		width:'850',
		height:'650',
		beforeShow:function(){
			$("#operate_record_HBox").find("input[name='keyword']").val(obj);
			//$("#operate_record_HBox").find("input[name='keyword']").val("多车追尾");
			query_operate_record(10,"#operate_record_HBox");
		}
	});

	$("#btn_groups_03").click();
}

function query_warehouse_goods(pageSize,selector,direction){
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
		condition = $(selector).find("input[name=ckdd]").val();
		jQuery.ajax({
			type: "POST",
			url: ROOT + "/screen/equipmentList",
			dataType: "json",
			data: {"pageNo": pageNo, "pageSize": pageSize, "ckdd": condition},
			success: function (result) {
				$(".data_loading").hide();
				//插入分页信息
				insertPageInfo(result, selector);
				//插入列表记录
				insert_warehouse_goods(result, selector);
			},
			error: function (e) {}
		});
	}
}

function insert_warehouse_goods(result, selector){
	var html = "";
	for(var i = 0; i < result.rows.length; i++){
		html += '<tr>'+
			'<td>'+ (i + 1) +'</td>'+
			'<td>'+ result.rows[i].zgdw + '</td>'+
			'<td>'+ result.rows[i].ckdd + '</td>'+
			'<td>'+ result.rows[i].zbmc + '</td>'+
			'<td>'+ result.rows[i].ggxh + '</td>'+
			'<td>'+ result.rows[i].sl + '</td>'+
			'<td>'+ result.rows[i].dw + '</td>'+
			'</tr>';
	}
	html = html.replace(/undefined/g,"");
	$(selector).find("tbody").html(html);
}