package com.kdmt.gxd.easy.util.rocketMq;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kdmt.gxd.easy.util.cxf.StaticElement;
import com.kdmt.gxd.easy.util.util.StringUtil;
import com.kdmt.gxd.easy.vehicle.entities.Vehicle;
import com.kdmt.gxd.easy.webservice.services.TestClass;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.common.message.MessageExt;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by thinkpad on 2019/1/7.
 */
public class MessageListenerImpl extends Thread implements MessageListenerConcurrently {
    @Resource
    private MongoTemplate mongoTemplate;

    @Override
    public ConsumeConcurrentlyStatus consumeMessage (List<MessageExt> msgs, ConsumeConcurrentlyContext context)  {
        for (MessageExt msg : msgs) {

            try {

                System.out.println("*********############********----123数据接入进来了123----------*******###################***********");
                String Verchel_Str=new String(msg.getBody(), "UTF-8");

                //图片存储到本地
                //(1)转换json
                Vehicle vehicle = JSONObject.parseObject(Verchel_Str,Vehicle.class);//将string转为jsonobject
                JSONArray imgMsgArr=JSONArray.parseArray(vehicle.getSubImageList());
                String imgBase64_a=(String) imgMsgArr.getJSONObject(0).get("data");
                String imgBase64_b=(String) imgMsgArr.getJSONObject(1).get("data");
                //取得图片id
                String imgBase64_a_id=(String) imgMsgArr.getJSONObject(0).get("imageID");
                String imgBase64_b_id=(String) imgMsgArr.getJSONObject(1).get("imageID");

                //（2）base64转图片
                SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HH");    //  20181031_16
                //（2.1）图片存放文件夹
                String temp=sdf.format(vehicle.getPassTime());
//                String toDir = "/mnt/data/tollgate/wz_bayonet/" + temp;
//                ***********************  防止挂载原因，不用mnt用usr  ****************
//                ***********************                           ***************
                String toDir = "/usr/data/tollgate/wz_bayonet/" + temp;
                File toFile = new File(toDir);
                //判断文件夹是否存在,如果不存在则创建文件夹
                StaticElement.createDir(toFile, toDir);

                //（2.2）图片名称 = 图片id
                //图片存储路径
                String firstPicDir = toDir + "/" +imgBase64_a_id + "fir.png";
                String secondPicDir = toDir+ "/" +imgBase64_b_id + "sec.png";
                /**
                 * 弃用FTP改tomcat 图片相对路径
                 */
                String tomcatUrl1 = "/"+temp+"/" +imgBase64_a_id + "fir.png";
                String tomcatUrl2 = "/"+temp+"/" +imgBase64_b_id + "fir.png";

                //BASE64转图片保存到目标路径下
                StaticElement.Base64ToImage(imgBase64_a, firstPicDir);
                StaticElement.Base64ToImage(imgBase64_b, secondPicDir);
                /**
                 * 3入库mongodb
                 */
                //3.1封装过车对象
//                vehicle.setStorageUrl1(firstPicDir);
//                vehicle.setStorageUrl2(secondPicDir);

                /**
                 * 弃用FTP改tomcat 设置路径
                 */
                vehicle.setStorageUrl1(tomcatUrl1);
                vehicle.setStorageUrl2(tomcatUrl2);

                vehicle.setPageNo("");
                vehicle.setPageSize("");
                SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd_HH");
                String [] timeStrArr = sdf2.format(vehicle.getPassTime()).split("_");
                vehicle.setCountDay(timeStrArr[0]);
                vehicle.setCountHour(timeStrArr[1]);
                vehicle.setCountMonth("");

                vehicle.setQyCode(vehicle.getMotorVehicleid().substring(0,6));
                vehicle.setGsCode("");


                //3.2清空base64，太占空间
                vehicle.setSubImageList("");
                //入库mongodb
                mongoTemplate.save(vehicle);
//                Vehicle vehicle2019_03_19 = new Vehicle();
//                vehicle2019_03_19.setCountDay(vehicle.getCountDay());
//                vehicle2019_03_19.setStorageUrl1(vehicle.getStorageUrl1());
//                vehicle2019_03_19.setStorageUrl2(vehicle.getStorageUrl2());
//                mongoTemplate.save(vehicle2019_03_19);

//                Date date2 = new Date();
//                String x = String.valueOf(date2.getTime()-date1.getTime());
//                System.out.println("==============---"+vehicle.getPassTime()+"---===================");
                /**
                 * 转发rabbitMQ
                 */
//                TestClass.amqpTemplate.convertAndSend("test_match", "testkey", Verchel_Str);

            } catch (Exception e) {
                e.printStackTrace();
                //RECONSUME_LATER表示消费失败，稍后重新消费
//                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
            }
        }
//        System.out.println(ConsumeConcurrentlyStatus.CONSUME_SUCCESS);
        // 如果没有异常会认为都成功消费
        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;


    }

}
