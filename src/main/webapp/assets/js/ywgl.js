/**
 *
 * @param url
 * @param title
 * @param isLock
 * @param width
 * @param height
 * @param callback
 */
function newDialog(id, url, title, isLock, width, height, okCallback, closeCallBack, max) {
    if (dialog.list[id ? id : "dialog_id"]) {
        dialog.list[id ? id : "dialog_id"].show();
        return;
    }
    if (okCallback) {
        dialog({
            id: id ? id : "dialog_id",
            content: url,
            title: title ? title : "标题",
            lock: isLock,
            width: width ? width : 300,
            height: height ? height : 500,
            close: closeCallBack ? closeCallBack : null,
            ok: okCallback,
            min: false,
            max: max ? max : false,
            okVal: '确定'

        });
    } else {
        dialog({
            id: id ? id : "dialog_id",
            content: url,
            title: title ? title : "标题",
            lock: isLock,
            width: width ? width : 300,
            height: height ? height : 500,
            min: false,
            max: max ? max : false,
            close: closeCallBack ? closeCallBack : null

        });
    }

}

/**
 * grid中时间列format方法，适合时间为String形式传值
 * BY： Aaron.CN
 * data：数据
 * start：截取起始位置
 * end：截取结束位置 
 */
function format_date_grid(data, start, end)
{
	
	 if(undefined != data)
	 {
   	 var formatDate = data.substr(start,end);
   	 return formatDate;
	 } else
		 {
		 return "";
		 }
}

/**
 * 清除时间约束
 * BY： Aaron.CN
 * startId：开始时间控件
 * endId：结束时间控件
 */
function clearDate(startId, endId)
{
    var datetimepicker_s = $("#" + startId).data("kendoDateTimePicker");
    datetimepicker_s.max(new Date(9999, 0, 1));

    var datetimepicker_e = $("#" + endId).data("kendoDateTimePicker");
    datetimepicker_e.min(new Date(1000, 0, 1));

}

/**
 * 清除时间约束
 * BY： Aaron.CN
 * startId：开始时间控件
 * endId：结束时间控件
 */
