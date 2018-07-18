var map, view,clickListener,dataLayer,heatLayer,clusterLayer

//定义弹跳效果
function bounce(t) {
    var s = 7.5625, p = 2.75, l;
    if (t < (1 / p)) {
        l = s * t * t;
    } else {
        if (t < (2 / p)) {
            t -= (1.5 / p);
            l = s * t * t + 0.75;
        } else {
            if (t < (2.5 / p)) {
                t -= (2.25 / p);
                l = s * t * t + 0.9375;
            } else {
                t -= (2.625 / p);
                l = s * t * t + 0.984375;
            }
        }
    }
    return l;
}

//定义弹性效果
function elastic(t) {
    return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
}


//配置图层解析度信息-black
var resolutions_black = [
    0.01099866274749598,
    0.005499331372531586,
    0.002749665686265805,
    0.0013748328431329002,
    6.874164215664488E-4,
    3.4370821078322564E-4,
    1.7185410539161233E-4,
    8.592705269580617E-5,
    4.296352634790308E-5,
    2.148176317395154E-5,
    1.074088158697577E-5
];

//配置图层解析度信息-blue
var resolutions_blue = [
    0.00951784402332112,
    0.00475892201166056,
    0.00237946100583028,
    0.00118973050291514,
    5.9486525145757E-4,
    2.97432625728785E-4,
    1.5228550437313792E-4,
    7.614275218656896E-5,
    3.807137609328448E-5,
    1.903568804664224E-5,
    9.51784402332112E-5
];

//配置url模板
var blackUrl= 'http://21.15.18.252:6080/arcgis/rest/services/hzjtmapNew/black/MapServer/tile/{z}/{y}/{x}';
var blueUrl=  'http://21.15.18.252:6080/arcgis/rest/services/hzjtmapNew/blueNewFontTop/MapServer/tile/{z}/{y}/{x}';
var matrixIds_black = new Array( resolutions_black.length );
var matrixIds_blue = new Array( resolutions_blue.length );

for ( z = 0; z < resolutions_black.length; ++z ) {
    matrixIds_black[ z ] = z;
}

for ( z = 0; z < resolutions_blue.length; ++z ) {
    matrixIds_blue[ z ] = z;
}

var vectorSource = new ol.source.Vector({wrapX: false});

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
}));
var vectorLayer = new ol.layer.Vector({
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
//-热力--------------------------------------
var heatLayer = new ol.layer.Heatmap({
    source: new ol.source.Vector({
        url: 'http://172.18.13.146/proxy/proxy.ashx?http://172.18.13.146:8399/arcgis/rest/services/trip_taxi/MapServer/0/query?text=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=1%3D1&time=&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=&f=pjson',//'data/kml/2012_Earthquakes_Mag5.kml',
        format: new ol.format.EsriJSON({
            //extractStyles: false
        })
    }),
    blur: 15,//parseInt(blur.value, 10),
    radius: 5//parseInt(radius.value, 10)
});
heatLayer.set("id","heatLayer");

//-------聚合-----------------------------------
clusterLayer = new ol.layer.Vector({
    source: new ol.source.Cluster({
        distance: 100,
        source: new ol.source.Vector({
            url: 'http://172.18.13.146/proxy/proxy.ashx?http://172.18.13.146:8399/arcgis/rest/services/trip_taxi/MapServer/0/query?text=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=1%3D1&time=&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=&f=pjson',//'data/kml/2012_Earthquakes_Mag5.kml',
            format: new ol.format.EsriJSON({})
        })
    })
    ,
    style: styleFunction
});
clusterLayer.set("id","clusterLayer");


var earthquakeFill = new ol.style.Fill({
    color: 'rgba(255, 153, 0, 0.8)'
});
var earthquakeStroke = new ol.style.Stroke({
    color: 'rgba(255, 204, 0, 0.2)',
    width: 1
});
var textFill = new ol.style.Fill({
    color: '#fff'
});
var textStroke = new ol.style.Stroke({
    color: 'rgba(0, 0, 0, 0.6)',
    width: 6
});
var invisibleFill = new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.01)'
});

