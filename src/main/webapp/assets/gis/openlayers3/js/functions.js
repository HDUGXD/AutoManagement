//********** INIT-MAP START ********** //

//全局变量
var map; //地图
var view; //视图
var clickListener; //点击监听器
var selectPointerMove_Highlight; //鼠标选择效果
//区域样式
var areaStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: [255, 255, 255, 0.2]
    }),
    stroke: new ol.style.Stroke({
        color: [255, 204, 0, 1],
        width: 2
    })
});

//点位数据图层,默认为空
var dataLayerSource = new ol.source.TileArcGISRest({
    url: gisUrl + '/arcgis/rest/services/la/la/MapServer',
    cacheSize: 0,
    tileLoadFunction:function(imageTile, src) {
        var date = new Date();
        var time = date.getTime();
        imageTile.getImage().src = src+'&time='+time;
    },
    params: {
        layers: ""
    }
});
var dataLayer = new ol.layer.Tile({
    source: dataLayerSource
});
//热力图层
var heatSource = new ol.source.Vector();
var heatLayer = new ol.layer.Heatmap({
    source: heatSource,
    blur: 15,//parseInt(blur.value, 10),
    radius: 5//parseInt(radius.value, 10)
});
//聚合图层
var clusterSource = new ol.source.Cluster({
    distance: 100,
    source: new ol.source.Vector({
        url: "",
        format: new ol.format.EsriJSON({})
    })
});
var clusterLayer = new ol.layer.Vector({
    source: clusterSource,
    style: styleFunction
});
//区域矢量图层
var vectorSource = new ol.source.Vector({wrapX: false});
var vectorLayer = new ol.layer.Vector({
    name: 'my_vectorlayer',
    source: vectorSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
});
//区域点位矢量图层
var vectorPointSource = new ol.source.Vector({wrapX: false});
var vectorPointLayer = new ol.layer.Vector({
    source: vectorPointSource,
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ff0000'
            })
        })
    })
});
//静态点位矢量图层
var ajaxSource = new ol.source.Vector({wrapX: false});
var ajaxLayer = new ol.layer.Vector({
    source: ajaxSource,
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ff0000'
            })
        })
    })
});
//搜索点位
var searchSource = new ol.source.Vector({wrapX: false});
var searchLayer = new ol.layer.Vector({
    source: searchSource,
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ff0000'
            })
        })
    })
});
//用于画图-冒泡的矢量图层
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');


var info = $('#info');
info.tooltip({
    animation: false,
    trigger: 'manual'
});



/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 618
    }
}));
//路况更新定时器
var update_road_condition_interval;
//---------------- 底图相关 START -------------------//
//配置图层解析度信息-green
//var resolutions_green = [
//    0.09517844023321122,
//    0.023794610058302804,
//    0.011897305029151402,
//    0.005948652514575701,
//    0.0029743262572878505,
//    0.00237946100583028,
//    0.00118973050291514,
//    4.7589220116605604E-4,
//    2.3794610058302802E-4,
//    1.1897305029151401E-4,
//    5.9486525145757005E-5,
//    2.3794610058302804E-5
//];
var resolutions_green = [
    0.15228550437313793,
    0.07614275218656896,
    0.03807137609328448,
    0.01903568804664224,
    0.00951784402332112,
    0.00475892201166056,
    0.00237946100583028,
    0.00118973050291514,
    5.9486525145757E-4,
    2.97432625728785E-4,
    1.5228550437313792E-4,
    7.614275218656896E-5,
    3.807137609328448E-5,
    1.903568804664224E-5
];
//配置url模板-green
//var greenUrl = gisUrl + '/arcgis/rest/services/la/laMap_green_new/MapServer/tile/{z}/{y}/{x}';
var greenUrl = gisUrl + '/arcgis/rest/services/la/laMap_green/MapServer/tile/{z}/{y}/{x}';
//配置matrixIds-green
var matrixIds_green = new Array(resolutions_green.length);
for (var z = 0; z < resolutions_green.length; ++z) {
    matrixIds_green[ z ] = z;
}
//定义底图图层-green
var greenTileLayer = new ol.layer.Tile({
    title: 'green',
    type: 'base',
    visible: true,
    source: new ol.source.XYZ({
        projection: ol.proj.get('EPSG:4326'),
        tileSize: [256, 256],
        tileUrlFunction: function (tileCoord) {
            return greenUrl.replace('{z}', (tileCoord[0] ).toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2] - 1 ).toString());
        },
        tileGrid: new ol.tilegrid.TileGrid({
            //extent: [119.43869610614337, 29.771541243424707, 120.97575733633738, 30.54832084544583],
            origin: [ -400, 400],
            resolutions: resolutions_green,
            matrixIds: matrixIds_green
        }),
        wrapX: true
    })
});

var resolutions_white = [
    0.15228550437313793,
    0.07614275218656896,
    0.03807137609328448,
    0.01903568804664224,
    0.00951784402332112,
    0.00475892201166056,
    0.00237946100583028,
    0.00118973050291514,
    5.9486525145757E-4,
    2.97432625728785E-4,
    1.5228550437313792E-4,
    7.614275218656896E-5,
    3.807137609328448E-5,
    1.903568804664224E-5
];
//配置url模板-white
var whiteUrl = gisUrl + '/arcgis/rest/services/la/laMap_white/MapServer/tile/{z}/{y}/{x}';
//配置matrixIds-white
var matrixIds_white = new Array(resolutions_white.length);
for (var z = 0; z < resolutions_white.length; ++z) {
    matrixIds_white[ z ] = z;
}
//定义底图图层-white
var whiteTileLayer = new ol.layer.Tile({
    title: 'white',
    type: 'base',
    visible: false,
    source: new ol.source.XYZ({
        projection: ol.proj.get('EPSG:4326'),
        tileSize: [256, 256],
        tileUrlFunction: function (tileCoord) {
            return whiteUrl.replace('{z}', (tileCoord[0] ).toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2] - 1 ).toString());
        },
        tileGrid: new ol.tilegrid.TileGrid({
            //extent: [119.43869610614337, 29.771541243424707, 120.97575733633738, 30.54832084544583],
            origin: [ -400, 400],
            resolutions: resolutions_white,
            matrixIds: matrixIds_white
        }),
        wrapX: true
    })
});

//---------------- 底图相关  -------------------//


//判断地图是否加载完成后回调
var loading_count;
var loaded_count;
var loadingTimer;
function checkSourceLoaded() {
    if (loading_count == loaded_count) {
        try {
            loadingEndCallback();
        } catch (e) {
            clearInterval(loadingTimer);
        }
        clearInterval(loadingTimer);
    }
}
//通过图层ID查图层名称
var layerNameById = {};
//通过图层名称查图层ID
var layerIdByName = {};
//初始化地图
function initMap() {
    //定义视图
    view = new ol.View({
        projection: 'EPSG:4326',
        center: [119.46, 30.23],
        maxResolution:0.15228550437313793,
        //minResolution:1.903568804664224E-5/2,
        zoom: 8
    });
    //用于地图加载完后的回调
    loading_count = 0;
    loaded_count = 0;
    var source = greenTileLayer.getSource();
    source.on("tileloadstart", function () {
        loading_count++;
    });
    source.on("tileloadend", function () {
        loaded_count++;
    });
    source.on("tileloaderror", function () {
        loaded_count++;
    });
    loadingTimer = setInterval("checkSourceLoaded()", 1000);



    //定义地图
    map = new ol.Map({
        renderer: 'dom',
        layers: [
            greenTileLayer,
            //whiteTileLayer,
            baidugreen,
            baidusate,
            baidusate1,
            baidusate2,
            baiduwhite,
            dataLayer,
            heatLayer,
            clusterLayer,
            vectorLayer,
            ajaxLayer,
            searchLayer,
            vectorPointLayer
        ],
        renderer: 'dom',
        interactions: ol.interaction.defaults({doubleClickZoom: true}),
        // 下面这个参数:通过在动画过程中同时加载瓦片来提升用户效果
        // 但会造成在移动设备或其他比较慢的设备上效果卡顿
        loadTilesWhileAnimating: true,
        overlays: [overlay],
        target: 'map',
        controls: ol.control.defaults({
            attribution: false,
            rotate: false,
            zoom: false,
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                collapsible: false
            })
        }),
        view: view
    });

    //注册点击事件
    clickListener = map.on("click", clickQuery);
//
    map.on('pointermove', function(evt) {
        if (evt.dragging) {
            info.tooltip('hide');
            return;
        }
        displayFeatureInfo(map.getEventPixel(evt.originalEvent));
    });

    //矢量图层的鼠标选中效果
    selectPointerMove_Highlight = new ol.interaction.Select({
        condition: ol.events.condition.pointerMove
    });
    map.addInteraction(selectPointerMove_Highlight);
    selectPointerMove_Highlight.on('select', function(e) {

        var flength = e.target.getFeatures().getLength();
        for(var i=0; i<flength;i++) {

            if(e.selected.length > 0 && e.target.getFeatures().a[i].get("type") != undefined && e.target.getFeatures().a[i].get("type").indexOf("area") < 0) {
                $('body').css('cursor','pointer');
            } else {
                $('body').css('cursor','default');
            }
        }
        if(flength == 0) {
            $('body').css('cursor','default');
        }
    });

    //查询所有图层的ID和NAME对应关系
    $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer?f=pjson', {
            type: 'POST',
            dataType: "json",
            async:false,
        }
    ).done(function (resp) {
        var layers = resp.layers;
        for (var i = 0; i < layers.length; i++) {
            if(layerIdByName[layers[i].name] != null && layerIdByName[layers[i].name] != "") {
                layerIdByName[layers[i].name] = layerIdByName[layers[i].name] + ',' + layers[i].id;
            } else {
                layerIdByName[layers[i].name] = layers[i].id+"";
            }
            layerNameById[layers[i].id+""] = layers[i].name;
        }
    }).fail(function () {

    });
}

var selectfeature;
var displayFeatureInfo = function(pixel) {
    info.css({
        left: pixel[0] + 'px',
        top: (pixel[1] - 15) + 'px'
    });
    var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
    });
    if (feature && (feature.H.layerName == "camera" || feature.H.layerName == "camera_hh" || feature.H.layerName == "camera_boat")) {

        if(feature == selectfeature){
            info.tooltip('show');
        }else{
            selectfeature = feature;
            info.attr('data-original-title', selectfeature.H.feature.attributes.NAME).tooltip('fixTitle').tooltip('show');
        }
    } else {
        info.tooltip('hide');
        selectfeature = null;
    }
};

