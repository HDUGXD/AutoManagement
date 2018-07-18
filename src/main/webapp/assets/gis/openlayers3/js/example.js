//********** EXAMPLE START ********** //

//---------动画效果 START-------

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

//---------动画效果 END-------



//-----------热力 START---------
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
//-----------热力 END---------


//-----------聚合  START------
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
//-----------聚合  END------


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

function panzoomTo(dest,level,offset){
    level = level-3;
    var start = +new Date();
    var pan = ol.animation.pan({
        duration: 1000,
        source: view.getCenter(),
        start: start
    });
    var zoom = ol.animation.zoom({
        duration: 2000,
        resolution: view.getResolution(),
        start: start
    });
    if(offset == null || offset == "undefined"){
        offset = 0;
    } else {
        if(level == 11) {
            offset = 0.03;
        } else if(level == 12) {
            offset = 0.025;
        } else if(level == 13) {
            offset = 0.02;
        } else if(level == 14) {
            offset = 0.015;
        } else if(level == 15) {
            offset = 0.01;
        } else if(level == 16) {
            offset = 0.005;
        } else if(level == 17) {
            offset = 0.0025;
        } else if(level == 18) {
            offset = 0.001;
        } else if(level == 19) {
            offset = 0.0005;
        } else if(level == 20) {
            offset = 0.00025;
        }
    }
    map.beforeRender(pan, zoom, pan);
    view.setCenter(dest);
    view.setZoom(level);
    view.setCenter(offsetPoint(dest,offset));

}


//使点产生偏移 - 向左上角偏移
function offsetPoint(dest,offset) {
    //产生偏移
    dest[0] = dest[0] + offset;
    dest[1] = dest[1] - offset;

    return dest;
}