function clearDateWithout(startId, endId)
{
    var datetimepicker_s = $("#" + startId).data("kendoDatePicker");
    datetimepicker_s.max(new Date(9999, 0, 1));

    var datetimepicker_e = $("#" + endId).data("kendoDatePicker");
    datetimepicker_e.min(new Date(1000, 0, 1));

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
//
function newIframeDialog(id, url, title, width, height) {
    //穿越iframe
    var api = frameElement.api, W = api.opener;
    W.dialog({
        id: id ? id : "dialog_id",
        content: 'url:' + url,
        title: title ? title : "标题",
        parent: api,
        padding: 0,
        width: width ? width : 500,
        height: height ? height : 300,
        min: false,
        max: false
    });
}
function showFlowChart(processInstanceId, width, height) {
    width = width || 800;
    height = height || 600;
    quick_dialog("FLOW_CHART", "流程图", "base/process/chart?processInstanceId=" + processInstanceId,width, height);
    //newDialog("FLOW_CHART", "url:base/process/chart?processInstanceId=" + processInstanceId, "流程图", true, 800, 600);
    //window.open(contextPath+"/base/process/chart?processInstanceId="+processInstanceId);
}

/**
 *
 * @param url 删除数据的URL地址
 * @param data
 * @param grid
 */
function singleDeleteByA(url, data,grid) {
    if (!confirm("确定删除吗？"))return;
    $.ajax({
        type: "post",
        cache: false,
        url: url ? url : "delete",
        data: data,
        success: function (response) {
            if (response.status == "error") {
                //$.message(response.message, $.message.TYPE_ERROR);
                //showErrorMsg(response.message);
                notify(response.message || "操作失败！","error");
            } else if (response.status == "success") {
                edited_callback(grid);
                if (response.data.next) {
                    if (response.data.next == ".") {//刷新datagrid
                        edited_callback(grid);
                    } else if (response.data.next == "x") {
                        edited_callback(grid);
                    } else {//刷新maincontent  例子：response.data.next：  相对路径
                        parent.loadFrame(response.data.next);
                    }
                }
                notify(response.data.message || "操作成功！","success");
                //$.message(response.data.message, $.message.TYPE_OK);
                // showSuccessMsg(response.data.message);

            }
        }, error: function (xhr, status, error) {
            var response = $.parseJSON(xhr.responseText);
            if (response.error) {
                response = response.error;
            }
            //$.message(response.message, $.message.TYPE_ERROR);
            ///showErrorMsg(response.message);
            notify(response.message || "操作失败！","error");
        }
    });
}

/**
 *
 * @param url 归档数据的URL地址
 * @param data
 * @param grid
 */
function singleEditByA(url, data,grid,content) {
    if (!confirm(content))return;
    $.ajax({
        type: "post",
        cache: false,
        url: url ? url : "edit",
        data: data,
        success: function (response) {
            if (response.status == "error") {
                //$.message(response.message, $.message.TYPE_ERROR);
                //showErrorMsg(response.message);
                notify(response.message || "操作失败！","error");
            } else if (response.status == "success") {
                notify(response.data.message || "操作成功！","success");
                if (response.data.next) {
                    if (response.data.next == ".") {//刷新datagrid
                        edited_callback(grid);
                    } else if (response.data.next == "x") {
                        if(grid!=null)
                        {
                            edited_callback(grid);
                        }
                        else
                        {
                            edited_callback(window.parent._main_frame.get_grid("#grid"));
                            close_dialog();//关闭dialog
                        }
                    } else {//刷新maincontent  例子：response.data.next：  相对路径
                        parent.loadFrame(response.data.next);
                    }
                }
                //$.message(response.data.message, $.message.TYPE_OK);
                // showSuccessMsg(response.data.message);

            }
        }, error: function (xhr, status, error) {
            var response = $.parseJSON(xhr.responseText);
            if (response.error) {
                response = response.error;
            }
            //$.message(response.message, $.message.TYPE_ERROR);
            ///showErrorMsg(response.message);
            notify(response.message || "操作失败！","error");
        }
    });
}

function singleDeleteByAjax(url,data,grid,urlAjax) {
    if (!confirm("确定删除吗？"))return;
    $.ajax({
        type: "post",
        cache: false,
        url: url ? url : "delete",
        data: data,
        success: function (response) {
            console.log(response.status);
            if (response.status == "error") {
                //$.message(response.message, $.message.TYPE_ERROR);
                //showErrorMsg(response.message);
                notify(response.message || "操作失败！","error");
            } else if (response.status == "success") {
                if (response.data.next) {
                    if (response.data.next == ".") {//刷新datagrid
                        edited_callback(grid);
                    }  else if (response.data.next == "k") {//刷新datagrid
                        edited_callback(grid);
                        //alert(urlAjax);
                        jQuery.ajax({
                            type: "post",
                            url: urlAjax
                        });
                    } else if (response.data.next == "x") {
                        edited_callback(grid);
                    } else {//刷新maincontent  例子：response.data.next：  相对路径
                        parent.loadFrame(response.data.next);
                    }
                }
                notify(response.data.message || "操作成功！","success");
                //$.message(response.data.message, $.message.TYPE_OK);
                // showSuccessMsg(response.data.message);

            }
        }, error: function (xhr, status, error) {
            var response = $.parseJSON(xhr.responseText);
            if (response.error) {
                response = response.error;
            }
            //$.message(response.message, $.message.TYPE_ERROR);
            ///showErrorMsg(response.message);
            notify(response.message || "操作失败！","error");
        }
    });
}
/**
 *
 * @param id datagrid的ID
 * @param url 删除数据的URL地址，默认为del
 */
function singleDelete(grid, url) {
    var row = grid.select();
    var data = grid.dataItem(row);
    if (!data) {
        notify("请选择要删除的项", "warn");
        return;
    } else {
        if (!confirm("确定删除吗？"))return;
            $.ajax({
                type: "post",
                cache: false,
                url: url ? url : "delete",
                data: "ids=" + data.id,
                success: function (response) {
                    if (response.status == "error") {
                        //$.message(response.message, $.message.TYPE_ERROR);
                        //showErrorMsg(response.message);
                        notify(response.message || "操作失败！","error");
                    } else if (response.status == "success") {
                        if (response.data.next) {
                            if (response.data.next == ".") {//刷新datagrid
                                edited_callback(grid);
                            } else if (response.data.next == "x") {
                                edited_callback(grid);
                            } else {//刷新maincontent  例子：response.data.next：  相对路径
                                parent.loadFrame(response.data.next);
                            }
                        }
                        notify(response.data.message || "操作成功！","success");
                            //$.message(response.data.message, $.message.TYPE_OK);
                           // showSuccessMsg(response.data.message);

                    }
                }, error: function (xhr, status, error) {
                    var response = $.parseJSON(xhr.responseText);
                    if (response.error) {
                        response = response.error;
                    }
                    //$.message(response.message, $.message.TYPE_ERROR);
                    ///showErrorMsg(response.message);
                    notify(response.message || "操作失败！","error");
                }
            });

    }
}

function formatMessage(message, status) {
    if (status == 'ok') {
        return '<div class="ui-message-content"><p class="ui-tiptext ui-tiptext-success"><i class="iconfont icon-ok-sign"></i>成功</p><p class="ui-message-text">' + message + '</p></div>';
    } else {
        return '<div class="ui-message-content"><p class="ui-tiptext ui-tiptext-error"><i class="iconfont icon-remove-sign"></i>失败</p><p class="ui-message-text">' + message + '</p></div><div class="ui-message-btn"><button class="btn" type="button">确定</button></div>';
    }
}
function showSuccessMsg(msg) {
    $.message(formatMessage(msg, 'ok'), $.message.TYPE_OK, 4, true, true);
}

function showErrorMsg(msg) {
    $.message(formatMessage(msg, 'error'), $.message.TYPE_ERROR, 4, false, true);
}

function validateCallbackAjax(response,dataGridId,dialogId,url)
{
    //var dataGrid;
    if (response.status == "success") {
        //$.message(response.data.message, $.message.TYPE_OK);
        //showSuccessMsg(response.data.message);
        notify(response.data.message || "操作成功！", "success");


        if (response.data.next) {
            if (response.data.next == ".") {//刷新datagrid
                edited_callback(window.parent._main_frame.get_grid("#" + dataGridId));

            } else if (response.data.next == "k") {//刷新datagrid
                edited_callback(window.parent._main_frame.get_grid("#" + dataGridId));
                jQuery.ajax({
                    type: "post",
                    url: url
                });
            } else if (response.data.next == "x") {//关闭dialog并刷新datagrid
                /*if (parent) {//dialog中有iframe
                 if (parent.$("#" + dataGridId)) {
                 parent.$("#" + dataGridId).flexReload();
                 }
                 } else if ($("#" + dataGridId)) {
                 $("#" + dataGridId).flexReload();
                 }*/
                edited_callback(window.parent._main_frame.get_grid("#" + dataGridId));
                close_dialog();//关闭dialog
            }else if (response.data.next == "j") {//关闭dialog并刷新datagrid
                /*if (parent) {//dialog中有iframe
                 if (parent.$("#" + dataGridId)) {
                 parent.$("#" + dataGridId).flexReload();
                 }
                 } else if ($("#" + dataGridId)) {
                 $("#" + dataGridId).flexReload();
                 }*/
                //alert(url);
                edited_callback(window.parent._main_frame.get_grid("#" + dataGridId));
                jQuery.ajax({
                    type: "post",
                    url: url
                });
                close_dialog();//关闭dialog

            }

            /*
             else if (response.data.next == "x") {//关闭dialog并刷新datagrid
             if (parent) {//dialog中有iframe
             dataGrid = parent.$(dataGrid);
             edited_callback(dataGrid);
             } else  {
             edited_callback(dataGrid);
             }
             close_dialog(dialogId);//关闭dialog
             }
             */
            else if (response.data.next == 'r') {

            } else if (response.data.next == 'c') {
                close_dialog(dialogId);//关闭dialog
            } else {//关闭dialog并刷新页面

                if (parent) {//dialog中有iframe
                    if (parent.$("#_main_frame")) {
                        parent.loadFrame(response.data.next);
                    }
                } else if ($("#_main_frame")) {
                    loadFrame(response.data.next);
                }
                if(dialogId) {
                    close_dialog(dialogId);//关闭dialog
                }
            }
        }
    }
}
function validateCallback(response, dataGridId,dialogId) {
    //var dataGrid;
    if (response.status == "success") {
        //$.message(response.data.message, $.message.TYPE_OK);
        //showSuccessMsg(response.data.message);
        notify(response.data.message || "操作成功！", "success");
        console.log(response.data.next);

        if (response.data.next) {
            if (response.data.next == ".") {//刷新datagrid
                edited_callback(window.parent._main_frame.get_grid("#" + dataGridId));

            } else if (response.data.next == "x") {//关闭dialog并刷新datagrid
                /*if (parent) {//dialog中有iframe
                 if (parent.$("#" + dataGridId)) {
                 parent.$("#" + dataGridId).flexReload();
                 }
                 } else if ($("#" + dataGridId)) {
                 $("#" + dataGridId).flexReload();
                 }*/
                edited_callback(window.parent._main_frame.get_grid("#" + dataGridId));
                close_dialog();//关闭dialog
            }
            else if (response.data.next == 'r') {

            } else if (response.data.next == 'c') {
                close_dialog(dialogId);//关闭dialog
            } else {//关闭dialog并刷新页面

                if (parent) {//dialog中有iframe
                    if (parent.$("#_main_frame")) {
                        parent.loadFrame(response.data.next);
                    }
                } else if ($("#_main_frame")) {
                    loadFrame(response.data.next);
                }
                if(dialogId) {
                    close_dialog(dialogId);//关闭dialog
                }
            }
        }
    }
}

// 添加修改后刷新list数据
function edited_callback(grid) {
    if(grid!=null&&grid!=undefined)
    {
        if(grid.dataSource){
            grid.dataSource.read();
        }else{
            grid.data("kendoGrid").dataSource.read();
        }
    }
}

function closeDialog() {
    destroyFileUpload("dialog");
    if (frameElement) {
        try {
            var api = frameElement.api, W = api.opener;
            W.dialog.focus.close();
        } catch (err) {
        }
    } else {
        dialog.focus && dialog.focus.close();
    }
}

function choosePerson(txtId, txtName, type, dialogId, deptId, deptName) {
    if (deptId == null)deptId = "";
    if (deptName == null)deptName = "";
    quick_dialog(
		"selectDiloag", 
        "选择人员",
        "choose/person/page/" + (type ? type : 1) + "/" + txtId + "/" + txtName + "?deptId=" + deptId + "&deptName=" + deptName + "&dialogId=" + dialogId,
        950,
        450 
        //inputChooseClear()
    );
    /*
    dialog({
        id: "choose_person",
        title: '人员选择',
        content: "load:choose/person/page/" + (type ? type : 1) + "/" + txtId + "/" + txtName + "?deptId=" + deptId + "&deptName=" + deptName,
        lock: true,
        min: false,
        max: false,
        close: function () {
            inputChooseClear()
        },
        width: 950,
        height: 450
    });
    */

}
//选择委外合同
function chooseContract(txtId, txtName, contractStatus) {
    dialog({
        id: "choose_person",
        title: '委外合同选择',
        content: "load:choose/contract/" + txtId + "/" + txtName + "?contractStatus=" + contractStatus,
        lock: true,
        min: false,
        max: false,
        close: function () {
            inputChooseClear()
        },
        width: 950,
        height: 450
    });

}
//选部门
function chooseDept(txtId, txtName, type, dialogId) {
	quick_dialog(
        "choose_dept",
        "选择部门",
        "choose/dept?txtId=" + txtId + "&txtName=" + txtName + "&type=" + type +"&dialogId=" + dialogId,
        350,
        650 
    );
    /*
    dialog({
        id: "choose_dept",
        title: '选择部门',
        content: "load:choose/dept?txtId=" + txtId + "&txtName=" + txtName + "&type=" + type,
        min: false,
        max: false,
        lock: true,
        width: 350,
        height: 650
    });
    */
}
//选设备
function chooseDevice(txtId, txtName, type, status, dialogId,id) {
    if (status == null) {
        status = "";
    }
    quick_dialog(
        "choose_device",
        "选择设备",
        "choose/device?txtId=" + txtId + "&txtName=" + txtName + "&type=" + type + "&status=" + status + "&dialogId=" + dialogId + "&id=" +id,
        820,
        495 
    );
    /*
    dialog({
        id: "choose_device",
        title: '选择设备',
        content: "load:choose/device?txtId=" + txtId + "&txtName=" + txtName + "&type=" + type + "&status=" + status,
        min: false,
        max: false,
        lock: true,
        width: 820,
        height: 495
    });
    */
}
//选择电表
function chooseElectricWatch(txtId, txtName, deviceCategory, type, dialogId) {
    if (status == null) {
        status = "";
    }
    if (deviceCategory == null){
        deviceCategory = "";
    }
    quick_dialog(
        "choose_device",
        "选择设备",
        "choose/device?txtId=" + txtId + "&txtName=" + txtName + "&type=" + type + "&status=0&categoryId=" + deviceCategory + "&dialogId" + dialogId,
        820,
        495 
    );
    /*
    dialog({
        id: "choose_device",
        title: '选择设备',
        content: "load:choose/device?txtId=" + txtId + "&txtName=" + txtName + "&type=" + type + "&status=0&categoryId=" + deviceCategory,
        min: false,
        max: false,
        lock: true,
        width: 820,
        height: 495
    });
    */
}
//根据特种设备状态查询设备
function chooseDeviceBySpecStatus(txtId, txtName, type, specStatus, dialogId) {
	quick_dialog(
        "choose_deviceCategory",
        "选择设备",
        "choose/device?txtId=" + txtId + "&txtName=" + txtName + "&type=" + type + "&status=0&specStatus=" + specStatus + "&dialogId=" +dialogId,
        820,
        495 
    );
    /*
    dialog({
        id: "choose_device",
        title: '选择设备',
        content: "load:choose/device?txtId=" + txtId + "&txtName=" + txtName + "&type=" + type + "&status=0&specStatus=" + specStatus,
        min: false,
        max: false,
        lock: true,
        width: 820,
        height: 495
    });
    */
}
//选区域
function chooseGeoarea(txtId, txtName) {
	quick_dialog(
		"select_item_dlg", 
        "选择安装位置",
        "/ywgl/choose/geoarea?txtId=" + txtId + "&txtName=" + txtName,
        300,
        500 
        //inputChooseClear()
    );
}

function chooseArea(txtId, txtName) {
    //alert(1);
    quick_dialog(
        "select_item_dlg",
        "选择区域",
        "tree/getTreeNodes?dictionaryCode=" + txtId + "&cateId=" + txtName,
        300,
        500
        //inputChooseClear()
    );
}

//选设备类别
function chooseDeviceCategory(txtId, txtName, dialogId, type) {
    if (type == 2) {
    	quick_dialog(
        		"choose_deviceCategory",
                "选择设备类别",
                "choose/deviceCategory?txtId=" + txtId + "&txtName=" + txtName + "&dialogId="+dialogId + "&type=" + type,
                300,
                600 
             
            );

    } else {
    	if(type == null)
    		type = "";
    	quick_dialog(
            "choose_deviceCategory",
            '选择设备类别',
            "/ywgl/choose/deviceCategory?txtId=" + txtId + "&txtName=" + txtName + "&dialogId=" + dialogId + "&type=" + type,
            300,
            600 
            //inputChooseClear()
          
        );
    }
}
function chooseSupplier(txtId, txtName,dialogId) {
	quick_dialog(
        		"selectDiloag",
                "选择厂商",
                "base/supplier/lookup/" + txtId + "/" + txtName + "?flag=0&dialogId=" + dialogId,
                950,
                400 
             
            );
    /*
    dialog({
        id: 'chooseSupplier',
        title: '厂商选择',
        content: "load:base/supplier/lookup/" + txtId + "/" + txtName,
        width: 950,
        height: 400,
        min: false,
        max: false,
        lock: false,
        close: function () {
            inputChooseClear()
        }/*,
         /*ok : function(){
         return okClick()
         //return this.content.okClick()
         },
         okVal :'确定'*/
    //});
    //*/
}
/*判断选择输入框是否能清空*/
function inputChooseClear() {
    $(".ui-input-choose").each(function () {
        var emptyFunc = $(this).attr("emptyFunc");
        if (emptyFunc) {
            emptyFunc = eval(emptyFunc);
            var clearId = $(this).attr('clearId');
            if (!clearId) {
                clearId = new Date().getTime();
                var _clear = $("<a id='" + clearId + "' class='ui-input-remove' href='javascript:void(0);' title='清空'>×</a>");
                $(this).after(_clear);
                _clear.click(function () {
                    emptyFunc();
                    $(this).hide();
                });
                $(this).attr('clearId', clearId);
            }

            if ($(this).attr("value") != "") {
                $('#' + clearId).show();
            } else {
                $('#' + clearId).hide();
            }
        }
    });

}
function formatMoney(num) {
    try {
        num = $.trim(num);
        if (num == '') {
            return '';
        }
        num = num * 1;
        return num.toFixed(2);
    } catch (ex) {
    }
    return '0.00';
}
function formatNumber2(num) {
    try {
        num = $.trim(num);
        if (num == '') {
            return '';
        }
        num = num * 1;
        return num.toFixed(2);
    } catch (ex) {
    }
    return '0.00';
}
function subtract(num1, num2) {
    try {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        return num1 - num2;
    } catch (err) {
    }

}

function greaterThanOrEqual(num1, num2) {
    if (subtract(num1, num2) >= 0) {
        return true;
    }
    return false;
}
function lessThan(num1, num2) {
    if (subtract(num1, num2) < 0) {
        return true;
    }
    return false;
}

$(document).ready(function () {
    $.ajaxSetup({
        // Disable caching of AJAX responses
        cache: false
    });
    $('.money').each(function (i, v) {
        $(v).change(function () {
            var value = $.trim($(this).val());
            $(this).val(formatMoney(value));
        });
        var value2 = $.trim($(v).val());
        $(v).val(formatMoney(value2));
    });
    $('.number2').each(function (i, v) {
        $(v).change(function () {
            var value = $.trim($(this).val());
            $(this).val(formatNumber2(value));
        });
        var value2 = $.trim($(v).val());
        $(v).val(formatNumber2(value2));
    });
    /*$(".money,.number2").keydown(function(event) {
     var keyCode = event.which;
     if (keyCode == 46 || (keyCode >= 48 && keyCode <=57))
     return true;
     else
     return false;
     }).focus(function() {
     this.style.imeMode='disabled';
     });*/

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
});
//----------
function setMainContentH() {
    var rootEl = document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
    var rootHd = parseInt(rootEl.clientHeight);
    $(".mainContent").height(rootHd - 117);
    $(window).resize(function () {
        var rootEl = document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
        var rootHd = parseInt(rootEl.clientHeight);
        $(".mainContent").height(rootHd - 117);
    });
}
function setDivHeight(id,mdValue) {
    var rootEl = document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
    var rootHd = parseInt(rootEl.clientHeight);
    $("#"+id).height(rootHd - mdValue);
    $(window).resize(function () {
        var rootEl = document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
        var rootHd = parseInt(rootEl.clientHeight);
        $("#"+id).height(rootHd - mdValue);
    });
}
//从login2登录系统
function setMainContentH_login2() {
    var rootEl = document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
    var rootHd = parseInt(rootEl.clientHeight);
    $(".mainContent").height(rootHd - 117+32-72);
    $(window).resize(function () {
        var rootEl = document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
        var rootHd = parseInt(rootEl.clientHeight);
        $(".mainContent").height(rootHd - 117+32-72);
    });
}
function setHospitalHomeH_login2() {
    var rootEl = document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
    var rootHd = parseInt(rootEl.clientHeight);
    $(".hospitalHome").height(rootHd - 117+32);
    $(window).resize(function () {
        var rootEl = document.compatMode == "CSS1Compat" ? document.documentElement : document.body;
        var rootHd = parseInt(rootEl.clientHeight);
        $(".hospitalHome").height(rootHd - 117+32);
    });
}
function createXmlhttp(func,func2) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        //code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 ){
        	if(xmlhttp.status==200){
        		var data = xmlhttp.responseText;
        		if(data!=null && data!=""){
        			data = eval("("+data+")");
        		}
        		func(data);
            }else{
            	
            }
        	if(func2!=null){func2();}
        }
    }
    return xmlhttp;
}
function sendXmlhttp(_xmlhttp,method,url,dataIn) {
	if(method.toUpperCase()=="GET"){
		_xmlhttp.open("GET",url,true);
		_xmlhttp.send();
	}else if(method.toUpperCase()=="POST"){
		_xmlhttp.open("POST",url,true);
		_xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		_xmlhttp.send(dataIn);
	}
}