//地图切换
function changeMap(flag) {
    if(flag == 1) {
        greenTileLayer.setVisible(true);
        baidugreen.setVisible(false);
        baidusate.setVisible(false);
        baidusate1.setVisible(false);
        //baidusate2.setVisible(false);
        baiduwhite.setVisible(false);
    } else if(flag == 2) {
        greenTileLayer.setVisible(false);
        baidugreen.setVisible(true);
        baidusate.setVisible(false);
        baidusate1.setVisible(false);
        //baidusate2.setVisible(false);
        baiduwhite.setVisible(false);
    } else if(flag == 3) {
        greenTileLayer.setVisible(false);
        baidugreen.setVisible(false);
        baidusate.setVisible(true);
        baidusate1.setVisible(true);
        //baidusate2.setVisible(true);
        baiduwhite.setVisible(false);
    }else if(flag == 4){            //白色地图，用于后台
        greenTileLayer.setVisible(false);
        baidugreen.setVisible(false);
        baidusate.setVisible(false);
        baidusate1.setVisible(false);
        //baidusate2.setVisible(false);
        baiduwhite.setVisible(true);
    }

}
//点击查询冒泡方法-带分圈层控制功能
function clickQuery(evt) {
    //动态图层点击事件监听
    var pixel = evt.pixel;
    var screenRightDown = [pixel[0] - 10, pixel[1] + 10];//右下角
    var screenLeftUp = [pixel[0] + 10, pixel[1] - 10];//左上角
    var rightDownPoint = map.getCoordinateFromPixel(screenRightDown);
    var leftUpPoint = map.getCoordinateFromPixel(screenLeftUp);
    var pointExtent = '{"xmin":' + rightDownPoint[0] + ',"ymin":' + rightDownPoint[1] + ',"xmax":' + leftUpPoint[0] + ',"ymax": ' + leftUpPoint[1] + ',"spatialReference":{"wkid":4326}}';
    var nowExtent = map.getView().calculateExtent(map.getSize());
    var size = map.getSize().slice(0);
    size.push(96);
    var display = size.join(",");
    //获取当前选中图层
    var dataLayerParams = dataLayerSource.getParams();
    var layers = dataLayerParams.layers.replace("show:","").split(",");
    if(dataLayerParams.layerDefs != undefined){
        var layerDefs = dataLayerParams.layerDefs.split(";");
        var layerWhere = {};
        for (var i = 0; i < layerDefs.length; i++) {
            var layerDefsById = layerDefs[i].split(":");
            layerWhere[layerDefsById[0]] = layerDefsById[1];
        }
        //图层点击事件
        if (0 < layers.length) {
            queryLayer(layers,layerWhere,0,pointExtent);
        }
    }
    //矢量图层点击事件监听
    var isShow = false;
    map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        if (feature.get("type") == "cz") {
            $(content).load(ROOT + "/screen/travelpopup", {
                stationName: feature.get("czname"),
                type: feature.get("cztype")
            }, function () {
                setPopupPosition(feature.getGeometry().getCoordinates()[0], feature.getGeometry().getCoordinates()[1]);
            });
            //区域内的图层点击事件
        } else if (feature.get("type") == "layerpoint") {
            var firstPoint = feature.get("feature");
            if(!isShow){
                isShow = showPopup(firstPoint,feature.get("layerName"));
            }

        } else if(feature.get("type") == "playback_bus"){
            $(content).load(ROOT + "/screen/playbackbus", {
                data: JSON.stringify(feature.get("data"))
            }, function () {
                setPopupPosition(feature.getGeometry().getCoordinates()[0], feature.getGeometry().getCoordinates()[1]);
            });
        }else if(feature.get("type") == "playback_tola"){
            $(content).load(ROOT + "/screen/playbacktola", {
                data: JSON.stringify(feature.get("data"))
            }, function () {
                setPopupPosition(feature.getGeometry().getCoordinates()[0], feature.getGeometry().getCoordinates()[1]);
            });
        } else if(feature.get("type") == "playback_taxi"){
            $(content).load(ROOT + "/screen/playbacktaxi", {
                data: JSON.stringify(feature.get("data"))
            }, function () {
                setPopupPosition(feature.getGeometry().getCoordinates()[0], feature.getGeometry().getCoordinates()[1]);
            });
        } else if(feature.get("type") == "busStation"){
            $(content).load(ROOT + "/screen/showbusstationpopup", {
                data: JSON.stringify(feature.get("data"))
            }, function () {
                setPopupPosition(feature.getGeometry().getCoordinates()[0], feature.getGeometry().getCoordinates()[1]);
            });
        }else if(feature.get("type") == "bus"){
            //console.info(feature.get("data"));
            $(content).load(ROOT + "/screen/busgpspopup", {data: JSON.stringify(feature.get("data"))},function(){
                setPopupPosition(feature.getGeometry().getCoordinates()[0], feature.getGeometry().getCoordinates()[1]);
            });

        }else if(feature.get("type") == "camera"){
            $(content).load(ROOT + "/screen/camerapopup", {data: JSON.stringify(feature.get("data"))},function(){
                setPopupPosition(feature.getGeometry().getCoordinates()[0], feature.getGeometry().getCoordinates()[1]);
            });
        }
    });
}

//图层点位查询 多图层则会遍历查询
function queryLayer(layers,layerWhere,i,pointExtent) {
    if(i < layers.length) {
        var layerId = layers[i];
        var where = '';
        if(layerWhere[layerId] != undefined) {
            where = layerWhere[layerId];
        }
        if(layerId != '-1') {
            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerId + '/query?text=', {
                type: 'POST',
                dataType: "json",
                data: {
                    "geometry": pointExtent,
                    "geometryType": "esriGeometryEnvelope",
                    "spatialRelationship": "esriSpatialRelContains",
                    "where": where,
                    "returnGeometry": "true",
                    "outSpatialReference": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            }).done(function (resp) {
                if (resp.features != undefined && resp.features.length > 0) {
                    var firstPoint = resp.features[0];
                    var isShow = showPopup(firstPoint,layerNameById[layerId]);
                    if(isShow) return;
                } else {
                    queryLayer(layers,layerWhere,++i,pointExtent)
                }
            }).fail(function () {
                queryLayer(layers,layerWhere,++i,pointExtent);
            });
        }
    }
}
//搜索图层点位
var pointclass = {
    "出租车": {layerName: "taxi", name: "PLATE_NUMBER",type:"singlepoint"},
    "公交车": {layerName: "bus", name: "PLATE_NUMBER",type:"singlepoint"},
    "公交站点": {layerName: "bus_station", name: "STATIONNAME",type:"singlepoint"},
    "城市公交": {layerName: "bus_city", name: "PLATE_NUMBER",type:"singlepoint"},
    "城乡公交": {layerName: "bus_country", name: "PLATE_NUMBER",type:"singlepoint"},
    "两客一危": {layerName: "vehicle_cv", name: "PLATE_NUMBER",type:"singlepoint"},
    "营运货船": {layerName: "boats", name: "BOATSNAME",type:"singlepoint"},
    "自行车": {layerName: "bike", name: "STATIONNAME",type:"singlepoint"},
    "高速收费站": {layerName: "highway_station", name: "TOLL_NAME",type:"singlepoint"},
    "应急仓库": {layerName: "supplies_warehouse", name: "MC",type:"singlepoint"},
    "公交线路": {layerName: "busline", name: "LINEID = {1} and DIRECTION = {2}" ,type:"line"},
    "道路视频": {layerName: "camera", name: "NAME",type:"multipoint"},
    "视频": {layerName: "camera", name: "NAME",type:"singlepoint"},
    "道路": {layerName: "road", name: "ROAD_NAME",type:"multipoint"},
    "执法车": {layerName: "vehicle_law", name: "PLA_NO",type:"singlepoint"}
};

//半角转换为全角函数
function ToDBC(str) {
// str = str.replaceAll(/\./g, '。');
    var hash = {'32':'\u3000'};
    var ret = [], i = 0, len = str.length, code, chr;
    for (; i < len; ++i) {
        code = str.charCodeAt(i);
        var letter = str.charAt(i);
        if(letter == '`' || letter == '.') {
            ret[i] = letter;
        }else{
            chr = hash[code];
            if (!chr && code > 31 && code < 127) {
                chr = hash[code] = String.fromCharCode(code + 65248);
            }
            ret[i] = chr ? chr : str.charAt(i);
        }
    }
    return ret.join('');
};