function createEarthquakeStyle(feature) {
    // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    // standards-violating <magnitude> tag in each Placemark.  We extract it
    // from the Placemark's name instead.
    //var name = feature.get('name');
    //var magnitude = parseFloat(name.substr(2));
    var radius = 10;

    return new ol.style.Style({
        geometry: feature.getGeometry(),
        image: new ol.style.RegularShape({
            radius1: radius,
            radius2: 2,
            points: 5,
            angle: Math.PI,
            fill: earthquakeFill,
            stroke: earthquakeStroke
        })
    });
}

var maxFeatureCount;
function calculateClusterInfo(resolution) {
    maxFeatureCount = 0;
    var features = clusterLayer.getSource().getFeatures();
    var feature, radius;
    for (var i = features.length - 1; i >= 0; --i) {
        feature = features[i];
        var originalFeatures = feature.get('features');
        var extent = ol.extent.createEmpty();
        var j, jj;
        for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
            ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
        }
        maxFeatureCount = Math.max(maxFeatureCount, jj);
        radius = 0.12 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent)) /
            resolution;
        feature.set('radius', radius);
    }
}


function styleFunction(feature, resolution) {
        calculateClusterInfo(resolution);
    var style;
    var size = feature.get('features').length;
    if (size > 1) {
        style = new ol.style.Style({
            image: new ol.style.Circle({
                radius: feature.get('radius'),
                fill: new ol.style.Fill({
                    color: [255, 153, 0, Math.min(0.8, 0.4 + (size / maxFeatureCount))]
                })
            }),
            text: new ol.style.Text({
                text: size.toString(),
                fill: textFill,
                stroke: textStroke
            })
        });
    } else {
        var originalFeature = feature.get('features')[0];
        style = createEarthquakeStyle(originalFeature);
    }
    return style;
}
//---------------------聚合结束---------------------


//判断地图是否加载完成
var loading_count;
var loaded_count;
var loadingTimer;
function checkSourceLoaded(){
    if(loading_count == loaded_count){
        loadingEndCallback();
        clearInterval(loadingTimer);
    }
}

//底图图层
var blackTileLayer = new ol.layer.Tile({
    title: 'black',
    type: 'base',
    source: new ol.source.XYZ({
        projection: ol.proj.get('EPSG:4326'),
        tileSize: [256,256],
        tileUrlFunction: function(tileCoord) {
            return blackUrl.replace('{z}', (tileCoord[0] ).toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2]-1 ).toString());
        },
        tileGrid : new ol.tilegrid.TileGrid( {
            extent: [ 119.6331834931764, 29.889078279495507, 121.8219206801414, 31.4465052929925 ],
            origin : [ -400,400],
            resolutions : resolutions_black,
            matrixIds : matrixIds_black
        } ),
        wrapX: true
    })
});


var blueTileLayer= new ol.layer.Tile({
    title: 'blue',
    type: 'base',
    visible: false,
    source: new ol.source.XYZ({
        projection: ol.proj.get('EPSG:4326'),
        tileSize: [256,256],
        tileUrlFunction: function(tileCoord) {
            return blueUrl.replace('{z}', (tileCoord[0] ).toString())
                .replace('{x}', tileCoord[1].toString())
                .replace('{y}', (-tileCoord[2]-1 ).toString());
        },
        tileGrid : new ol.tilegrid.TileGrid( {
            extent: [ 119.6331834931764, 29.889078279495507, 121.8219206801414, 31.4465052929925 ],
            origin : [ -400,400],
            resolutions : resolutions_blue,
            matrixIds : matrixIds_blue
        } ),
        wrapX: true
    })
});

//数据图层
dataLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
        url: 'http://172.18.13.146:8399/arcgis/rest/services/trip_device/MapServer',
        params:{
            layerDefs:"1:COMP_NAME='杭州市下城区越胜客运社'",
            layers: "1"

        }
    })
});
dataLayer.set("id","dataLayer");

