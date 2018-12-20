package com.kdmt.gxd.easy.webservice.services.impl;

import com.kdmt.gxd.easy.bayonet.services.IBayonetService;
import com.kdmt.gxd.easy.util.cxf.StaticElement;
import com.kdmt.gxd.easy.webservice.services.TestClass;
import com.kdmt.gxd.easy.webservice.services.TracklogSender;
import org.apache.commons.codec.binary.Base64;
import org.apache.cxf.helpers.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.activation.DataHandler;
import javax.annotation.Resource;
import javax.jws.WebService;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.rmi.RemoteException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by guoxiaodong on 2018/12/12.
 */

@WebService(serviceName = "wbUserService" ,endpointInterface = "com.kdmt.gxd.easy.webservice.services.TracklogSender")
public class GEForMcuImpl implements TracklogSender {
//    @Autowired
//    public static IBayonetService bayonetService;

//    @Autowired(required = true)
//    public static AmqpTemplate amqpTemplate;





    @Override
    public String initTrans(String agencyId, String agencyKey) throws RemoteException {
        return "000";
    }

    @Override
    public String closeTrans(String agencyId, String agencyKey) throws RemoteException {
        return "000";
    }

    @Override
    public String writeTracklogData(String deviceId, String agencyId, String agencyKey, String passportName, String directionName, String wayId, String wayName, String passtime, String plateNumber, String plateColor, String plateType, String carType, String carLogo, String carModel, String carColor, String carLength, String firstPicPath, String secondPicPath, String reservePicPath, String speed, String maxLimitSpeed, String minLimitSpeed, String littleArea, DataHandler firstPic, DataHandler secondPic, DataHandler reservePic, String carNoConfide, String carRect, String bz1, String bz2) throws RemoteException {

        // TODO Auto-generated method stub
        System.out.println("start***************************************************************************************************");
        System.out.println("aaaaaaaaaaaaaaaaaaaa"+deviceId+"$$$$$"+passportName+"日期:"+passtime);

        Date nowTime = StaticElement.changePasstime(passtime);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HH");    //  20181031_16
        SimpleDateFormat sdf2= new SimpleDateFormat("mmss_SSS");       //  2554_764

        //图片存放文件夹
        String toDir = "/mnt/data/tollgate/wz_bayonet/" + sdf.format(nowTime);
        //图片名称
        String mill = StaticElement.getPicNameMill(passtime);

        File toFile = new File(toDir);
//        判断文件夹是否存在,如果不存在则创建文件夹
//        if (!toFile.exists()) {
//            System.out.println("当前文件夹不存在,创建了文件夹");
//            toFile.mkdir();
//            toFile.setExecutable(true);
//            toFile.setReadable(true);
//            toFile.setWritable(true);
//
//            String command = "chmod 777 " + toDir;
//            try {
//                Process process = Runtime.getRuntime().exec(command);
//                process.waitFor();
//                int existValue = process.exitValue();
//            } catch (Exception e) {
//                System.out.println("授权问题");
//            }
//        }

        //全局变量
        //图片存储路径
        String firstPicDir = toDir+"/"+mill+"fir.png";
        String secondPicDir = toDir+"/"+mill+"sec.png";
        String reservePicDir = toDir+"/"+mill+"res.png";

        //封装参数

        Map<String,Object> map = new HashMap<>();
        map.put("deviceId", deviceId);
        map.put("agencyId", agencyId);  //330301 02
        //将agencyId 分成行政区号+公司编码 两部分
        String qy_code=null;String gs_code=null;
        if(agencyId!=null){
            qy_code=agencyId.substring(0,6);
            gs_code=agencyId.substring(6,8);
        }else{

        }


        map.put("agencyKey", agencyKey);
        map.put("passportName", passportName);
        map.put("directionName", directionName);
        map.put("wayId", wayId);
        map.put("wayName", wayName);
        //日期

    	map.put("passtime", passtime); //20181102110731.098
//        Timestamp sqlTime = null;


//        sqlTime=new java.sql.Timestamp(nowTime.getTime());

        //统计字段
//        String arr[]=	StaticElement.changePasstimeToYearDay(passtime).split("_");

        map.put("plateNumber", plateNumber);
        map.put("plateColor", plateColor);
        map.put("plateType", plateType);
        map.put("carType", carType);
        map.put("carLogo", carLogo);
        map.put("carColor", carColor);
        map.put("carLength", carLength);
        map.put("firstPicPath", firstPicPath);
        map.put("secondPicPath", secondPicPath);
        map.put("reservePicPath", reservePicPath);
        map.put("speed", speed);
        map.put("maxLimitSpeed", maxLimitSpeed);
        map.put("minLimitSpeed", minLimitSpeed);
        map.put("littleArea", littleArea);
        //图片转换为base64
        if(firstPic!=null){
            byte[] readBytesFromStream1;
            try {
                readBytesFromStream1 = IOUtils.readBytesFromStream(firstPic.getInputStream());
                String encodeBase64String1 = Base64.encodeBase64String(readBytesFromStream1);
                if(encodeBase64String1.length()>100){

                    StaticElement.Base64ToImage(encodeBase64String1, firstPicDir);
                    map.put("firstPicPath", firstPicDir);
                    System.out.println("**************firstPic  base64 code ok!!!!***************************** ");

                }else{
                    System.out.println("**************error firstPic  base64 !!!!***************************** ");
                }
                map.put("firstPic", encodeBase64String1);
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
        }else{
            map.put("firstPic", null);
        }

        if(secondPic!=null){
            byte[] readBytesFromStream2;
            try {
                readBytesFromStream2 = IOUtils.readBytesFromStream(secondPic.getInputStream());
                String encodeBase64String2 = Base64.encodeBase64String(readBytesFromStream2);
                if(encodeBase64String2.length()>100){

                    //存图片

                    StaticElement.Base64ToImage(encodeBase64String2, secondPicDir);
                    map.put("secondPicPath", secondPicDir);
                    System.out.println("**************secondPic  base64 code ok!!!!***************************** ");
                }else{
                    System.out.println("************** error  secondPic  base64 !!!!***************************** ");
                }
                map.put("secondPic", encodeBase64String2);
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
        }else{
            map.put("secondPic", null);
        }
//			//
        if(reservePic!=null){
            byte[] readBytesFromStream3;
            try {
                readBytesFromStream3 = IOUtils.readBytesFromStream(reservePic.getInputStream());
                String encodeBase64String3 = Base64.encodeBase64String(readBytesFromStream3);
                if(encodeBase64String3.length()>100){

                    StaticElement.Base64ToImage(encodeBase64String3, reservePicDir);
                }else{
                    System.out.println("************** error reservePic  base64 !!!!***************************** ");
                }
                map.put("reservePic", encodeBase64String3);
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
        }else{
            map.put("reservePic", null);
        }
        map.put("carNoConfide",carNoConfide );
        map.put("carRect", carRect);
        map.put("bz1", bz1);
        map.put("bz2", bz2);
//    	String url = "http://60.191.115.11:5760//TPT/picture/3/33030000001320000003_20180920101155_00021";
        //since 4.3 不再使用 DefaultHttpClient
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
//        HttpPut httpPut = new HttpPut(url);
//        HttpPut httpPut = new HttpPut("http://122.224.82.76:8089/CuServer/api/test/33030000001320000003_20180920101155_00001");

//        HttpPut httpPut = new HttpPut("http://60.191.115.11:6760//TPT/picture/1/"+StaticElement.getPicId()); //公司测试
        HttpPut httpPut = new HttpPut("http://33.112.9.24:5760//TPT/picture/2/"+StaticElement.getPicId()); //温州专网

        System.out.println(StaticElement.getPicId());
        httpPut.setHeader("Content-Type", "application/JSON");
        //

        try {
            //转换为json
            String str = net.sf.json.JSONObject.fromObject(map).toString();
            httpPut.setEntity(new StringEntity(str, Charset.forName("utf-8")));



            //kafka/rabbitMQ消息中间件缓存数据
            if(str!=null&&!"".equals(str)){
//                Date date = new Date();
//                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//                String ss = msg+"********"+sdf.format(date);
                /**
                 * quenen的名称
                 * 匹配规则 binding
                 */
                System.out.println(TestClass.amqpTemplate );

                TestClass.amqpTemplate.convertAndSend("mq.asdfExChange", "mq.asdf.send", str);
            }else{

                System.out.println("异常：当前数据为null 或“”   ！！！！！！！！！！！！！！！！！！！！");
            }

            //转发rest
            HttpResponse httpResponse = httpClient.execute(httpPut);
            HttpEntity entity = httpResponse.getEntity();
            StatusLine statusLine = httpResponse.getStatusLine();
            int statusCode = statusLine.getStatusCode();
            System.out.println("statusCode:"+statusCode);
            String entityStr = EntityUtils.toString(entity);
            System.out.println("响应返回内容:"+entityStr);




            //数据入库mysql*****************************************************************
//bayonetService.save()






//            String sql="insert into bayonet(device_id,agency_id,agency_key,passport_name,direction_name,way_id,way_name,passtime,plate_number,plate_color,plate_type,car_type,car_logo,car_model,car_color,car_length,first_pic_path,second_pic_path,reserve_pic_path,speed,max_limit_speed,min_limit_speed,little_area,first_pic,second_pic,reserve_pic,car_no_confide,car_rect,bz1,bz2,count_day,count_hour,qy_code,gs_code)"
//                    + "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
//
//            Connection con = DataBaseUtils.getConnection();
//
//            PreparedStatement stpt =  con.prepareStatement(sql);
//            stpt.setString(1, deviceId);stpt.setString(2, agencyId);stpt.setString(3, agencyKey);stpt.setString(4, passportName);stpt.setString(5, directionName);
//            stpt.setString(6, wayId);stpt.setString(7, wayName);stpt.setTimestamp(8, sqlTime);stpt.setString(9, plateNumber);stpt.setString(10, plateColor);
//            stpt.setString(11, plateType);stpt.setString(12, carType );stpt.setString(13, carLogo);stpt.setString(14, carModel );stpt.setString(15, carColor);
//            stpt.setString(16, carLength);stpt.setString(17, firstPicDir );stpt.setString(18, secondPicDir);stpt.setString(19, reservePicDir);stpt.setString(20, speed);
//            stpt.setString(21, maxLimitSpeed);stpt.setString(22, minLimitSpeed);stpt.setString(23, littleArea );stpt.setString(24, firstPicPath);stpt.setString(25, secondPicPath);
//            stpt.setString(26, reservePicPath);stpt.setString(27, carNoConfide );stpt.setString(28, carRect );stpt.setString(29, bz1);stpt.setString(30, bz2);
//            stpt.setString(31, arr[0]);stpt.setString(32, arr[1]);stpt.setString(33, qy_code);stpt.setString(34, gs_code);
//            logger.info("插入开始*********************************");
//            stpt.executeUpdate();
//            con.close();
//            stpt.close();
//            logger.info("插入结束*********************************");
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally{
            try {
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }



        return "000";
    }
}