//查询道路 资源
function queryRoadPoint(roadName){
    roadName = ToDBC(roadName);
    var arr =  [];
    var lineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: [237, 212, 0, 0.8],
            width: 6,
        }),
        //text: new ol.style.Text({
        //     font: '12px sans-serif',  // 默认这个字体，可以修改成其他的，格式和css的字体设置一样
        //    text: '' + roadName,
        //    fill: new ol.style.Fill({
        //        color: '#2EC7C9'
        //    })
        //})
    });
    $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName["road"].split(',')[0] + '/query?text=', {
        type: 'POST',
        dataType: "json",
        data: {
            "geometryType": "esriGeometryEnvelope",
            "inSR": 4326,
            "spatialRel": "esriSpatialRelIntersects",
            "where": "NAME_CHN ='" + roadName + "'",
            "returnGeometry": "true",
            "outSR": 4326,
            "outFields": "*",
            "f": "pjson",
            "orderByFields":"OBJECTID"
        }
    }).done(function(res){
        //console.info(res);
        if(res.features == undefined || res.features.length == 0){
            alert("无效道路");
            return ;
        }
        $("#search").toggle();
        $("#clearSearch").toggle();
        $('#HCloseBtn').click();  //关闭弹框

        //需要使用multilineString类来组装多条线路，不然会乱
        var multilineString = new ol.geom.MultiLineString([]);

        //获取到Arcgis返回的路线结果
        var paths = res.features[0].geometry.paths;

        //遍历结果用于组装完整的线路
        for(var i=0;i<paths.length;i++){
            var result = paths[i];

            //一条完整线路的一部分
            var line_part = new ol.geom.LineString(result);

            //把一部分道路组装到multilineString形成完整道路
            multilineString.appendLineString(line_part);

        }

        //地图上展示线路
        var multilineFeature = new ol.Feature({
            geometry: multilineString
        });
        multilineFeature.setStyle(lineStyle);
        searchSource.addFeature(multilineFeature);

        //转化成Arcgis对象作为参数进行图层查询
        var jstsGeom = parserBuffer.read(multilineFeature.getGeometry());
        var buffered = jstsGeom.buffer(0.0005);// create a buffer of 40 meters around each line
        var bufferFeature = new ol.Feature({geometry: parserBuffer.write(buffered)});	// convert back from JSTS and replace the geometry on the feature
        //var out = bufferFeature.getGeometry().getCoordinates()[0];

        var esriGeometry = '{"rings":[[';

        var out = bufferFeature.getGeometry().getCoordinates();
        if(out.length > 1){
            for(var i=0;i<out.length;i++){
                outArr = out[i][0];
                for (var x = 0; x < outArr.length; x++) {
                    if(outArr[x] != undefined){
                        esriGeometry += "[" + outArr[x][0] + "," + outArr[x][1] + "],";

                        //
                        //var gpspoint = new ol.Feature({
                        //    type: "playback_$!{json.playbackType}",
                        //    geometry: new ol.geom.Point(outArr[x])
                        //});
                        //gpspoint.setStyle(new ol.style.Style({
                        //    image: new ol.style.Circle({
                        //        radius: 4,
                        //        snapToPixel: false,
                        //        fill: new ol.style.Fill({color: '#FC0000'}),
                        //        stroke: new ol.style.Stroke({
                        //            color: 'white', width: 1
                        //        })
                        //    })
                        //}));
                        //
                        //searchSource.addFeature(gpspoint);


                    }
                }
            }
            esriGeometry = esriGeometry.substring(0,esriGeometry.length - 1);
        }else{
            out = out[0];
            for (var i = 0; i < out.length; i++) {
                esriGeometry += "[" + out[i][0] + "," + out[i][1] + "]";
                if (i != out.length - 1) {
                    esriGeometry += ",";
                }
            }
        }

        esriGeometry += ']],"spatialReference":{"wkid":4326}}';

        if(layerIdByName["taxi"] != undefined && layerIdByName["taxi"] != "") {
            //显示出租车点位
            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName["taxi"].split(',')[0] + '/query?text=', {
                type: 'POST',
                dataType: "json",
                data: {
                    "geometry": esriGeometry,
                    "geometryType": "esriGeometryPolygon",
                    "spatialRelationship": "esriSpatialRelContains",
                    "where": "1=1",
                    "returnGeometry": "true",
                    "outSpatialReference": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            }).done(function (resp) {
                if(resp.features == undefined)
                    return;
                var number = resp.features.length;
                for (var i = 0; i < number; i++) {
                    var feature = resp.features[i];
                    var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                    var pointFeature = new ol.Feature({
                        geometry: point
                    });
                    pointFeature.set("type", "layerpoint");
                    pointFeature.set("feature", feature);
                    pointFeature.set("layerName", "taxi");
                    var state = feature.attributes.STATE;
                    if (state == 1) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/taxi_greed.png'
                            })
                        }));
                    } else {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/taxi_red.png'
                            })
                        }));
                    }
                    searchSource.addFeature(pointFeature);
                }
            });
        }
        if(layerIdByName["bus_city"] != undefined && layerIdByName["bus_city"] != "") {
            //显示公交车点位
            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName["bus_city"].split(',')[0] + '/query?text=', {
                type: 'POST',
                dataType: "json",
                data: {
                    "geometry": esriGeometry,
                    "geometryType": "esriGeometryPolygon",
                    "spatialRelationship": "esriSpatialRelContains",
                    "where": "1=1",
                    "returnGeometry": "true",
                    "outSpatialReference": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            }).done(function (resp) {
                if(resp.features == undefined)
                    return;
                var number = resp.features.length;
                for (var i = 0; i < number; i++) {
                    var feature = resp.features[i];
                    var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                    var pointFeature = new ol.Feature({
                        geometry: point
                    });
                    pointFeature.set("type", "layerpoint");
                    pointFeature.set("feature", feature);
                    pointFeature.set("layerName", "bus_city");
                    var speed = feature.attributes.SPEED;
                    if (speed <= 15) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/bus_red.png'
                            })
                        }));
                    } else if (speed <= 30) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/bus_yellow.png'
                            })
                        }));
                    } else {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/bus_greed.png'
                            })
                        }));
                    }
                    searchSource.addFeature(pointFeature);
                }
            });
        }
        if(layerIdByName["bus_country"] != undefined && layerIdByName["bus_country"] != "") {
            //显示公交车点位
            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName["bus_country"].split(',')[0] + '/query?text=', {
                type: 'POST',
                dataType: "json",
                data: {
                    "geometry": esriGeometry,
                    "geometryType": "esriGeometryPolygon",
                    "spatialRelationship": "esriSpatialRelContains",
                    "where": "1=1",
                    "returnGeometry": "true",
                    "outSpatialReference": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            }).done(function (resp) {
                if(resp.features == undefined)
                    return;
                var number = resp.features.length;
                for (var i = 0; i < number; i++) {
                    var feature = resp.features[i];
                    var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                    var pointFeature = new ol.Feature({
                        geometry: point
                    });
                    pointFeature.set("type", "layerpoint");
                    pointFeature.set("feature", feature);
                    pointFeature.set("layerName", "bus_country");
                    var speed = feature.attributes.SPEED;
                    if (speed <= 15) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/bus_red.png'
                            })
                        }));
                    } else if (speed <= 30) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/bus_yellow.png'
                            })
                        }));
                    } else {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/bus_greed.png'
                            })
                        }));
                    }
                    searchSource.addFeature(pointFeature);
                }
            });
        }
        if(layerIdByName["bus_station"] != undefined && layerIdByName["bus_station"] != "") {
            //显示公交站点点位
            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName["bus_station"].split(',')[0] + '/query?text=', {
                type: 'POST',
                dataType: "json",
                data: {
                    "geometry": esriGeometry,
                    "geometryType": "esriGeometryPolygon",
                    "spatialRelationship": "esriSpatialRelContains",
                    "where": "1=1",
                    "returnGeometry": "true",
                    "outSpatialReference": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            }).done(function (resp) {
                if(resp.features == undefined)
                    return;
                var number = resp.features.length;
                for (var i = 0; i < number; i++) {
                    var feature = resp.features[i];
                    var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                    var pointFeature = new ol.Feature({
                        geometry: point
                    });
                    pointFeature.set("type", "layerpoint");
                    pointFeature.set("feature", feature);
                    pointFeature.set("layerName", "bus_station");
                    pointFeature.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            scale: 0.6,
                            src: ROOT + '/assets/images/screen/icons/bus_station.png'
                        })
                    }));
                    searchSource.addFeature(pointFeature);
                }
            });
        }
        if(layerIdByName["boats"] != undefined && layerIdByName["boats"] != "") {
            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName["boats"].split(',')[0] + '/query?text=', {
                type: 'POST',
                dataType: "json",
                data: {
                    "geometry": esriGeometry,
                    "geometryType": "esriGeometryPolygon",
                    "spatialRelationship": "esriSpatialRelContains",
                    "where": "1=1",
                    "returnGeometry": "true",
                    "outSpatialReference": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            }).done(function (resp) {
                if(resp.features == undefined)
                    return;
                var number = resp.features.length;
                for (var i = 0; i < number; i++) {
                    var feature = resp.features[i];
                    var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                    var pointFeature = new ol.Feature({
                        geometry: point
                    });
                    pointFeature.set("type", "layerpoint");
                    pointFeature.set("feature", feature);
                    pointFeature.set("layerName", "boats");
                    var boatstype = feature.attributes.BOATSTYPE;
                    if (boatstype == 1) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/boats_waterBus.png'
                            })
                        }));
                    } else if (boatstype == 2) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/boats_cargoShip.png'
                            })
                        }));
                    }
                    searchSource.addFeature(pointFeature);
                }
            });
        }
        if(layerIdByName["vehicle_cv"] != undefined && layerIdByName["vehicle_cv"] != "") {
            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName["vehicle_cv"].split(',')[0] + '/query?text=', {
                type: 'POST',
                dataType: "json",
                data: {
                    "geometry": esriGeometry,
                    "geometryType": "esriGeometryPolygon",
                    "spatialRelationship": "esriSpatialRelContains",
                    "where": "1=1",
                    "returnGeometry": "true",
                    "outSpatialReference": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            }).done(function (resp) {
                if(resp.features == undefined)
                    return;
                var number = resp.features.length;
                for (var i = 0; i < number; i++) {
                    var feature = resp.features[i];
                    var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                    var pointFeature = new ol.Feature({
                        geometry: point
                    });
                    pointFeature.set("type", "layerpoint");
                    pointFeature.set("feature", feature);
                    pointFeature.set("layerName", "vehicle_cv");
                    var businessType = feature.attributes.BUSINESS_TYPE;
                    if (businessType == 1) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/cv_bao.png'
                            })
                        }));
                    } else if (businessType == 2) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/cv_ban.png'
                            })
                        }));
                    } else if (businessType == 3) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/cv_wei.png'
                            })
                        }));
                    }
                    searchSource.addFeature(pointFeature);
                }
            });
        }
        if(layerIdByName["vehicle_to_la"] != undefined && layerIdByName["vehicle_to_la"] != "") {
            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName["vehicle_to_la"].split(',')[0] + '/query?text=', {
                type: 'POST',
                dataType: "json",
                data: {
                    "geometry": esriGeometry,
                    "geometryType": "esriGeometryPolygon",
                    "spatialRelationship": "esriSpatialRelContains",
                    "where": "1=1",
                    "returnGeometry": "true",
                    "outSpatialReference": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            }).done(function (resp) {
                if(resp.features == undefined)
                    return;
                var number = resp.features.length;
                for (var i = 0; i < number; i++) {
                    var feature = resp.features[i];
                    var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                    var pointFeature = new ol.Feature({
                        geometry: point
                    });
                    pointFeature.set("type", "layerpoint");
                    pointFeature.set("feature", feature);
                    pointFeature.set("layerName", "vehicle_to_la");
                    var businessType = feature.attributes.BUSINESS_TYPE;
                    if (businessType == 1) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/cv_bao.png'
                            })
                        }));
                    } else if (businessType == 2) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/cv_ban.png'
                            })
                        }));
                    } else if (businessType == 3) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/cv_wei.png'
                            })
                        }));
                    } else if (businessType == 4) {
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.6,
                                src: ROOT + '/assets/images/screen/icons/cv_huo.png'
                            })
                        }));
                    }
                    searchSource.addFeature(pointFeature);
                }
            });
        }
        if(layerIdByName["camera"] != undefined && layerIdByName["camera"] != "") {
            //查询视频点位
            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName["camera"].split(',')[0] + '/query?text=', {
                type: 'POST',
                dataType: "json",
                data: {
                    "geometry": esriGeometry,
                    "geometryType": "esriGeometryPolygon",
                    "spatialRelationship": "esriSpatialRelContains",
                    "where": "1=1",
                    "returnGeometry": "true",
                    "outSpatialReference": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            }).done(function (resp) {
                if(resp.features == undefined)
                    return;
                for (var i = 0; i < resp.features.length; i++) {
                    var feature = resp.features[i];
                    var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                    var pointFeature = new ol.Feature({
                        geometry: point
                    });
                    pointFeature.set("type", "layerpoint");
                    pointFeature.set("feature", feature);
                    pointFeature.set("layerName", "camera");
                    pointFeature.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            scale: 0.6,
                            src: ROOT + '/assets/images/screen/icons/camera0.png'
                        })
                    }));
                    searchSource.addFeature(pointFeature);
                }
            }).fail(function () {

            });
        }
        var extent = searchSource.getExtent();
        map.getView().fit(extent, map.getSize());

    });
}