function zoomTo(f){
    var start = +new Date();
    var zoom = ol.animation.zoom({
        duration: 1000,
        resolution: view.getResolution(),
        start: start
    });
    map.beforeRender(zoom);
    if(f == "1"){
        view.setZoom(view.getZoom()+1);
    }else if(f == "0"){
        view.setZoom(view.getZoom()-1);
    }
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
        resolution: 0.00010728836059570312,
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

//画图
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


//按ID查询定位-冒泡
function queryById(run_id){
    //http://172.18.13.146:8399/arcgis/rest/services/trip_taxi/MapServer/0/query?text=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=RUN_ID%3D%27%E6%B5%99ATB9862%27&time=&returnIdsOnly=false&returnGeometry=true&maxAllowableOffset=&outSR=&outFields=&f=pjson
    $.ajax('http://172.18.13.146/proxy/proxy.ashx?http://172.18.13.146:8399/arcgis/rest/services/trip_taxi/MapServer/0/query?text=', {
        type: 'GET',
        dataType: "json",
        data: {
            "geometryType":"esriGeometryEnvelope",
            "inSR":4326,
            "spatialRel":"esriSpatialRelIntersects",
            "where":"RUN_ID='"+run_id+"'",
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
        panTo([geom.x,geom.y]);
        content.innerHTML = '<p>You clicked here:</p>';
        overlay.setPosition([geom.x,geom.y]);
        //view.fit(point, size);
        // view.centerOn(point.getCoordinates(), size, [570, 500]);
//map.getView().getResolution();
    }).fail(function () {
        alert("fail loading layer!!!")
    });// ajax end
}

//
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
        console.log(esriGeometry);
        map.removeInteraction(draw);
        var nowExtent=map.getView().calculateExtent(map.getSize());
        var size=map.getSize();
        size.push(96);
        var display=size.join(",");
        $.ajax('http://172.18.13.146/proxy/proxy.ashx?http://172.18.13.146:8399/arcgis/rest/services/dynamic/MapServer/identify?tolerance=3', {
            type: 'GET',
            dataType: "json",
            data: {
                "mapExtent":nowExtent.join(","),
                "geometry":esriGeometry,
                "geometryType":"esriGeometryPolygon",
                "sr":4326,
                "imageDisplay":display,
                //"spatialRel":"esriSpatialRelIntersects",
                "layers":"LAYER_OPTION_ALL:1",
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


function drawSave(){
    map.unByKey(clickListener);//画的时候将点击监听取消
    map.removeInteraction(draw);
    draw=null;
    draw = new ol.interaction.Draw({
        source: vectorSource,
        type: "Polygon"
//       geometryFunction: geometryFunction
//        maxPoints: 3 最多能画几个点
    });
    map.addInteraction(draw);

    draw.on('drawend',function(e) {
        clickListener=map.on("click",clickQuery);
        var out = e.feature.getGeometry().o;
        console.log(out.length);
        var points = [], len = out.length;
        for (var i = 0; i < len / 2; i++) {
            var p = [out[i * 2], out[i * 2 + 1]];
            points.push(p);
        }
        var esriGeometry = '[[';
        for (var i = 0; i < points.length; i++) {
            esriGeometry += "[" + points[i][0] + "," + points[i][1] + "]";
            if (i != points.length - 1) {
                esriGeometry += ",";
            }
        }
        esriGeometry += ']]';
        map.removeInteraction(draw);
        console.log(esriGeometry);
    });
}

var testJson=[[[120.1414203643799,30.277719497680664],[120.11069297790529,30.280466079711914],[120.11893272399904,30.306730270385742]]];
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


    //增加矢量元素可被选中
    var select = new ol.interaction.Select({});
    map.addInteraction(select);
    var selected_collection = select.getFeatures();
    selected_collection.push(polygonFeature);

    //增加矢量元素点击事件
    map.on("click", function(e) {
            map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
                alert(feature.get("name"));
            });
        });

}






//热力图例子
function addheatLayer(){

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

//去除热力图例子
function removeHeatLayer(){
    map.getLayers().forEach(function(lyr){
        if(lyr.get('id')=="myheatLayer"){
            map.removeLayer(lyr);
        }
    });
}

//聚合图例子
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

//去除聚合图例子
function removeClusterLayer(){
    map.getLayers().forEach(function(lyr){
        if(lyr.get('id')=="myClusterLayer"){
            map.removeLayer(lyr);
        }
    });
}

//去除数据图层例子
function removeDataLayer(){
    map.getLayers().forEach(function(lyr){
        if(lyr.get('id')=="dataLayer"){
            map.removeLayer(lyr);
        }
    });
}

//图层切换例子
function switchBaseLayer(){
    blackTileLayer.setVisible(false);
    blueTileLayer.setVisible(true);
}

//图层控制例子
function dataLayerControl(){
    var newsource=new ol.source.TileArcGISRest({
        url: 'http://172.18.13.146:8399/arcgis/rest/services/trip_taxi/MapServer',
        params:{
            layers: [0]
        }
    });
    dataLayer.setSource(newsource);
}

//加载视频
function showCamera(){
    var cameraLayer = new ol.layer.Tile({
        source: new ol.source.TileArcGISRest({
            url: 'http://172.18.13.146:8399/arcgis/rest/services/camera/MapServer',
            params:{
                layers: 1,//WATERBUS   HIGHWAY4
                layerDefs:"1:CAMERA_TYPE in ('HIGHWAY4','HIGHWAY2')"
            }
        })
    });
    cameraLayer.set("id","dataLayer");
    map.addLayer(cameraLayer);
}
//地图放大缩小例子
function ZoomInandOut(id){
    if(id == "1"){
        view.setZoom(view.getZoom()+1);
    }else if(id == "0"){
        view.setZoom(view.getZoom()-1);
    }
}

function showEchart(stationName,type){
    $(".cz_information").show();
    $(".echart_01").load("http://localhost:8080/ticc/screen/showEchart",{stationName:stationName,type:type});
}

//********** EXAMPLE END ********** //