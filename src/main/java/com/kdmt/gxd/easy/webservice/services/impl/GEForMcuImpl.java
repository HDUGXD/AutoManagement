package com.kdmt.gxd.easy.webservice.services.impl;

import com.alibaba.druid.support.json.JSONUtils;
import com.kdmt.gxd.easy.bayonet.services.IBayonetService;
import com.kdmt.gxd.easy.util.cxf.StaticElement;
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
        //封装参数
        Map<String,Object> map = new HashMap<>();
        // TODO Auto-generated method stub
        System.out.println("start***************************************************************************************************");
        System.out.println("aaaaaaaaaaaaaaaaaaaa"+deviceId+"$$$$$"+passportName+"日期:"+passtime);

        Date nowTime = StaticElement.changePasstime(passtime);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HH");    //  20181031_16
        SimpleDateFormat sdf2= new SimpleDateFormat("mmss_SSS");       //  2554_764

        //图片存放文件夹
        String toDir = "/mnt/data/tollgate/wz_bayonet/" + sdf.format(nowTime);
        map.put("toDir",toDir);
        //图片名称
        String mill = StaticElement.getPicNameMill(passtime);

        //全局变量
        //图片存储路径
        String firstPicDir = toDir+"/"+mill+"fir.png";
        String secondPicDir = toDir+"/"+mill+"sec.png";
        String reservePicDir = toDir+"/"+mill+"res.png";


        map.put("deviceId", deviceId);
        map.put("agencyId", agencyId);  //330301 02
        map.put("agencyKey", agencyKey);
        map.put("passportName", passportName);
        map.put("directionName", directionName);
        map.put("wayId", wayId);
        map.put("wayName", wayName);
        //日期
    	map.put("passtime", passtime); //20181102110731.098
        map.put("plateNumber", plateNumber);
        map.put("plateColor", plateColor);
        map.put("plateType", plateType);
        map.put("carType", carType);
        map.put("carLogo", carLogo);
        map.put("carColor", carColor);
        map.put("carLength", carLength);
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
                    map.put("firstPicPath", firstPicDir);
                    map.put("firstPic", encodeBase64String1);
                    System.out.println("**************firstPic  base64 code ok!!!!***************************** ");

                }else{
                    System.out.println("**************error firstPic  base64 !!!!***************************** ");
                }

            } catch (IOException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
        }

        if(secondPic!=null){
            byte[] readBytesFromStream2;
            try {
                readBytesFromStream2 = IOUtils.readBytesFromStream(secondPic.getInputStream());
                String encodeBase64String2 = Base64.encodeBase64String(readBytesFromStream2);
                if(encodeBase64String2.length()>100){

                    //存图片
                    map.put("secondPicPath", secondPicDir);
                    map.put("secondPic", encodeBase64String2);
                    System.out.println("**************secondPic  base64 code ok!!!!***************************** ");
                }else{
                    System.out.println("************** error  secondPic  base64 !!!!***************************** ");
                }

            } catch (IOException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
        }
//			//
        if(reservePic!=null){
            byte[] readBytesFromStream3;
            try {
                readBytesFromStream3 = IOUtils.readBytesFromStream(reservePic.getInputStream());
                String encodeBase64String3 = Base64.encodeBase64String(readBytesFromStream3);
                if(encodeBase64String3.length()>100){

                    map.put("secondPicPath", reservePicDir);
                    map.put("secondPic", encodeBase64String3);
                }else{
                    System.out.println("************** error reservePic  base64 !!!!***************************** ");
                }
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
        }
        map.put("carNoConfide",carNoConfide );
        map.put("carRect", carRect);
        map.put("bz1", bz1);
        map.put("bz2", bz2);

        //kafka/rabbitMQ消息中间件缓存数据
            /**
             * quenen的名称
             * 匹配规则 binding
             */
        //转换为json
        try{

            String str= JSONUtils.toJSONString(map);
            //存到消息中间件
//            TestClass.amqpTemplate.convertAndSend("test_match", "testkey", str);
        }
        catch (Exception e){
            System.out.println("！！！！！！！！！！！！！！！接入数据添加到消息中间件时候报异常！！！！！！！！！！！！！！！！！！！！");
        }


        return "000";
    }
}