//写点位
function writeBlock(hpids, bits, val, projectName) {
    var dataIn = {"hpids": hpids, "bits": bits, "val": val};
    $.ajax({
        'url': projectName + "/gis/writeBit?r=" + Math.random(),
        'data': dataIn,
        'traditional': true,
        'dataType': 'json',
        'type': 'get',
        'error': function (data) {
        },
        'success': function (data) {
        }
    });
}
function getMiddleCode(hpid) {
    var hpids = hpid.split("_");
    if (hpids != null && hpids.length > 3) {
        return hpids[2] + "_" + hpids[3];
    } else {
        alert("无效的设备编码");
        return "";
    }
}
//判断一个数组是否包含某个对象
function isInArray(strs, str) {
    var bol = false;
    if (strs != null && strs.length > 0) {
        for (var i = 0; i < strs.length; i++) {
            if (strs[i] == str) {
                bol = true;
                return bol;
            }
        }
    }
    return bol;
}
//显示当前时间
function ShowCurrentTime(){    
	var date = new Date();
	var hour = date.getHours();		
	var min = date.getMinutes();		
	if(hour<10)hour="0"+hour;
		if(min<10)min="0"+min;
	$("#spnCurrentTime").text(hour+":"+min)
    setTimeout("ShowCurrentTime()",1000);
}
function loadMain(url) {
    $.ajaxSetup({
        cache: false
    });
    destroyFileUpload();
    if (url == null || url == "") {
        $('.mainContent').empty();
    } else {
        $('.mainContent').load(url);
    }
}