var busgps_interval;
//点位查询
function queryById(id) {
    removeAllFeatureLayers();
    searchSource.clear();
    if(id.indexOf("[道路]") != -1){
        queryRoadPoint(id.split("]")[1]);
        return;
    }

    var ids = id.split("]");
    var idn = ids[0].substring(1, ids[0].length);
    var layerName = layerIdByName[pointclass[idn].layerName].split(',');
    if(layerName) {
        //拼接 where 语句
        var where;
        if(pointclass[idn].type == "singlepoint" || pointclass[idn].type == 'multipoint'){
            where = " " + pointclass[idn].name + " like '%" + ids[1] + "%'";  // 点
        }else{
            if(pointclass[idn].type == "line"){
                var direction = id.substring(id.length-2);
                var keyname = ids[1].substring(0,ids[1].length-2);
                where = "  LINENAME = '" + keyname + "' and DIRECTION=  " + (direction=="上行"?1:2) + "";  // 公家线路
            }
        }

        $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerName[0] + '/query?text=', {
            type: 'POST',
            dataType: "json",
            data: {
                "geometryType": "esriGeometryEnvelope",
                "inSR": 4326,
                "spatialRel": "esriSpatialRelIntersects",
                "where": where,
                "returnGeometry": "true",
                "outSR": 4326,
                "outFields": "*",
                "f": "pjson"
            }
        }).done(function (resp) {
            if (resp.features.length > 0) {
                $("#search").toggle();
                $("#clearSearch").toggle();
                $('#HCloseBtn').click();  //关闭弹框
                if (pointclass[idn].type == "singlepoint") {
                    var firstPoint = resp.features[0];
                    var point = new ol.geom.Point([firstPoint.geometry.x, firstPoint.geometry.y]);
                    var pointFeature = new ol.Feature({
                        geometry: point
                    });
                    pointFeature.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            scale: 0.5,
                            src: ROOT + '/assets/images/gis/dw_ico.png',
                            anchor: [0.5, 0.3]
                        })
                    }));
                    searchSource.addFeature(pointFeature);
                    showPopup(firstPoint, pointclass[idn].layerName);

                    view.setCenter([firstPoint.geometry.x,firstPoint.geometry.y]);

                } else if (pointclass[idn].type == "line") {
                    //加载站点
                    $.ajax({
                        type: "POST",
                        url: ROOT + "/screen/getStationListByLineInfo",
                        data: {data: JSON.stringify(resp.features[0].attributes)},
                        success: function (stationIds) {
                            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName[pointclass["公交站点"].layerName] + '/query?text=', {
                                type: 'POST',
                                dataType: "json",
                                data: {
                                    "geometryType": "esriGeometryEnvelope",
                                    "inSR": 4326,
                                    "spatialRel": "esriSpatialRelIntersects",
                                    "where": "ID in " + stationIds,
                                    "returnGeometry": "true",
                                    "outSR": 4326,
                                    "outFields": "*",
                                    "f": "pjson"
                                }
                            }).done(function (resp1) {

                                var line = new ol.geom.LineString(resp.features[0].geometry.paths[0]);
                                var lineFeature = new ol.Feature({
                                    geometry: line
                                });
                                lineFeature.setStyle(
                                    new ol.style.Style({
                                        stroke: new ol.style.Stroke({
                                            color: [237, 212, 0, 0.8],
                                            width: 6,
                                        })
                                    }));

                                searchSource.addFeature(lineFeature);
                                var extent = searchSource.getExtent();
                                map.getView().fit(extent, map.getSize());

                                //var centerPosition = ol.extent.getCenter(searchSource.getExtent());

                                $(content).load(ROOT + "/screen/busLinepopup", {
                                    data: JSON.stringify(resp.features[0].attributes)
                                }, function () {

                                    //获取最高点坐标
                                    var pointArr = resp.features[0].geometry.paths[0];
                                    var maxY = 0;
                                    var maxPosition = 0;
                                    for (var i = 0; i < pointArr.length; i++) {
                                        if (maxY < pointArr[i][1]) {
                                            maxPosition = i;
                                            maxY = pointArr[i][1];
                                        }
                                    }
                                    setPopupPosition(pointArr[maxPosition][0], pointArr[maxPosition][1]);
                                });

                                var stationStyle = new ol.style.Style({
                                    image: new ol.style.Icon({
                                        scale: 0.5,
                                        src: ROOT + '/assets/images/screen/icons/busstation.png',
                                        //anchor: [0.5, 0.3]
                                    })
                                });
                                var features = resp1.features;
                                for (var i = 0; i < features.length; i++) {
                                    var point = new ol.geom.Point([features[i].geometry.x, features[i].geometry.y]);
                                    var pointFeature = new ol.Feature({
                                        geometry: point,
                                        type: "busStation"
                                    });
                                    pointFeature.set("data", features[i].attributes);
                                    pointFeature.setStyle(stationStyle);
                                    searchSource.addFeature(pointFeature);
                                }
                                laodBusGpsByLineIdAndDirection(resp.features[0].attributes.LINEID,id);
                                busgps_interval = setInterval("laodBusGpsByLineIdAndDirection(" + resp.features[0].attributes.LINEID
                                    + ",'"+ id + "')",15000);

                            });
                        }
                    });

                } else if (pointclass[idn].type == "multipoint") {
                    console.info(resp.features);
                    var features = resp.features;
                    var cameraStyle = new ol.style.Style({
                        image: new ol.style.Icon({
                            scale: 0.6,
                            src: ROOT + '/assets/images/screen/icons/camera0.png'
                        })
                    });
                    for (var i = 0; i < features.length; i++) {
                        var point = new ol.geom.Point([features[i].geometry.x, features[i].geometry.y]);
                        var pointFeature = new ol.Feature({
                            geometry: point,
                            type: "camera"
                        });
                        pointFeature.setStyle(cameraStyle);
                        pointFeature.set("data", features[i].attributes);
                        searchSource.addFeature(pointFeature);
                    }
                } else {
                    notify("无有效点位", "warn");
                }
            }
        }).fail(function () {

        });
    } else {
        notify("无有效点位","warn");
    }
}

/**
 * 根据线路id与方向，查询线路实时gps 车辆
 * @param lineid 公交线路id
 * @param direction 包含方向信息的文字
 */