//初始化地图
function initMap(){

    //定义视图
    view= new ol.View({
        projection: 'EPSG:4326',
        center: [120.16752774017334,30.285415993347167],
        zoom: 13
    });


    loading_count = 0;
    loaded_count = 0;
    var source  = blackTileLayer.getSource();
    source.on("tileloadstart",function(){
        loading_count++;
    });


    source.on("tileloadend",function(){
        loaded_count++;
    });

    source.on("tileloaderror",function(){
        loaded_count++;
    });

    loadingTimer = setInterval("checkSourceLoaded()",1000);

    //定义地图
    map = new ol.Map({
        layers: [
            blackTileLayer,
            blueTileLayer,
            dataLayer,
            vectorLayer
        ],
        interactions : ol.interaction.defaults({doubleClickZoom :true}),
        // 下面这个参数:通过在动画过程中同时加载瓦片来提升用户效果
        // 但会造成在移动设备或其他比较慢的设备上效果卡顿
        loadTilesWhileAnimating: true,
        overlays: [overlay],
        target: 'map',
        controls: ol.control.defaults({
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                collapsible: false
            })
        }),
        view: view
    });

    clickListener=map.on("click",clickQuery);
}// init map end

function  clickQuery(evt){
    var pixel= evt.pixel;
    var screenRightDown=[pixel[0]-5,pixel[1]+5];//右下角
    var screenLeftUp=[pixel[0]+5,pixel[1]-5];//左上角
    var rightDownPoint=map.getCoordinateFromPixel(screenRightDown);
    var leftUpPoint=map.getCoordinateFromPixel(screenLeftUp);
    var pointExtent='{"xmin":'+rightDownPoint[0]+',"ymin":'+rightDownPoint[1]+',"xmax":'+leftUpPoint[0]+',"ymax": '+leftUpPoint[1]+',"spatialReference":{"wkid":4326}}';
    $.ajax('http://172.18.13.146/proxy/proxy.ashx?http://172.18.13.146:8399/arcgis/rest/services/trip_taxi/MapServer/0/query?text=', {
        type: 'GET',
        dataType: "json",
        data: {
            "geometry":pointExtent,
            "geometryType":"esriGeometryEnvelope",
            "inSR":4326,
            "spatialRel":"esriSpatialRelIntersects",
            "where":"1=1",
            "returnGeometry":"true",
            "outSR":4326,
            "outFields":"*",
            "f":"pjson"
        }
    }).done(function(resp){
        if(resp.features.length>0){
            var firstPoint=resp.features[0];
            content.innerHTML = '<b>我是标题</b></br><p>'+firstPoint.attributes.COMP_NAME+'</p>';
            overlay.setPosition([firstPoint.geometry.x,firstPoint.geometry.y]);
        }
    }).fail(function () {
        alert("fail loading layer!!!")
    });// ajax end
}
//=======================自定义API==========================//

//左右翻转(地图对象,按钮,方向'left' or 'right')
function rotateMap(direction){
    if(direction == 'left'){
        var rt = ol.animation.rotate({
            duration: 200,
            rotation: -1 * Math.PI
        });
    }else {
        var rt = ol.animation.rotate({
            duration: 200,
            rotation: 1 * Math.PI
        });
    }
    map.beforeRender(rt);
}


//旋转到(地图对象,按钮,地点)
function rotateAround(dest){

    var currentRotation = view.getRotation();
    var rt = ol.animation.rotate({
        anchor: dest,
        duration: 1000,
        rotation: currentRotation
    });
    map.beforeRender(rt);
    view.rotate(currentRotation + (Math.PI / 2), dest);

}


//平移到
function panTo(dest){

    var pan = ol.animation.pan({
        duration: 2000,
        source: /** @type {ol.Coordinate} */ (view.getCenter())
    });
    map.beforeRender(pan);
    view.setCenter(dest);

}

//弹性到
function elasticTo(dest){
    var els= ol.animation.pan({
        duration: 2000,
        easing: elastic,
        source: /** @type {ol.Coordinate} */ (view.getCenter())
    });
    map.beforeRender(els);
    view.setCenter(dest);

}