function destroyFileUpload(type) {
    try {
        var parent = type == "dialog" ? "div#" + dialog.focusId + " " : "";
        if ($(parent + "div.uploadify").length > 0) {
            $(parent + "div.uploadify").uploadify('destroy');
        }
    } catch (e) {
    }
}
function setAllReadonly(type) {
	$(document).ready(function(){
	    var parent = type == "dialog" ? ".ui_dialog " : "";
	    $(parent + '[type=button]').hide();
	    $(parent + '.cancel[type=button]').show();//查看页面的取消按钮
	    $(parent + '[type=submit]').hide();
	    if ($(parent + '.ui-box-close a').length == 0) {
	        $(parent + '.ui-box-close').hide();
	    }
	    $(parent + ':input').attr('readonly', true);
	    $(parent + '[type=radio]').attr('disabled', true);
	    $(parent + '[type=checkbox]').attr('disabled', true);
	    $(parent + 'select').attr('disabled', true);
	    $(parent + "input[type=text]").unbind("click").removeAttr("onclick");
    })
}
//--------
function isExist(list, obj) {
    if (list == null || list == "" || list.length < 1 || obj == null || obj == "") {
        return false;
    }
    for (var i = 0; i < list.length; i++) {
        if (list[i] == obj) {
            return true;
        }
    }
    return false;
}
function stringToArray(idstr) {
    if (idstr == null || idstr == "")return new Array();
    var ids = idstr.split(",");
    return ids;
}