function laodBusGpsByLineIdAndDirection(lineid,id){
    var feas = searchSource.getFeatures();
    for(var i=0,size=feas.length;i<size;i++){
        var f = feas[i];
        if(f.get("type") == "bus"){
            searchSource.removeFeature(f);
        }
    }
    $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName[pointclass["公交车"].layerName] + '/query?text=', {
        type: 'POST',
        dataType: "json",
        data: {
            "geometryType": "esriGeometryEnvelope",
            "inSR": 4326,
            "spatialRel": "esriSpatialRelIntersects",
            "where": "LINEID = " +lineid
            + ' and DIRECTION in (-1,' + (id.indexOf("上行") != -1 ? 1 : 2) + ")",
            "returnGeometry": "true",
            "outSR": 4326,
            "outFields": "*",
            "f": "pjson"
        }
    }).done(function (resp2) {
        var features = resp2.features;
        for (var i = 0; i < features.length; i++) {
            var point = new ol.geom.Point([features[i].geometry.x, features[i].geometry.y]);
            var pointFeature = new ol.Feature({
                geometry: point,
                type: "bus"
            });
            var speed = features[i].attributes.SPEED;

            if (speed <= 15) {
                pointFeature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        scale: 0.8,
                        src: ROOT + '/assets/images/screen/icons/bus_red_num.png'
                    })
                }));
            } else if (speed <= 30) {
                pointFeature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        scale: 0.8,
                        src: ROOT + '/assets/images/screen/icons/bus_yellow_num.png'
                    })
                }));
            } else {
                pointFeature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        scale: 0.8,
                        src: ROOT + '/assets/images/screen/icons/bus_green_num.png'
                    })
                }));
            }

            pointFeature.set("data", features[i].attributes);
            searchSource.addFeature(pointFeature);
        }
    });
}
//图层点击弹窗
function showPopup(firstPoint,layerName) {
    if (layerName == "vehicle_cv") {
        $(content).load(ROOT + "/screen/cvpopup", {
            plateNumber: (firstPoint.attributes.PLATE_NUMBER == 'Null' ? '' : firstPoint.attributes.PLATE_NUMBER),
            plateColorType: (firstPoint.attributes.PLATE_COLOR_TYPE == 'Null' ? '' : firstPoint.attributes.PLATE_COLOR_TYPE)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    } else if (layerName == "boats") {
        $(content).load(ROOT + "/screen/boatspopup", {
            zwcm: (firstPoint.attributes.BOATSNAME == 'Null' ? '' : firstPoint.attributes.BOATSNAME)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    } else if (layerName == "supplies_warehouse") {
        $(content).load(ROOT + "/screen/suppliesWarehousepopup", {
            mc: (firstPoint.attributes.MC == 'Null' ? '' : firstPoint.attributes.MC)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == "bus_station"){
        $(content).load(ROOT + "/screen/showbusstationpopup", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == "bus_city" || layerName == "bus_country" || layerName == "bus"){
        $(content).load(ROOT + "/screen/busgpspopup", {data: JSON.stringify(firstPoint.attributes)},function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == "highway_station"){
        $(content).load(ROOT + "/screen/highwaystationpopup", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == "bike"){
        $(content).load(ROOT + "/screen/bikepopup", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == "taxi"){

        clickLogOut();
        $(content).load(ROOT + "/screen/taxipopup", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == "vehicle_to_la"){
        $(content).load(ROOT + "/screen/vehitolapopup", {
            plateNo: firstPoint.attributes.PLATE_NO,
            plateColor:firstPoint.attributes.PLATE_COLOR
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == "camera"){
        $(content).load(ROOT + "/screen/camerapopup", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == "alarm_info"){
        $(content).load(ROOT + "/screen/alarmpopup", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == "camera_hh" || layerName == "camera_boat"){
        $(content).load(ROOT + "/screen/camerahhpopup?layerName=" + layerName, {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == 'alarm_info_jq'){
        $(content).load(ROOT + "/screen/alarmpopupjq", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == 'alarm_info_bus_stop'){
        $(content).load(ROOT + "/screen/alarmpopupbusstop", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == 'alarm_info_travelpyxl'){
        $(content).load(ROOT + "/screen/alarmpopuptravelpyxl", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == 'alarm_info_bus_kzjg'){
        $(content).load(ROOT + "/screen/alarmpopupbuskzjg", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }else if(layerName == 'alarm_info_overweight'){
        $(content).load(ROOT + "/screen/alarmpopupoverweight", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }
    else if(layerName == 'vehicle_law'){
        $(content).load(ROOT + "/screen/vehiclelawpopup", {
            data: JSON.stringify(firstPoint.attributes)
        },function(){
            setPopupPosition(firstPoint.geometry.x, firstPoint.geometry.y);
        });
    }

    return true;
}
//弹窗定位
function setPopupPosition(x,y){
    $(".ol-popup").width($(".window_apply_all").width()+20);
    $(".ol-popup").height($(".ulpadding").height() + 55);
    //console.info($(".ol-popup").width());
    //console.info($(".ol-popup").height());
    overlay.setPosition([x,y]);
}
//清空动态图层
function clearTileSource() {
    layerParams = {};
    dataLayerSource.updateParams({layers: "", layerDefs: ""});
    dataLayerSource.refresh();
    clusterLayer.setSource(null);
    heatLayer.setSource(null);
    vectorPointSource.clear();
}

//去除底图上所有图层和弹窗
function removeAllFeatureLayers() {
    layerParams = {};
    dataLayerSource.updateParams({layers: "", layerDefs: ""});
    dataLayerSource.refresh();
    clusterLayer.setSource(null);
    heatLayer.setSource(null);
    vectorSource.clear();
    ajaxSource.clear();
    searchSource.clear();
    vectorPointSource.clear();

    clickLogOut();
    $("#overlaycontent").empty();
    $("#popup-content").empty();
    $(".popup-cz").remove();

    //搜索按钮切换
    $("#search").show();
    $("#clearSearch").hide();

    overlay.setPosition(undefined);  //去除倒三角

    $("#qx").css("display","none");
    $("#dw").css("display","inline-block");

    clearInterval(busgps_interval);

    baidusate2.setVisible(false); //隐藏路况
    clearInterval(update_road_condition_interval);


    //移除应急指挥页面 事件地图图标
    $("div[id*='anchor']").remove();
    //隐藏历史事件
    $(".his_event_message_box").hide();
    //隐藏应急指挥页面 事件详情表格
    $('.right_bottom_win').animate({'bottom':'-250px','opacity':'0'}, 600);
    $('.zhfx_right_bottom_win').animate({'bottom':'-250px','opacity':'0'}, 600);

}
//刷新动态图层
function refreshAddLayer() {
    var layerIds = "";
    var layerDefs = "";
    var pointLayer = {};
    if(layerParams == undefined) return;
    $.each(layerParams,function(key,values){
        if(layerIdByName[key] != undefined && layerIdByName[key] != "") {
            var layerId = layerIdByName[key].split(',');
            var layerWhere = "1=1";
            if(values != null && values != "") {
                layerWhere = values;
            }
            if(key == "bike" || key == "bus_city" || key == "bus_country" || key == "taxi" || key == "boats" || key == "vehicle_cv" ||
                key == "vehicle_to_la" || key == "camera" || key == "bus_station"  || (key.indexOf("alarm_info") !=-1)) {
                pointLayer[key] = {
                    "geometryType": "esriGeometryEnvelope",
                    "inSR": 4326,
                    "spatialRel": "esriSpatialRelIntersects",
                    "where": layerWhere,
                    "returnGeometry": "true",
                    "outSR": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            } else {
                for(var i = 0; i < layerId.length; i++) {
                    layerIds = layerIds + layerId[i] + ",";
                    if(values != null && values != "") {
                        layerDefs = layerDefs + layerId[i] + ":" + values +";";
                    }
                }
            }
        }
    });
    //前台加载点位
    addPointByLayer(pointLayer);
    //加载gis图层
    if(layerIds.length > 0) {
        layerIds = layerIds.substring(0, layerIds.length - 1);
    }
    if(layerDefs.length > 0) {
        layerDefs = layerDefs.substring(0, layerDefs.length - 1);
    }
    if(layerIds != "") {
        dataLayerSource.updateParams({layers: 'show:'+layerIds, layerDefs: layerDefs});
        dataLayerSource.refresh();
    }
}

var layerView = {};
layerView["bus_city"] = {pointxy:[119.70481119097501,30.230419913241708],level:14};
layerView["boats"] = {pointxy:[119.775015821925,30.237729818859957],level:15};
layerView["bike"] = {pointxy:[119.85053467681202,30.2630541860503],level:14};
layerView["highway_station"] = {pointxy:[119.39117,30.180768999999998],level:10};
layerView["taxi"] = {pointxy:[119.718221494245,30.232711851352917],level:14};

//图层信息全局变量
var layerParams;
//更新动态点位图层，传入layers参数
function addLayer(layerParam) {
    layerParams = layerParam;
    var layerIds = "";
    var layerDefs = "";
    var pointxy = [119.58, 30.23];
    var level = 12;
    var pointLayer = {};
    $.each(layerParams,function(key,values){
        if(layerIdByName[key] != undefined && layerIdByName[key] != "") {
            var layerId = layerIdByName[key].split(',');
            var layerWhere = "1=1";
            if(values != null && values != "") {
                layerWhere = values;
            }
            if(key == "bike" || key == "bus_city" || key == "bus_country" || key == "taxi" || key == "boats" || key == "vehicle_cv" ||
                key == "vehicle_to_la" || key == "camera" || key == "camera_hh" || key =='camera_boat' || key == "bus_station" || (key.indexOf("alarm_info") !=-1)
            || key == 'vehicle_law') {
                pointLayer[key] = {
                    "geometryType": "esriGeometryEnvelope",
                    "inSR": 4326,
                    "spatialRel": "esriSpatialRelIntersects",
                    "where": layerWhere,
                    "returnGeometry": "true",
                    "outSR": 4326,
                    "outFields": "*",
                    "f": "pjson"
                }
            } else {
                for(var i = 0; i < layerId.length; i++) {
                    layerIds = layerIds + layerId[i] + ",";
                    if(values != null && values != "") {
                        layerDefs = layerDefs + layerId[i] + ":" + values +";";
                    }
                }
            }
        }
        if(layerView[key]){
            pointxy = layerView[key].pointxy;
            level = layerView[key].level;
        }
    });
    //前台加载点位
    addPointByLayer(pointLayer);
    //加载gis图层
    if(layerIds.length > 0) {
        layerIds = layerIds.substring(0, layerIds.length - 1);
    }
    if(layerDefs.length > 0) {
        layerDefs = layerDefs.substring(0, layerDefs.length - 1);
    }
    if(layerIds != "") {
        dataLayerSource.updateParams({layers: 'show:'+layerIds, layerDefs: layerDefs});
    } else {
        dataLayerSource.updateParams({layers: "", layerDefs: ""});
    }
    dataLayerSource.refresh();
    if(JSON.stringify(layerParam).indexOf("linan_area") == -1)
        resetView(pointxy,level);
}

//重置视角
function resetView(pointxy,level) {
    var center = [119.58, 30.23];
    if(pointxy){
        center = pointxy;
    }
    if(!level){
        level = 12;
    }
    panzoomTo(center, level);
}
//点击加载热力图
function add_heatLayer() {
    clearTileSource();
    $.each(layerParams,function(key,values){
        var layerId = layerIdByName[key].split(',');
        var layerWhere = "1=1";
        if(values != null && values != "") {
            layerWhere = values;
        }
        $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/'+layerId[0]+'/query?text=', {
            type: 'POST',
            dataType: "json",
            data: {
                "geometryType": "esriGeometryEnvelope",
                "inSR": 4326,
                "spatialRel": "esriSpatialRelIntersects",
                "where": layerWhere,
                "returnGeometry": "true",
                "outSR": 4326,
                "outFields": "*",
                "f": "pjson"
            }
        }).done(function (resp) {
            var features = new Array();
            for (var i = 0; i < resp.features.length; i++) {
                var feature = new ol.Feature();
                feature.setGeometry(new ol.geom.Point([resp.features[i].geometry.x, resp.features[i].geometry.y]));
                features.push(feature);
            }
            heatSource.addFeatures(features);
            heatLayer.setSource(heatSource);
        });
    });

}
//加载聚合图
function add_ClusterLayer() {
    clearTileSource();
    var clusterVector = new ol.source.Vector();
    $.each(layerParams,function(key,values){
        var layerId = layerIdByName[key].split(',');
        var layerWhere = "1=1";
        if(values != null && values != "") {
            layerWhere = values;
        }
        $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/'+layerId[0]+'/query?text=', {
            type: 'POST',
            dataType: "json",
            data: {
                "geometryType": "esriGeometryEnvelope",
                "inSR": 4326,
                "spatialRel": "esriSpatialRelIntersects",
                "where": layerWhere,
                "returnGeometry": "true",
                "outSR": 4326,
                "outFields": "*",
                "f": "pjson"
            }
        }).done(function (resp) {
            if (resp.features.length > 0) {
                var features = new Array();
                for (var i = 0; i < resp.features.length; i++) {
                    var feature = new ol.Feature();
                    feature.setGeometry(new ol.geom.Point([resp.features[i].geometry.x, resp.features[i].geometry.y]));
                    features.push(feature);
                }
                clusterVector.addFeatures(features);
                clusterSource = new ol.source.Cluster({
                    distance: 100,
                    source: clusterVector
                });
                clusterLayer.setSource(clusterSource);
            }
        });
    });
}
//点击加载散点图
function add_dataLayer() {
    clearTileSource();
    addLayer(layerParams);
}

/**
 * 报警车辆 feature信息，key：车牌号，value：对应feature
 */
var alarm_info_layer_map = {};
//根据图层名称，前台加载点位
function addPointByLayer(pointLayer) {
    //删除 动态视频点位（中雨以上才会出现）
    $("div[id^='anchor']").remove();
    $.each(pointLayer,function(key,values){
        if(layerIdByName[key] != undefined && layerIdByName[key] != "") {
            var layerId = layerIdByName[key].split(',');
            $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/'+layerId[0]+'/query?text=', {
                type: 'POST',
                dataType: "json",
                data: values
            }).done(function (resp) {

                var number = resp.features.length;
                for (var i = 0; i < number; i++) {
                    if(key.indexOf("alarm_info") !=-1)
                        break;
                    var feature = resp.features[i];
                    var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                    var pointFeature = new ol.Feature({
                        geometry: point
                    });

                    pointFeature.set("type", "layerpoint");
                    pointFeature.set("feature", feature);
                    pointFeature.set("layerName", key);
                    if(key == "bike") {
                        var pointFeatureOld = vectorPointSource.getFeatureById(key+feature.attributes.NAME);
                        if(pointFeatureOld != undefined && pointFeatureOld != null) {
                            vectorPointSource.removeFeature(pointFeatureOld);
                        }
                        pointFeature.setId(key+feature.attributes.NAME);
                        var rentpercent = feature.attributes.RENTPERCENT;
                        if (rentpercent <= 0) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/bike_blue.png'
                                })
                            }));
                        } else if (rentpercent <= 50) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/bike_greed.png'
                                })
                            }));
                        } else if (rentpercent < 100) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/bike_yellow.png'
                                })
                            }));
                        } else {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/bike_red.png'
                                })
                            }));
                        }
                    } else if (key == "taxi") {
                        var pointFeatureOld = vectorPointSource.getFeatureById(key+feature.attributes.PLATE_NUMBER);
                        if(pointFeatureOld != undefined && pointFeatureOld != null) {
                            vectorPointSource.removeFeature(pointFeatureOld);
                        }
                        pointFeature.setId(key+feature.attributes.PLATE_NUMBER);
                        var state = feature.attributes.STATE;
                        if (state == 1) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/taxi_greed.png'
                                })
                            }));
                        } else {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/taxi_red.png'
                                })
                            }));
                        }
                    } else if (key == "bus_city" || key == "bus_country") {
                        var pointFeatureOld = vectorPointSource.getFeatureById(key+feature.attributes.PLATE_NUMBER);
                        if(pointFeatureOld != undefined && pointFeatureOld != null) {
                            vectorPointSource.removeFeature(pointFeatureOld);
                        }
                        pointFeature.setId(key+feature.attributes.PLATE_NUMBER);
                        var speed = feature.attributes.SPEED;
                        var lineName = feature.attributes.LINENAME;
                        if(lineName == ' ') {   //没有lineid
                            if (speed <= 15) {
                                pointFeature.setStyle(new ol.style.Style({
                                    image: new ol.style.Icon({
                                        scale: 0.8,
                                        src: ROOT + '/assets/images/screen/icons/bus_red_num.png'
                                    })
                                }));
                            } else if (speed <= 30) {
                                pointFeature.setStyle(new ol.style.Style({
                                    image: new ol.style.Icon({
                                        scale: 0.8,
                                        src: ROOT + '/assets/images/screen/icons/bus_yellow_num.png'
                                    })
                                }));
                            } else {
                                pointFeature.setStyle(new ol.style.Style({
                                    image: new ol.style.Icon({
                                        scale: 0.8,
                                        src: ROOT + '/assets/images/screen/icons/bus_green_num.png'
                                    })
                                }));
                            }
                        }else{
                            var reg=/[\u4E00-\u9FA5]/g;
                            lineName = lineName.replace(reg,'');
                            lineName = lineName.replace('(','');
                            lineName = lineName.replace(')','');
                            if (speed <= 15) {
                                pointFeature.setStyle(new ol.style.Style({
                                    image: new ol.style.Icon({
                                        scale: 0.8,
                                        src: ROOT + '/assets/images/screen/icons/bus_red_num.png'
                                    }),
                                    text: new ol.style.Text({
                                        text: lineName,
                                        fill: new ol.style.Fill({
                                            color: '#fff'
                                        })
                                    })
                                }));
                            } else if (speed <= 30) {
                                pointFeature.setStyle(new ol.style.Style({
                                    image: new ol.style.Icon({
                                        scale: 0.8,
                                        src: ROOT + '/assets/images/screen/icons/bus_yellow_num.png'
                                    }),
                                    text: new ol.style.Text({
                                        text: lineName,
                                        fill: new ol.style.Fill({
                                            color: '#fff'
                                        })
                                    })
                                }));
                            } else {
                                pointFeature.setStyle(new ol.style.Style({
                                    image: new ol.style.Icon({
                                        scale: 0.8,
                                        src: ROOT + '/assets/images/screen/icons/bus_green_num.png'
                                    }),
                                    text: new ol.style.Text({
                                        text: lineName,
                                        fill: new ol.style.Fill({
                                            color: '#fff'
                                        })
                                    })
                                }));
                            }
                        }

                    } else if (key == "vehicle_cv") {
                        var pointFeatureOld = vectorPointSource.getFeatureById(key+feature.attributes.PLATE_NUMBER);
                        if(pointFeatureOld != undefined && pointFeatureOld != null) {
                            vectorPointSource.removeFeature(pointFeatureOld);
                        }
                        pointFeature.setId(key+feature.attributes.PLATE_NUMBER);
                        var businessType = feature.attributes.BUSINESS_TYPE;
                        if (businessType == 1) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/cv_bao.png'
                                })
                            }));
                        } else if (businessType == 2) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/cv_ban.png'
                                })
                            }));
                        } else if (businessType == 3) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/cv_wei.png'
                                })
                            }));
                        } else if (businessType == 4) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/cv_jingqu.png'
                                })
                            }));
                        } else if (businessType == 5) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/cv_keyun.png'
                                })
                            }));
                        }
                    } else if (key == "boats") {
                        var pointFeatureOld = vectorPointSource.getFeatureById(key+feature.attributes.BOATSNAME);
                        if(pointFeatureOld != undefined && pointFeatureOld != null) {
                            vectorPointSource.removeFeature(pointFeatureOld);
                        }
                        pointFeature.setId(key+feature.attributes.BOATSNAME);
                        var boatstype = feature.attributes.BOATSTYPE;
                        if (boatstype == 1) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/boats_waterBus.png'
                                })
                            }));
                        } else if (boatstype == 2) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/boats_cargoShip.png'
                                })
                            }));
                        }
                    } else if (key == "bus_station") {
                        var pointFeatureOld = vectorPointSource.getFeatureById(key+feature.attributes.ID);
                        if(pointFeatureOld != undefined && pointFeatureOld != null) {
                            vectorPointSource.removeFeature(pointFeatureOld);
                        }
                        pointFeature.setId(key+feature.attributes.ID);
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.8,
                                src: ROOT + '/assets/images/screen/icons/bus_station.png'
                            })
                        }));
                    } else if (key == "vehicle_to_la") {
                        var pointFeatureOld = vectorPointSource.getFeatureById(key+feature.attributes.PLATE_NO);
                        if(pointFeatureOld != undefined && pointFeatureOld != null) {
                            vectorPointSource.removeFeature(pointFeatureOld);
                        }
                        pointFeature.setId(key+feature.attributes.PLATE_NO);
                        var businessType = feature.attributes.BUSINESS_TYPE;
                        if (businessType == 1) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/cv_bao.png'
                                })
                            }));
                        } else if (businessType == 2) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/cv_ban.png'
                                })
                            }));
                        } else if (businessType == 3) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/cv_wei.png'
                                })
                            }));
                        } else if (businessType == 4) {
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/cv_huo.png'
                                })
                            }));
                        }
                    } else if (key == "camera") {
                        var pointFeatureOld = vectorPointSource.getFeatureById(key+feature.attributes.CARAMEID);
                        if(pointFeatureOld != undefined && pointFeatureOld != null) {
                            vectorPointSource.removeFeature(pointFeatureOld);
                        }

                        var weather_text = $("#weather_text").html();

                        if(feature.attributes.C_LEVEL == 1 && (weather_text.indexOf("中雨") >= 0 || weather_text.indexOf("大雨") >= 0
                            || weather_text.indexOf("暴雨") >= 0 || weather_text.indexOf("雪") >= 0 || weather_text.indexOf("冻雨") >= 0 ||
                            weather_text.indexOf("冰雹") >= 0)) {
                            if(pointFeature.getGeometry().getCoordinates()[0] <= 0 ) return;
                            $("#overlaycontent").append(
                                '<div id="anchor' + i + '" value=\''+ JSON.stringify(pointFeature.H.feature.attributes) +'\'>' +
                                '<img  style="height:80%;width: 80%;" src="'+ ROOT + '/assets/images/screen/icons/camera' + feature.attributes.C_LEVEL + '.gif" > ' +
                                '</div>');
                            var pointOverlay = new ol.Overlay({
                                element: document.getElementById('anchor' + i),
                            });
                            pointOverlay.setPosition(pointFeature.getGeometry().getCoordinates());
                            pointOverlay.setPositioning("center-center");
                            map.addOverlay(pointOverlay);
                        }else{
                            pointFeature.setId(key+feature.attributes.CARAMEID);
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/camera'+ feature.attributes.C_LEVEL +'.png'
                                })
                            }));
                        }
                    }else if (key == "camera_hh" || key == 'camera_boat') {
                        var pointFeatureOld = vectorPointSource.getFeatureById(key+feature.attributes.CAMERAINDEXCODE);
                        if(pointFeatureOld != undefined && pointFeatureOld != null) {
                            vectorPointSource.removeFeature(pointFeatureOld);
                        }
                        pointFeature.setId(key+feature.attributes.CAMERAINDEXCODE);
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.8,
                                src: ROOT + '/assets/images/screen/icons/camera0.png'
                            })
                        }));
                    } else if(key == 'vehicle_law'){
                        var pointFeatureOld = vectorPointSource.getFeatureById(key+feature.attributes.CAMERAINDEXCODE);
                        if(pointFeatureOld != undefined && pointFeatureOld != null) {
                            vectorPointSource.removeFeature(pointFeatureOld);
                        }
                        pointFeature.setId(key+feature.attributes.PLA_NO);
                        pointFeature.setStyle(new ol.style.Style({
                            image: new ol.style.Icon({
                                scale: 0.8,
                                src: ROOT + '/assets/images/screen/icons/vehicle_law.png'
                            })
                        }));
                    }
                    vectorPointSource.addFeature(pointFeature);
                }

                if(key.indexOf("alarm_info") != -1){
                    var map_alarm = alarm_info_layer_map[key];
                    if(map_alarm == undefined){
                        alarm_info_layer_map[key] = {};
                        map_alarm = {};
                    }
                    if(map_alarm != {}){  //清除点位
                        for(var plate_number in map_alarm){
                            var pointFeatureOld = vectorPointSource.getFeatureById(key+plate_number);
                            if(pointFeatureOld != undefined && pointFeatureOld != null) {
                                vectorPointSource.removeFeature(pointFeatureOld);
                            }
                        }
                        alarm_info_layer_map[key] = {};
                    }

                    if(key == "alarm_info"){ //公交超速、偏移线路、出租超速报警
                        for (var i = 0; i < number; i++) {
                            var feature = resp.features[i];
                            var attributes = feature.attributes;
                            var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                            var pointFeature = new ol.Feature({
                                geometry: point
                            });
                            pointFeature.set("type", "layerpoint");
                            pointFeature.set("feature", feature);
                            pointFeature.set("layerName", key);
                            pointFeature.setId(key+feature.attributes.PLATE_NUMBER);
                            alarm_info_layer_map[key][attributes.PLATE_NUMBER] = pointFeature;

                            var PLATE_TYPE = attributes.PLATE_TYPE;
                            if(PLATE_TYPE == '0'){
                                pointFeature.setStyle(new ol.style.Style({
                                    image: new ol.style.Icon({
                                        scale: 0.8,
                                        src: ROOT + '/assets/images/screen/icons/bus_red.png'
                                    })
                                }));
                            }else if(PLATE_TYPE == '1'){
                                pointFeature.setStyle(new ol.style.Style({
                                    image: new ol.style.Icon({
                                        scale: 0.8,
                                        src: ROOT + '/assets/images/screen/icons/taxi_red.png'
                                    })
                                }));
                            }
                            vectorPointSource.addFeature(pointFeature);
                        }
                    }else if(key == 'alarm_info_jq' || key == 'alarm_info_bus_stop' ||
                        key == 'alarm_info_travelpyxl' || key == 'alarm_info_bus_kzjg' || key == 'alarm_info_overweight'){

                        for (var i = 0; i < number; i++) {

                            var feature = resp.features[i];
                            var attributes = feature.attributes;
                            var point = new ol.geom.Point([feature.geometry.x, feature.geometry.y]);
                            var pointFeature = new ol.Feature({
                                geometry: point
                            });
                            pointFeature.set("type", "layerpoint");
                            pointFeature.set("feature", feature);
                            pointFeature.set("layerName", key);
                            pointFeature.setId(key+feature.attributes.PLATE_NUMBER);
                            pointFeature.setStyle(new ol.style.Style({
                                image: new ol.style.Icon({
                                    scale: 0.8,
                                    src: ROOT + '/assets/images/screen/icons/'+key+'.png'
                                })
                            }));


                            if(key == 'alarm_info_travelpyxl'){   //长运，根据报警次数，显示不同的图标
                                var ALERT_COUNT = attributes.ALERT_COUNT;
                                if(ALERT_COUNT <15 ){
                                    pointFeature.setStyle(new ol.style.Style({
                                        image: new ol.style.Icon({
                                            scale: 0.8,
                                            src: ROOT + '/assets/images/screen/icons/'+'alarm_info_travelpyxl1'+'.png'
                                        })
                                    }));
                                }else if(ALERT_COUNT > 15 && ALERT_COUNT <30){
                                    pointFeature.setStyle(new ol.style.Style({
                                        image: new ol.style.Icon({
                                            scale: 0.8,
                                            src: ROOT + '/assets/images/screen/icons/'+'alarm_info_travelpyxl2'+'.png'
                                        })
                                    }));
                                }else{
                                    pointFeature.setStyle(new ol.style.Style({
                                        image: new ol.style.Icon({
                                            scale: 0.8,
                                            src: ROOT + '/assets/images/screen/icons/'+'alarm_info_travelpyxl3'+'.png'
                                        })
                                    }));
                                }
                            }
                            if(attributes.PLATE_NUMBER != undefined){
                                alarm_info_layer_map[key][attributes.PLATE_NUMBER] = pointFeature;
                                vectorPointSource.addFeature(pointFeature);
                            }

                        }
                    }else{

                    }
                }

                //动态视频图标 事件绑定
                if($("div[id^='anchor']").size() > 0){
                    $("div[id^='anchor']").bind("click",function(){
                        var value = eval("(" + $(this).attr("value") +")");
                        $(content).load(ROOT + "/screen/camerapopup", {
                            data: $(this).attr("value")
                        },function(){
                            setPopupPosition(value.LONGITUDE, value.LATITUDE);
                        });
                    });
                }

            });
        }
    });

}
//根据点位展示圆圈，并展示圆圈内的信息点位
function addPolygonByPoint(x, y, buffer) {
    vectorSource.clear();
    vectorPointSource.clear();
    panzoomTo([x, y], 15);
    //叠加圆形区域
    var jsonPolygon = new ol.geom.Circle([x, y],buffer);
    var polygonFeature = new ol.Feature({
        geometry: jsonPolygon
    });
    polygonFeature.set("type", "area");
    polygonFeature.setStyle(areaStyle);
    vectorSource.addFeature(polygonFeature);

    var geom = new ol.geom.Point([x, y]);
    var jstsGeom = parser.read(geom);
    var buffered = jstsGeom.buffer(buffer);// create a buffer of 40 meters around each line
    var bufferFeature = new ol.Feature({geometry: parser.write(buffered)});	// convert back from JSTS and replace the geometry on the feature
    var out = bufferFeature.getGeometry().getCoordinates()[0];
    var esriGeometry = '{"rings":[[';
    for (var i = 0; i < out.length; i++) {
        esriGeometry += "[" + out[i][0] + "," + out[i][1] + "]";
        if (i != out.length - 1) {
            esriGeometry += ",";
        }
    }
    esriGeometry += ']],"spatialReference":{"wkid":4326}}';
    var size = map.getSize();
    var nowExtent = map.getView().calculateExtent(size);
    size.push(96);
    var display = size.join(",");
    //--  查询开始-------
    var data = {
        "geometry": esriGeometry,
        "geometryType": "esriGeometryPolygon",
        "spatialRelationship": "esriSpatialRelContains",
        "where": "1=1",
        "returnGeometry": "true",
        "outSpatialReference": 4326,
        "outFields": "*",
        "f": "pjson"
    };
    var pointLayer = {"bike":data,"taxi":data,"bus_city":data,"bus_country":data,"bus_station":data,"boats":data,"vehicle_cv":data,"vehicle_to_la":data,"camera":data};
    addPointByLayer(pointLayer);
}
//画图
var drawBuffer;
var parser = new jsts.io.OL3Parser();
var parserBuffer = new jsts.io.OL3Parser();
function drawPolygon() {

    clearInterval(layerInterval1);

    map.removeInteraction(drawBuffer);
    drawBuffer = null;
    drawBuffer = new ol.interaction.Draw({
        source: vectorSource,
        type: "Point"
        // geometryFunction: geometryFunction,
        //maxPoints: 3 最多能画几个点
    });
    map.addInteraction(drawBuffer);
    drawBuffer.on('drawend', function (e) {
        vectorSource.clear();
        vectorPointSource.clear();
        var geom = e.feature.getGeometry();
        panzoomTo(geom.getCoordinates(), 15);
        //叠加圆形区域
        var jsonPolygon = new ol.geom.Circle(geom.getCoordinates(),0.01);
        var polygonFeature = new ol.Feature({
            geometry: jsonPolygon
        });
        polygonFeature.set("type", "area");
        polygonFeature.setStyle(areaStyle);
        vectorSource.addFeature(polygonFeature);

        var jstsGeom = parserBuffer.read(geom);
        var buffered = jstsGeom.buffer(0.01);// create a buffer of 40 meters around each line
        var bufferFeature = new ol.Feature({geometry: parserBuffer.write(buffered)});	// convert back from JSTS and replace the geometry on the feature
        var out = bufferFeature.getGeometry().getCoordinates()[0];
        var esriGeometry = '{"rings":[[';
        for (var i = 0; i < out.length; i++) {
            esriGeometry += "[" + out[i][0] + "," + out[i][1] + "]";
            if (i != out.length - 1) {
                esriGeometry += ",";
            }
        }
        esriGeometry += ']],"spatialReference":{"wkid":4326}}';
        var size = map.getSize();
        var nowExtent = map.getView().calculateExtent(size);
        size.push(96);
        var display = size.join(",");
        //--  查询开始-------
        var data = {
            "geometry": esriGeometry,
            "geometryType": "esriGeometryPolygon",
            "spatialRelationship": "esriSpatialRelContains",
            "where": "1=1",
            "returnGeometry": "true",
            "outSpatialReference": 4326,
            "outFields": "*",
            "f": "pjson"
        };
        var pointLayer = {"bike":data,"taxi":data,"bus_city":data,"bus_country":data,"bus_station":data,"boats":data,"vehicle_cv":data,"vehicle_to_la":data,"camera":data};
        addPointByLayer(pointLayer);
        map.removeInteraction(drawBuffer);
        $("#dw").removeClass('c_add');
        $("#dw").css("display","none");
        $("#qx").css("display","inline-block");
    });
}

