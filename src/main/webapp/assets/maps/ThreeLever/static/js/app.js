//地图容器
// function mapRun(src,date) {
var chart = echarts.init(document.getElementById('main'));
//34个省、市、自治区的名字拼音映射数组
var provinces = {
    //23个省
    "台湾": "taiwan",
    "河北": "hebei",
    "山西": "shanxi",
    "辽宁": "liaoning",
    "吉林": "jilin",
    "黑龙江": "heilongjiang",
    "江苏": "jiangsu",
    "浙江": "zhejiang",
    "安徽": "anhui",
    "福建": "fujian",
    "江西": "jiangxi",
    "山东": "shandong",
    "河南": "henan",
    "湖北": "hubei",
    "湖南": "hunan",
    "广东": "guangdong",
    "海南": "hainan",
    "四川": "sichuan",
    "贵州": "guizhou",
    "云南": "yunnan",
    "陕西": "shanxi1",
    "甘肃": "gansu",
    "青海": "qinghai",
    //5个自治区
    "新疆": "xinjiang",
    "广西": "guangxi",
    "内蒙古": "neimenggu",
    "宁夏": "ningxia",
    "西藏": "xizang",
    //4个直辖市
    "北京": "beijing",
    "天津": "tianjin",
    "上海": "shanghai",
    "重庆": "chongqing",
    //2个特别行政区
    "香港": "xianggang",
    "澳门": "aomen"
};

//直辖市和特别行政区-只有二级地图，没有三级地图
var special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
var mapdata = [];
// //绘制全国地图
// $.getJSON('/ETFTP/assets/maps/ThreeLever/static/map/china.json', function(data){
//
// 	d = [];
// 	for( var i=0;i<data.features.length;i++ ){
//
// 		d.push({
// 			name:data.features[i].properties.name
//
// 		})
// 	}
// 	mapdata = d;
// 	//注册地图
// 	echarts.registerMap('china', data);
// 	//绘制地图
// 	renderMap('china',d);
// });
//
// //地图点击事件
// chart.on('click', function (params) {
//
// 	console.log( params );
// 	if( params.name in provinces ){
// 		//如果点击的是34个省、市、自治区，绘制选中地区的二级地图
// 		$.getJSON('/ETFTP/assets/maps/ThreeLever/static/map/province/'+ provinces[params.name] +'.json', function(data){
// 			echarts.registerMap( params.name, data);
// 			var d = [];
// 			for( var i=0;i<data.features.length;i++ ){
// 				d.push({
// 					name:data.features[i].properties.name
// 				})
// 			}
// 			renderMap(params.name,d);
// 		});
// 	}else if( params.seriesName in provinces ){
// 		//如果是【直辖市/特别行政区】只有二级下钻
// 		if(  special.indexOf( params.seriesName ) >=0  ){
// 			renderMap('china',mapdata);
// 		}else{
//
// 			//显示县级地图
// 			$.getJSON('/ETFTP/assets/maps/ThreeLever/static/map/city/'+ cityMap[params.name] +'.json', function(data){
// 				echarts.registerMap( params.name, data);
// 				var d = [];
// 				for( var i=0;i<data.features.length;i++ ){
// 					d.push({
// 						name:data.features[i].properties.name,
// 					})
// 				}
//
// 				renderMap(params.name,d);
// 			});
// 		}
// 	}else{
// 		renderMap('china',mapdata);
// 	}
// });
// 经纬度
var geoCoordMap = {};
var max = 480,
    min = 9; // todo
var maxSize4Pin = 50,
    minSize4Pin = 20;
var wz_code = "330300";
var wz_name = "温州市";
$.getJSON('/ETFTP/assets/maps/ThreeLever/static/map/city/' + wz_code + '.json', function (data) {
    echarts.registerMap(wz_name, data);    //cityMap[params.name]
    var d = [];
    //各个区县数据

    // //ajax获得车辆数目
    // $.ajax({
    //     type: "POST",//方法类型
    //     //dataType: "text",//预期服务器返回的数据类型
    //     url: src + "/bayonet/getWzMap?date=" + date,//url
    //     success: function (result) {
    //
    //     }
    // });

    for (var i = 0; i < data.features.length; i++) {


        //经纬度
        var jwd=data.features[0].geometry.coordinates[0][0][40];
        alert(jwd)

        geoCoordMap[data.features[i].properties.name]=jwd;

        d.push({
            name: data.features[i].properties.name,
            value: Math.round(Math.random() * 100 + 10)

        })
    }

    renderMap(wz_name, d);
});

//初始化绘制全国地图配置
var option = {
    backgroundColor: '#000',
    title: {
        text: '中国地图',
        subtext: '省市区三级下钻',
        link: 'http://www.ldsun.com',
        left: 'center',
        textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: "Microsoft YaHei"
        },
        subtextStyle: {
            color: '#ccc',
            fontSize: 13,
            fontWeight: 'normal',
            fontFamily: "Microsoft YaHei"
        }
    },
    tooltip: {
        trigger: 'item',
        // formatter: '{b}'
        // formatter: "{b}  <br/>{c}辆"
        formatter: "{b}  :  {c}辆"
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        },
        iconStyle: {
            normal: {
                color: '#fff'
            }
        }
    },
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    animationDurationUpdate: 1000

};
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
       debugger;
        //经纬度
        var geoCoord = geoCoordMap[data[i].name];

        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
};
function renderMap(map, data) {
    option.title.subtext = map;
    option.series = [
        {
            name: map,
            type: 'map',
            mapType: map,
            roam: false,
            nameMap: {
                'china': '中国'
            },
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#999',
                        fontSize: 13
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 13
                    }
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: 'dodgerblue'
                },
                emphasis: {
                    areaColor: 'darkorange'
                }
            },
            data: data
        },{
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function (val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a * min;
                // b = maxSize4Pin - a * max;
                return a * val[2] + b;
            },
            label: {

                normal: {
                    show: false,
                    formatter: function (params) {
                        return params.data.value[2]
                    },
                    textStyle: {
                        color: '#fff',
                        fontSize: 9,
                    }
                }
            },
            itemStyle: {

                normal: {
                    color: 'rgba(255,255,0,0)', //标志颜色
                }
            },
            zlevel: 6,
            data: convertData(data),
        }
    ];
    //渲染地图

    chart.setOption(option);
}
// }