//弹跳到
function bounceTo(dest){
    var els = ol.animation.pan({
        duration: 2000,
        easing: bounce,
        source: /** @type {ol.Coordinate} */ (view.getCenter())
    });
    map.beforeRender(els);
    view.setCenter(dest);
}

//旋转到
function spinTo(dest){
    var duration = 2000;
    var start = +new Date();
    var pan = ol.animation.pan({
        duration: duration,
        source: /** @type {ol.Coordinate} */ (view.getCenter()),
        start: start
    });
    var rotate = ol.animation.rotate({
        duration: duration,
        rotation: 2 * Math.PI,
        start: start
    });
    map.beforeRender(pan, rotate);
    view.setCenter(dest);
}

//飞越到
function flyTo(dest){
    var duration = 2000;
    var start = +new Date();
    var pan = ol.animation.pan({
        duration: duration,
        source: /** @type {ol.Coordinate} */ (view.getCenter()),
        start: start
    });
    var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 5 * view.getResolution(),
        start: start
    });
    map.beforeRender(pan, bounce);
    view.setCenter(dest);
}

//螺旋到
function spiralTo(dest){
    var duration = 2000;
    var start = +new Date();
    var pan = ol.animation.pan({
        duration: duration,
        source: /** @type {ol.Coordinate} */ (view.getCenter()),
        start: start
    });
    var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 2 * view.getResolution(),
        start: start
    });
    var rotate = ol.animation.rotate({
        duration: duration,
        rotation: -4 * Math.PI,
        start: start
    });
    map.beforeRender(pan, bounce, rotate);
    view.setCenter(dest);
}


var draw; // global so we can remove it later
function singleLayerDrawQuery() {
    map.unByKey(clickListener);//画的时候将点击监听取消
    map.removeInteraction(draw);
    draw=null;
    vectorSource.clear();//清除
    //var iter = layer.getFeatures().values();
    //while (!(entry = iter.next()).done) {
    //    layer.removeFeature(entry.value);
    //}
    //var value = typeSelect.value;
    var value="Polygon";
    draw = new ol.interaction.Draw({
        source: vectorSource,
        type: /** @type {ol.geom.GeometryType} */ value
        //maxPoints: maxPoints
    });
    map.addInteraction(draw);

    draw.on('drawend',function(e){
        clickListener=map.on("click",clickQuery);
        var out= e.feature.getGeometry().o;
        var points=[],len=out.length;
        for(var i=0;i<len/2;i++){
            var p=[out[i*2],out[i*2+1]];
            points.push(p);
        }
       var esriGeometry='{"rings":[[';
        for(var i=0;i<points.length;i++){
            esriGeometry+="["+points[i][0]+","+points[i][1]+"]";
            if(i!=points.length-1){
                esriGeometry+=",";
            }
        }
        esriGeometry+=']],"spatialReference":{"wkid":4326}}';
        map.removeInteraction(draw);
        //{"rings":[[[120.41051441925049,30.10748317779541],[120.43815190093994,30.123619347229003],[120.45531803863526,30.107654839172362],[120.45154148834229,30.08619716705322],[120.44845158355713,30.062164574279784],[120.40399128692627,30.06250789703369],[120.41051441925049,30.10748317779541]]],"spatialReference":{"wkid":4326}}
        $.ajax('http://172.18.13.146/proxy/proxy.ashx?http://172.18.13.146:8399/arcgis/rest/services/trip_taxi/MapServer/0/query?text=', {
            type: 'GET',
            dataType: "json",
            data: {
                "geometry":esriGeometry,
                "geometryType":"esriGeometryPolygon",
                "inSR":4326,
                "spatialRel":"esriSpatialRelIntersects",
                "where":"1=1",
                "returnGeometry":"true",
                "outSR":4326,
                "outFields":"*",
                "f":"pjson"
            }
        }).done(function(resp){
            alert("查询到"+resp.features.length+"个出租车");
        }).fail(function () {
            alert("fail loading layer!!!")
        });// ajax end
    });// draw on end
}// function singleLayerDrawQuery end