/*动态校验*/
function dynamicValid(formId) {
    var methods = {
        not_empty: function (field, value) {
            return value !== null && $.trim(value).length > 0;
        },
        min_length: function (field, value, min_len, all_rules) {
            var regex1 = /[\u4E00-\u9FA5\uf900-\ufa2d]/ig;//中文字符
            var regex2 = /[^\u4E00-\u9FA5\uf900-\ufa2d]/g;//非中文字符
            var temp1 = value.replace(regex2, '');//纯中文字符串
            var temp2 = value.replace(regex1, '');//纯非中文文字符串

            var length = 2 * temp1.length + temp2.length, result = (length >= min_len);

            if (!all_rules['not_empty']) {
                result = result || length === 0;
            }
            return result;
        },
        max_length: function (field, value, max_len) {
            var regex1 = /[\u4E00-\u9FA5\uf900-\ufa2d]/ig;//中文字符
            var regex2 = /[^\u4E00-\u9FA5\uf900-\ufa2d]/g;//非中文字符
            var temp1 = value.replace(regex2, '');//纯中文字符串
            var temp2 = value.replace(regex1, '');//纯非中文文字符串
            return 2 * temp1.length + temp2.length <= max_len;
        },
        plusNumeric: function (field, value) {

            var regex = /^([\+]?[0-9]+(\.[0-9]+)?)?$/;
            return regex.test(value);
        }
    };
    var messages = {
        not_empty: '必填字段。',
        min_length: '请至少输入 :value 字符。',
        max_length: '请最多输入 :value 字符。',
        regex: '',
        email: '请填写正确的 email 地址。',
        url: '请填写正确的 url。',
        exact_length: '请输入 :value 字符。',
        equals: '请输入指定字符串。',
        ip: '请输入正确的 IP 地址。',
        credit_card: '请填写正确的卡号。',
        alpha: '必须输入字母。',
        alpha_numeric: '必须输入字母或数字。',
        alpha_dash: '必须输入字母、数字、下划线或连字符。',
        digit: '请输入数字。',
        numeric: '请输入十进制数字。',
        plusNumeric: '请输入正数',
        matches: '必须与前一个值相同。',
        money: '请输入金额',
        bigger: '必须比前一个值大',
        smaller: '必须比后一个值小',
        chinese: '请输入中文'
    };
    var allowed_rules = [];
    $.each(methods,
        function (k, v) {
            allowed_rules.push(k);
        });

    function format(field_name, rule, params) {
        var message;
        if (typeof messages[field_name] !== 'undefined' && typeof messages[field_name][rule] !== 'undefined') {
            message = messages[field_name][rule];
        } else {
            message = messages[rule];
        }

        if ($.type(params) !== 'undefined' && params !== null) {
            if ($.type(params) === 'boolean' || $.type(params) === 'string' || $.type(params) === 'number') {
                params = {
                    value: params
                };
            }
            $.each(params,
                function (k, v) {
                    message = message.replace(new RegExp(':' + k, 'ig'), v);
                });
        }
        return message;
    }


    var errors = {};
    $('#' + formId + ' :input[name][valid]').each(function () {
        var field = {
            name: $(this).attr('name'),
            value: $.trim($(this).val())
        };
        var validAttr = $(this).attr('valid');
        var rules = eval(validAttr);//['plusNumeric',{max_length: 20}]
        normalized_rules = {};
        $.each(rules,
            function (rule_idx, rule_value) {
                if ($.type(rule_value) === 'string') {
                    if ($.inArray(rule_value, allowed_rules) !== -1) {
                        normalized_rules[rule_value] = null;
                    }
                } else {
                    $.each(rule_value,
                        function (k, v) {
                            if ($.inArray(k, allowed_rules) !== -1) {
                                normalized_rules[k] = v;
                                return false;
                            }
                        });
                }
            });

        //console.dir(normalized_rules)
        $.each(normalized_rules,
            function (fn_name, fn_args) {
                if (methods[fn_name].call(self, field, field.value, fn_args, normalized_rules) !== true) {
                    errors[field.name] = format.call(self, field.name, fn_name, fn_args);
                }
            });

    });
    return errors;
}
/* 
将数值四舍五入后格式化. 
@param num 数值(Number或者string) 
@param cent 要保留的小数位(Number) 
@param isThousand 是否需要千分位 0:不需要,1:需要(数值类型); 
@return 格式的字符串,如'1,234,567.45' 
@type String 
*/ 
function formatNumber(num, cent, isThousand) {	
	num = num.toString().replace(/\$|\,/g, '');
	if (isNaN(num))//检查传入数值为数值类型. 
		num = "0";
	if (isNaN(cent))//确保传入小数位为数值型数值. 
		cent = 0;
	cent = parseInt(cent);
	cent = Math.abs(cent);//求出小数位数,确保为正整数. 
	if (isNaN(isThousand))//确保传入是否需要千分位为数值类型. 
		isThousand = 0;
	isThousand = parseInt(isThousand);
	if (isThousand < 0)
		isThousand = 0;
	if (isThousand >= 1) //确保传入的数值只为0或1 
		isThousand = 1;
	sign = (num == (num = Math.abs(num)));//获取符号(正/负数) 
	//Math.floor:返回小于等于其数值参数的最大整数 
	num = Math.floor(num * Math.pow(10, cent) + 0.50000000001);//把指定的小数位先转换成整数.多余的小数位四舍五入. 
	cents = num % Math.pow(10, cent); //求出小数位数值. 
	num = Math.floor(num / Math.pow(10, cent)).toString();//求出整数位数值. 
	cents = cents.toString();//把小数位转换成字符串,以便求小数位长度. 
	while (cents.length < cent) {//补足小数位到指定的位数. 
		cents = "0" + cents;
	}
	if (isThousand == 0) //不需要千分位符. 
		return (((sign) ? '' : '-') + num +((cent==0)?'': ('.' + cents)));
	//对整数部分进行千分位格式化. 
	for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
		num = num.substring(0, num.length - (4 * i + 3)) + ','
				+ num.substring(num.length - (4 * i + 3));
	return (((sign) ? '' : '-') + num+((cent==0)?'': ('.' + cents)));
}
//千分位以","隔开，并四舍五入保留2为小数
function fNum2(num) {
	return formatNumber(num, 2, 1);
}
//千分位以","隔开，并四舍五入取整
function fInt(num) {
	return formatNumber(num, 0, 1);
}
//获取iframe的window对象
function getIframeWin(iframeId,win){
    if(!win){
      win=window;
    }
	return win.document.getElementById(iframeId).contentWindow;
}
//设置选择框焦点
function resetfocus(obj){
	$(obj).focus();
    $(obj).blur();
}