$('#drawPolygonSelect').change(function () {
    vectorSource.clear();
    vectorPointSource.clear();
    refreshAddLayer();
    loadingEndCallback();
    drawPolygon();
})

//function drawPolygon() {
//
//    clearInterval(layerInterval1);
//
//    map.removeInteraction(drawBuffer);
//    drawBuffer = null;
//    drawBuffer = new ol.interaction.Draw({
//        source: vectorSource,
//        type: "Point"
//        // geometryFunction: geometryFunction,
//        //maxPoints: 3 最多能画几个点
//    });
//    map.addInteraction(drawBuffer);
//    drawBuffer.on('drawend', function (e) {
//        vectorSource.clear();
//        vectorPointSource.clear();
//        var geom = e.feature.getGeometry();
//        panzoomTo(geom.getCoordinates(), 15);
//        //叠加圆形区域
//        var jsonPolygon = new ol.geom.Circle(geom.getCoordinates(),0.01);
//        var polygonFeature = new ol.Feature({
//            geometry: jsonPolygon
//        });
//        polygonFeature.set("type", "area");
//        polygonFeature.setStyle(areaStyle);
//        vectorSource.addFeature(polygonFeature);
//
//        var jstsGeom = parserBuffer.read(geom);
//        var buffered = jstsGeom.buffer(0.01);// create a buffer of 40 meters around each line
//        var bufferFeature = new ol.Feature({geometry: parserBuffer.write(buffered)});	// convert back from JSTS and replace the geometry on the feature
//        var out = bufferFeature.getGeometry().getCoordinates()[0];
//        var esriGeometry = '{"rings":[[';
//        for (var i = 0; i < out.length; i++) {
//            esriGeometry += "[" + out[i][0] + "," + out[i][1] + "]";
//            if (i != out.length - 1) {
//                esriGeometry += ",";
//            }
//        }
//        esriGeometry += ']],"spatialReference":{"wkid":4326}}';
//        var size = map.getSize();
//        var nowExtent = map.getView().calculateExtent(size);
//        size.push(96);
//        var display = size.join(",");
//        //--  查询开始-------
//        var data = {
//            "geometry": esriGeometry,
//            "geometryType": "esriGeometryPolygon",
//            "spatialRelationship": "esriSpatialRelContains",
//            "where": "1=1",
//            "returnGeometry": "true",
//            "outSpatialReference": 4326,
//            "outFields": "*",
//            "f": "pjson"
//        };
//        var pointLayer = {"bike":data,"taxi":data,"bus_city":data,"bus_country":data,"bus_station":data,"boats":data,"vehicle_cv":data,"vehicle_to_la":data,"camera":data};
//        addPointByLayer(pointLayer);
//        map.removeInteraction(drawBuffer);
//        $("#dw").removeClass('c_add');
//        $("#dw").css("display","none");
//        $("#qx").css("display","inline-block");
//    });
//}
function drawPolygon() {
    var radius = Number($('#drawPolygonSelect').val());
    $('#bottom_right_select').show();
    clearInterval(layerInterval1);

    map.removeInteraction(drawBuffer);

    drawBuffer = null;
    drawBuffer = new ol.interaction.Draw({
        source: vectorSource,
        type: "Point"
        // geometryFunction: geometryFunction,
        //maxPoints: 3 最多能画几个点
    });
    map.addInteraction(drawBuffer);
    drawBuffer.on('drawend', function (e) {
        vectorSource.clear();
        vectorPointSource.clear();
        var geom = e.feature.getGeometry();
        panzoomTo(geom.getCoordinates(), 15);
        //叠加圆形区域
        var jsonPolygon = new ol.geom.Circle(geom.getCoordinates(), radius);
        var polygonFeature = new ol.Feature({
            geometry: jsonPolygon
        });
        polygonFeature.set("type", "area");
        polygonFeature.setStyle(areaStyle);
        vectorSource.addFeature(polygonFeature);

        var jstsGeom = parserBuffer.read(geom);
        var buffered = jstsGeom.buffer(radius);// create a buffer of 40 meters around each line
        var bufferFeature = new ol.Feature({geometry: parserBuffer.write(buffered)});	// convert back from JSTS and replace the geometry on the feature
        var out = bufferFeature.getGeometry().getCoordinates()[0];
        var esriGeometry = '{"rings":[[';
        for (var i = 0; i < out.length; i++) {
            esriGeometry += "[" + out[i][0] + "," + out[i][1] + "]";
            if (i != out.length - 1) {
                esriGeometry += ",";
            }
        }
        esriGeometry += ']],"spatialReference":{"wkid":4326}}';
        var size = map.getSize();
        var nowExtent = map.getView().calculateExtent(size);
        size.push(96);
        var display = size.join(",");
        //--  查询开始-------
        var data = {
            "geometry": esriGeometry,
            "geometryType": "esriGeometryPolygon",
            "spatialRelationship": "esriSpatialRelContains",
            "where": "1=1",
            "returnGeometry": "true",
            "outSpatialReference": 4326,
            "outFields": "*",
            "f": "pjson"
        };
        var pointLayer = {
            "bike": data,
            "taxi": data,
            "bus_city": data,
            "bus_country": data,
            "bus_station": data,
            "boats": data,
            "vehicle_cv": data,
            "vehicle_to_la": data,
            "camera": data
        };
        addPointByLayer(pointLayer);
        map.removeInteraction(drawBuffer);
        $("#dw").removeClass('c_add');
        $("#dw").css("display", "none");
        $("#qx").css("display", "inline-block");
    });
}