var pointclass = {
    "出租车": {lid: 1,name: "PLA_NO"},
    "地铁站": {lid: 3,name: "SNAME"}
};

function queryById(id){
    var ids = id.split("[");
    var idn = ids[1].substring(0,ids[1].length-1);

    //http://172.18.13.146:8399/arcgis/rest/services/trip_taxi/MapServer/0/query?text=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=RUN_ID%3D%27%E6%B5%99ATB9862%27&time=&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=&f=pjson
    $.ajax('http://172.18.13.146/proxy/proxy.ashx?http://172.18.13.146:8399/arcgis/rest/services/trip_device/MapServer/'+pointclass[idn].lid+'/query?text=', {
        type: 'GET',
        dataType: "json",
        data: {
            "geometryType":"esriGeometryEnvelope",
            "inSR":4326,
            "spatialRel":"esriSpatialRelIntersects",
            "where":pointclass[idn].name+"='"+ids[0]+"'",
            "returnGeometry":"true",
            "outSR":4326,
            "outFields":"*",
            "f":"pjson"
        }
    }).done(function(resp){
        //定位
        console.log(resp);
        var geom=resp.features[0].geometry;
        /*  原始平移 无任何效果
       var point=new ol.geom.Point([geom.x,geom.y]);
        var size =  map.getSize();// @type {ol.Size}
       view.fit(point, size, {padding: [0, 0, 0, 0], minResolution: 0.000171661376953125/9});
        */

        //缓动平移
        content.innerHTML = '<p>You clicked here:</p>';
        overlay.setPosition([geom.x,geom.y]);
        panTo([geom.x,geom.y]);
        //view.fit(point, size);
        //view.centerOn(point.getCoordinates(), size, [570, 500]);
        //map.getView().getResolution();
    }).fail(function () {
        alert("fail loading layer!!!")
    });// ajax end
}


function layersDrawQuery(){
    map.unByKey(clickListener);//画的时候将点击监听取消
    vectorSource.clear();//清除
    var value="Polygon";
    map.removeInteraction(draw);
    draw=null;
    draw = new ol.interaction.Draw({
        source: vectorSource,
        type: /** @type {ol.geom.GeometryType} */ value
        // geometryFunction: geometryFunction,
        //maxPoints: 3 最多能画几个点
    });
    map.addInteraction(draw);

    draw.on('drawend',function(e){
        clickListener=map.on("click",clickQuery);
        var out= e.feature.getGeometry().o;
        var points=[],len=out.length;
        for(var i=0;i<len/2;i++){
            var p=[out[i*2],out[i*2+1]];
            points.push(p);
        }
        console.log(points);
        var esriGeometry='{"rings":[[';
        for(var i=0;i<points.length;i++){
            esriGeometry+="["+points[i][0]+","+points[i][1]+"]";
            if(i!=points.length-1){
                esriGeometry+=",";
            }
        }
        esriGeometry+=']],"spatialReference":{"wkid":4326}}';
        //alert(esriGeometry);
        map.removeInteraction(draw);
        var nowExtent=map.getView().calculateExtent(map.getSize());
        var size=map.getSize();
        size.push(96);
        var display=size.join(",");
        $.ajax('http://172.18.13.146/proxy/proxy.ashx?http://172.18.13.146:8399/arcgis/rest/services/trip_device/MapServer/identify?tolerance=3', {
            type: 'GET',
            dataType: "json",
            data: {
                "mapExtent":nowExtent.join(","),
                "geometry":esriGeometry,
                "geometryType":"esriGeometryPolygon",
                "sr":4326,
                "imageDisplay":display,
                //"spatialRel":"esriSpatialRelIntersects",
                "layers":"LAYER_OPTION_ALL:0",
                "returnGeometry":"true",
                "f":"pjson"
            }
        }).done(function(resp){
            console.log(resp);
            alert("多图层查询到"+resp.results.length+"个出租车");
        }).fail(function () {
            alert("fail loading layer!!!")
        });// ajax end
    });// draw on end

}// function layersDrawQuery end