function setSelectEnabled(selectId){
    var comboBox = $("#"+selectId).data("kendoComboBox");
    comboBox.enable(false);
}
function setSelectValue(selectId,val){
    var comboBox = $("#"+selectId).data("kendoComboBox");
    if(val!="" && val!=0){
        comboBox.value(val);
    }
}

String.prototype.startWith = function(str){
    var reg = new RegExp("^"+str);
    return reg.test(this);
}

function load_index_page(url){
	url = url || "/ticc_linan_web/";
    parent.location.href = url;
}
/**
 * 只能输入数字
 * @param e
 */
function isNum(e){
   var v = $(e).val();
    if(!v)return;
   if(!v.match(/^[0-9]*\.?[0-9]$/)){
       alert("请输入数字");
       return false;
   }
}

//显示灰色 jQuery 遮罩层
function showBg() {
    // var bh = $("body").height();
    // var bw = $("body").width();
    var bh = window.innerHeight;
    var bw = window.innerWidth;
    $("#fullbg").css({"height":bh,"width":bw,display:"block"
    });
    $("#dialog").show();
}
//关闭灰色 jQuery 遮罩
function closeBg() {
    alert(22222);
    $("#fullbg").hide();
    $("#dialog").hide();
}

/**
 *
 * @param url 删除数据的URL地址
 * @param data
 * @param grid
 */
function excelByA(url) {
    //showBg();
    $.ajax({
        type: "post",
        cache: false,
        url: url ? url : "export",
        success: function (response) {
            alert(response.status);
            if (response.status == "error") {
                //$.message(response.message, $.message.TYPE_ERROR);
                //showErrorMsg(response.message);
                notify(response.message || "操作失败！","error");
            } else if (response.status == "success") {
                if (response.data.next) {
                    if (response.data.next == ".") {//刷新datagrid
                        edited_callback(grid);
                    } else if (response.data.next == "x") {
                        edited_callback(grid);
                    } else {//刷新maincontent  例子：response.data.next：  相对路径
                        parent.loadFrame(response.data.next);
                    }
                }
                notify(response.data.message || "操作成功！","success");
                //$.message(response.data.message, $.message.TYPE_OK);
                // showSuccessMsg(response.data.message);

            }
        }, error: function (xhr, status, error) {
            var response = $.parseJSON(xhr.responseText);
            if (response.error) {
                response = response.error;
            }
            //$.message(response.message, $.message.TYPE_ERROR);
            ///showErrorMsg(response.message);
            notify(response.message || "操作失败！","error");
        }
    });
}