/**
 * 根据经纬度坐标 进行查询
 * @param coord 经纬度坐标
 */
function drawPolygonWithCoord(coord) {
    $(".switch05").addClass("click_add");
    $(".switch05").find("a").html("取消");
    drawBuffer = null;
    drawBuffer = new ol.interaction.Draw({
        source: vectorSource,
        type: "Point"
    });
    panzoomTo(coord, 16);
    //叠加圆形区域
    var jsonPolygon = new ol.geom.Circle(coord,0.008);
    var polygonFeature = new ol.Feature({
        geometry: jsonPolygon
    });
    polygonFeature.set("type", "area");

    var areaStyle3 = new ol.style.Style({
        fill: new ol.style.Fill({
            color: [255, 255, 255, 0.2]
        }),
        stroke: new ol.style.Stroke({
            color: [255, 204, 0, 1],
            width: 2
        })
    });
    polygonFeature.setStyle(areaStyle3);
    vectorSource.addFeature(polygonFeature);

    var geom = new ol.geom.Point(coord);
    var jstsGeom = parserBuffer.read(geom);

    //var jstsGeom = parserBuffer.read(jsonPolygon);
    var buffered = jstsGeom.buffer(0.008);// create a buffer of 40 meters around each line
    var bufferFeature = new ol.Feature({geometry: parserBuffer.write(buffered)});	// convert back from JSTS and replace the geometry on the feature
    var out = bufferFeature.getGeometry().getCoordinates()[0];
    var esriGeometry = '{"rings":[[';
    for (var i = 0; i < out.length; i++) {
        esriGeometry += "[" + out[i][0] + "," + out[i][1] + "]";
        if (i != out.length - 1) {
            esriGeometry += ",";
        }
    }
    esriGeometry += ']],"spatialReference":{"wkid":4326}}';
    var size = map.getSize();
    var nowExtent = map.getView().calculateExtent(size);
    size.push(96);
    var display = size.join(",");

    //--  查询开始-------
    var data = {
        "geometry": esriGeometry,
        "geometryType": "esriGeometryPolygon",
        "spatialRelationship": "esriSpatialRelContains",
        "where": "1=1",
        "returnGeometry": "true",
        "outSpatialReference": 4326,
        "outFields": "*",
        "f": "pjson"
    };
    var pointLayer = {"bike":data,"taxi":data,"bus_city":data,"bus_country":data,"bus_station":data,"boats":data,"vehicle_cv":data,"vehicle_to_la":data,"camera":data};
    addPointByLayer(pointLayer);

    $(".btnDraw").removeClass('b_btnAdd');
    map.removeInteraction(drawBuffer);
}