//function drawSave(){
//    map.unByKey(clickListener);//画的时候将点击监听取消
//    var value="Polygon"
//    map.removeInteraction(draw);
//    draw=null;
//    draw = new ol.interaction.Draw({
//        source: vectorSource,
//        type: /** @type {ol.geom.GeometryType} */ value
//        // geometryFunction: geometryFunction,
//        //maxPoints: 3 最多能画几个点
//    });
//    map.addInteraction(draw);
//
//    draw.on('drawend',function(e) {
//        clickListener=map.on("click",clickQuery);
//        var out = e.feature.getGeometry().o;
//        var points = [], len = out.length;
//        for (var i = 0; i < len / 2; i++) {
//            var p = [out[i * 2], out[i * 2 + 1]];
//            points.push(p);
//        }
//        var esriGeometry = '[[';
//        for (var i = 0; i < points.length; i++) {
//            esriGeometry += "[" + points[i][0] + "," + points[i][1] + "]";
//            if (i != points.length - 1) {
//                esriGeometry += ",";
//            }
//        }
//        esriGeometry += ']]';
//        map.removeInteraction(draw);
//        alert(esriGeometry);
//    });
//}

var testJson=[[[120.10236740112306,30.253257751464844],[120.10459899902345,30.23214340209961],[120.08348464965822,30.226306915283203],[120.08554458618165,30.250167846679688]]];
function addPolygonByJson(){
    //vectorSource.clear();//全部清除
    var last=vectorSource.getFeatureById("jsontest");
    if(last){
        vectorSource.removeFeature(a);
    }
    var jsonPolygon = new ol.geom.Polygon( testJson);
    var polygonFeature = new ol.Feature({
        name: "jsonPolygon",
        geometry: jsonPolygon
        //"id":"jsontest"
    });
    polygonFeature.setId("jsontest");
    vectorSource.addFeature( polygonFeature );
}


function addheatLayer(){
    //if (ol.Map.prototype.getLayer === undefined) {
    //    ol.Map.prototype.getLayer = function (id) {
    //        var layer;
    //        this.getLayers().forEach(function (lyr) {
    //            if (id == lyr.get('id')) {
    //                layer = lyr;
    //            }
    //        });
    //        return layer;
    //    }
    //}
    var ifHeatLayerAdded=false
    map.getLayers().forEach(function(lyr){
        if(lyr.get('id')=="myheatLayer"){ifHeatLayerAdded=true}
    })

    if(ifHeatLayerAdded){
        alert("已经加载过该图层了");
    }else{
        map.addLayer(heatLayer);
    }
}

function removeHeatLayer(){
    map.getLayers().forEach(function(lyr){
        if(lyr.get('id')=="myheatLayer"){
            map.removeLayer(lyr);
        }
    });
}

function addClusterLayer(){
    var ifClusterLayerAdded=false
    map.getLayers().forEach(function(lyr){
        if(lyr.get('id')=="myClusterLayer"){ifClusterLayerAdded=true}
    })

    if(ifClusterLayerAdded){
        alert("已经加载过该图层了");
    }else{
        map.addLayer(clusterLayer);
    }
}

function removeClusterLayer(){
    map.getLayers().forEach(function(lyr){
        if(lyr.get('id')=="myClusterLayer"){
            map.removeLayer(lyr);
        }
    });
}


function removeDataLayer(){
    map.getLayers().forEach(function(lyr){
        if(lyr.get('id')=="dataLayer"){
            map.removeLayer(lyr);
        }
    });
}


function switchBaseLayer(){
    blackTileLayer.setVisible(false);
    blueTileLayer.setVisible(true);
}


function dataLayerControl(){
    var newsource=new ol.source.TileArcGISRest({
        url: 'http://172.18.13.146:8399/arcgis/rest/services/trip_taxi/MapServer',
        params:{
            layers: [0]
        }
    });
     dataLayer.setSource(newsource);
}

//底图切换
function tic_1(){
    //rotateMap('left');
    blackTileLayer.setVisible(true);
    blueTileLayer.setVisible(false);
}
function tic_2(){
    //rotateMap('left');
    blackTileLayer.setVisible(false);
    blueTileLayer.setVisible(true);
}
function tic_3(){

}



//注册图层控制窗口列表选择事件
$(".check_ico").click(function(){
    //移除热力聚合图层
    removeAllFeatureLayers();

    var check_val = $(this).attr("check_sel");
    //alert(check_val);
    if(check_val == "n"){
        $(this).addClass("check_ico_add").attr("check_sel","y");
    }else if(check_val == "y"){
        $(this).removeClass("check_ico_add").attr("check_sel","n");
    }
    var tc_list = $(".tc_content li").length;
    var index = "";
    //判断是否隐藏热力，聚合按钮的条件值
    var number = 0;
    var num_ber = "";
        for(var i=0;i<tc_list;i++){
        var check_sel_val = $(".tc_content li").eq(i).find(".check_ico").attr("check_sel");
        if(check_sel_val == "y") {
            index = index + $(".tc_content li").eq(i).find(".check_ico").attr("id") + ",";
            number = number + 1;
            num_ber = index;
            num_ber = num_ber.substring(0,index.length-1);
        }
    }
    if( (number == 1&&num_ber=="0")||(number == 1&&num_ber=="1")||(number == 1&&num_ber=="2")||(number == 1&&num_ber=="5")){
        $(".b_btn").show();
        $("#number").val(num_ber);
    }else{
        $("#number").val("");
        $(".b_btn").hide();

    }
    index = index.substring(0,index.length-1);

    if(!index){
        index = 1;
    }

    //alert(index);
    var newsource=new ol.source.TileArcGISRest({
        url: 'http://172.18.13.146:8399/arcgis/rest/services/trip_device/MapServer',
        params:{
            layers: index
        }
    });

    dataLayer.setSource(newsource);
    map.addLayer(dataLayer);

})


//地图放大缩小
function ZoomInandOut(id){
    if(id == "1"){
        view.setZoom(view.getZoom()+1);
    }else if(id == "0"){
        view.setZoom(view.getZoom()-1);
    }

}


//去除所有图层
function removeAllFeatureLayers(){
    map.removeLayer(heatLayer);
    map.removeLayer(dataLayer);
    map.removeLayer(clusterLayer);
}


//点击加载热力图
function add_heatLayer(){

    removeAllFeatureLayers();

    var number = $("#number").val();
    var url =  'http://172.18.13.146/proxy/proxy.ashx?http://172.18.13.146:8399/arcgis/rest/services/trip_device/MapServer/'+number+'/query?text=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=1%3D1&time=&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=&f=pjson'

    heatLayer = new ol.layer.Heatmap({
        source: new ol.source.Vector({
            url:url,
            format: new ol.format.EsriJSON({
                //extractStyles: false
            })
        }),
        blur: 15,//parseInt(blur.value, 10),
        radius: 5//parseInt(radius.value, 10)
    });

    heatLayer.set("id","heatLayer");

    map.addLayer(heatLayer);

}

//加载聚合图
function add_ClusterLayer(){

    removeAllFeatureLayers();

    var number = $("#number").val();
    var url = 'http://172.18.13.146/proxy/proxy.ashx?http://172.18.13.146:8399/arcgis/rest/services/trip_device/MapServer/'+number+'/query?text=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=1%3D1&time=&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=&f=pjson';
    clusterLayer = new ol.layer.Vector({
        source: new ol.source.Cluster({
            distance: 100,
            source: new ol.source.Vector({
                url:url,
                format: new ol.format.EsriJSON({})
            })
        })
        ,
        style: styleFunction
    });
    clusterLayer.set("id","clusterLayer");
    map.addLayer(clusterLayer);
}


//点击加载散点图
function add_dataLayer(){

    removeAllFeatureLayers();

    var number = $("#number").val();
    var newsource = new ol.source.TileArcGISRest({
        url: 'http://172.18.13.146:8399/arcgis/rest/services/trip_device/MapServer',
        params:{
            layers: number
        }
    });

    dataLayer.setSource(newsource);
    map.addLayer(dataLayer);
}