function removePolygon() {
    $('#bottom_right_select').hide();
    vectorSource.clear();
    vectorPointSource.clear();
    $("#qx").css("display","none");
    $("#dw").css("display","inline-block");

    refreshAddLayer();
    loadingEndCallback();
}
//关闭轨迹
function removeLayer(){
    if (animating) {
        stopAnimation(false);
    }
    map.removeLayer(trackLayer);
}

//var playbackHeight = 640;
var beforeplayHeight;
var gpsarr;
var animating, speed, now, startButton, geoMarker, startMarker, endMarker, moveFeature, routeCoords, routeLength, trackLayer,playbackData;
var walkgpsLayer;
/**
 * 轨迹播放入口
 * @param data key1：playback value1：查询基础信息
 * key2：list  value2：gps信息
 *
 */
function playbackInit(data){
    $("#close").click();//关闭之前的轨迹窗口

    playbackData = data;
    $("#playbackdiv").load(ROOT + "/screen/playbackindex",{data:JSON.stringify(data.playback)},function(){
        //-------改变地图高度---------
        var extent = map.getSize();
        beforeplayHeight = extent[1];
        $("#map").height(extent[1] - 300);
        map.setSize([extent[0],extent[1] - 300]);
        //-------改变地图高度---------
        $("#playbackdiv").show();
        //轨迹弹窗的宽度
        $("#playbackdiv").css("width", extent[0] + "px");
    });

    var arr = playbackData.list;
    gpsarr = [];
    var i=0;
    removeAllFeatureLayers();
    var length = arr.length;
    while(i<length){
        gpsarr.push([arr[i].LONGI,arr[i].LATI]);
        ++i;
    }
    track(gpsarr);
}

function track(respData) {
    animating = false;

    map.removeLayer(trackLayer);
    routeCoords = respData;
    routeLength = routeCoords.length;
    var route = new ol.geom.LineString(routeCoords);
    var routeFeature = new ol.Feature({
        type: 'route',
        geometry: route
    });
    geoMarker = new ol.Feature({
        type: 'geoMarker',
        geometry: new ol.geom.Point(routeCoords[0])
    });

    startMarker = new ol.Feature({
        type: 'start-icon',
        geometry: new ol.geom.Point(routeCoords[0])
    });
    endMarker = new ol.Feature({
        type: 'end-icon',
        geometry: new ol.geom.Point(routeCoords[routeLength - 1])
    });

    var styles = {
        'route': new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(221, 99, 0, 1)'
            }),
            stroke: new ol.style.Stroke({
                color: [237, 212, 0, 0.8],
                width: 6,
            })
        }),
        'start-icon': new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: ROOT+'/assets/images/gis/f-start.png'
            })
        }),
        'end-icon': new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                src: ROOT+'/assets/images/gis/f-end.png'
            })
        }),
        'geoMarker': new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                snapToPixel: false,
                fill: new ol.style.Fill({color: '#0099ff'}),
                stroke: new ol.style.Stroke({
                    color: 'white', width: 2
                })
            })
        })
    };

    trackLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [routeFeature, geoMarker, startMarker, endMarker]
        }),
        style: function (feature) {
            if (animating && feature.get('type') === 'geoMarker') {
                return null;
            }
            return styles[feature.get('type')];
        }
    });
    walkgpsLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
        })
    });

    map.addLayer(trackLayer);
    map.addLayer(walkgpsLayer);

    var pan = ol.animation.pan({
        duration: 1000,
        source: view.getCenter()
    });
    map.beforeRender(pan);
    var extent = trackLayer.getSource().getExtent();
    map.getView().fit(new ol.extent.buffer(extent,0.008), map.getSize());
}

//添加场站
function addCZ() {
    //84
    //addCZPoint(1, 119.7122121673, 30.2295868249, 'bus', 'left', 'bottom-left', '临安东站', 'passenger_station');
    //addCZPoint(2, 119.2184446921, 30.1678338322, 'bus', 'right', 'bottom-right', '昌化站', 'passenger_station');
    //addCZPoint(3, 119.3913770940, 30.1980772183, 'bus', 'left', 'bottom-left', '於潜站', 'passenger_station');

    //火星
    addCZPoint(1, 119.717098981092, 30.2270968320452, 'bus', 'left', 'bottom-left', '临安东站', 'passenger_station');
    addCZPoint(2, 119.22355951036, 30.1653780605133, 'bus', 'right', 'bottom-right', '昌化站', 'passenger_station');
    addCZPoint(3, 119.396659314895, 30.1957895301334, 'bus', 'left', 'bottom-left', '於潜站', 'passenger_station');
    getMainData();
    panzoomTo([119.46, 30.23], 11);
}

//添加长运场站
function addTravel() {
    //84
    //addCZPoint(1, 119.7122121673, 30.2295868249, 'bus', 'left', 'bottom-left', '临安东站', 'passenger_station');
    //addCZPoint(2, 119.2184446921, 30.1678338322, 'bus', 'right', 'bottom-right', '昌化站', 'passenger_station');
    //addCZPoint(3, 119.3913770940, 30.1980772183, 'bus', 'left', 'bottom-left', '於潜站', 'passenger_station');

    //火星
    addCZPoint(1, 119.717098981092, 30.2270968320452, 'bus', 'left', 'bottom-left', '临安东站', 'passenger_station');
    addCZPoint(2, 119.22355951036, 30.1653780605133, 'bus', 'right', 'bottom-right', '昌化站', 'passenger_station');
    addCZPoint(3, 119.396659314895, 30.1957895301334, 'bus', 'left', 'bottom-left', '於潜站', 'passenger_station');
    getMainData();
    panzoomTo([119.46, 30.23], 11);
}

var czxx = [
    {title1: "班次", value1: "", unit1: "班次", id1: "TRAVEL_LADZ_BC", title2: "发送", value2: "", unit2: "人次", id2: "TRAVEL_LADZ_RC"},
    {title1: "班次", value1: "", unit1: "班次", id1: "TRAVEL_CHZ_BC", title2: "发送", value2: "", unit2: "人次", id2: "TRAVEL_CHZ_RC"},
    {title1: "班次", value1: "", unit1: "班次", id1: "TRAVEL_YQZ_BC", title2: "发送", value2: "", unit2: "人次", id2: "TRAVEL_YQZ_RC"}
];

function addCZPoint(i, x, y, z, w, p, a, b) {
    var point = new ol.geom.Point([x, y]);
    var pointFeature = new ol.Feature({
        geometry: point
    });
    pointFeature.setId("czid" + i);
    pointFeature.set("czname", a);
    pointFeature.set("type", "cz");
    pointFeature.set("cztype", b);
    pointFeature.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({color: '#e77d26'}),
        })
    }));
    ajaxSource.addFeature(pointFeature);
    var czxxtemp = czxx[i - 1];
    $("#overlaycontent").append('<div id="popup' + i + '" style="width:240px;height:65px;background:none;border:none;" class="popup-cz">' +
        '<div id="popup-content' + i + '">' +
        '<div class="station_num">' +
        '<div class="station_ico_box ' + z + '_sta_' + w + '"></div>' +
        '<div class="sta_content sta_content_' + w + '">' +
        '<p><span class="sta_name">' + czxxtemp.title1 + '</span><span class="sta_num" name="' + czxxtemp.id1 + '">' + czxxtemp.value1 + '</span><span class="sta_unit">' + czxxtemp.unit1 + '</span></p>' +
        '<p><span class="sta_name">' + czxxtemp.title2 + '</span><span class="sta_num" name="' + czxxtemp.id2 + '">' + czxxtemp.value2 + '</span><span class="sta_unit">' + czxxtemp.unit2 + '</span></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
    var pointOverlay = new ol.Overlay({
        element: document.getElementById('popup' + i),
        autoPan: false,
        id: "czol" + i
    });
    map.addOverlay(pointOverlay);
    pointOverlay.setPositioning(p);
    pointOverlay.setPosition([x, y]);
}

//移除场站
function removeCZ() {
    //去除场站定位窗口
    $(".popup-cz").remove();
    //清除场站点位
    ajaxSource.clear();
}

//根据 lineId 查询线路
function showBusLineById(lineId){
    $.ajax(gisUrl + '/arcgis/rest/services/la/la/MapServer/' + layerIdByName["busline"] + '/query?text=', {
        type: 'POST',
        dataType: "json",
        data: {
            "geometryType": "esriGeometryEnvelope",
            "inSR": 4326,
            "spatialRel": "esriSpatialRelIntersects",
            "where": "  LINEID = " + lineId,
            "returnGeometry": "true",
            "outSR": 4326,
            "outFields": "*",
            "f": "pjson"
        }
    }).done(function (resp) {
        if (resp.features.length > 0) {
            $('#HCloseBtn').click();  //关闭弹框
            for(var i=0;i<resp.features.length;i++){
                var line = new ol.geom.LineString(resp.features[i].geometry.paths[0]);
                var lineFeature = new ol.Feature({
                    geometry: line
                });
                lineFeature.setStyle(
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: [250, 52, 17, 0.8],
                            width: 6,
                        })
                    }));
                trackLayer.getSource().addFeature(lineFeature);
            }
        } else {
            notify("无有效点位","warn");
        }
    }).fail(function () {

    });
}



function showPoint(data){
    var feature = new ol.Feature({
        geometry: new ol.geom.Point([data.longi,data.lati])
    });
    feature.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            scale: 0.5,
            src: ROOT + '/assets/images/gis/dw_ico.png',
            anchor: [0.5, 0.3]
        })
    }));

    searchSource.addFeature(feature);
    view.setCenter([data.longi,data.lati]);
}

function update_road_condition(){
    map.removeLayer(baidusate2);

    create_baidusate2();
    map.addLayer(baidusate2);

    var date = new Date();
    var hour = date.getHours();
    if(hour <10)
        hour = "0" + hour;
    var minute = date.getMinutes();
    if(minute <10)
        minute = "0" + minute;
    var result = hour + ":" + minute;
    $("#road_update_time").html(result);

}

/**
 * 昌化、临安出租车注销
 */
function clickLogOut(){
    try{
        if(document.getElementById("TLMDvrAx").GetIsLogined()  ==  1){
            document.getElementById("TLMDvrAx").Logout();
        }
    }catch (e){}
}