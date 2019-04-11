package com.kdmt.gxd.easy.util.rocketMq;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kdmt.gxd.easy.util.cxf.StaticElement;
import com.kdmt.gxd.easy.vehicle.entities.Vehicle;
import com.kdmt.gxd.easy.webservice.services.TestClass;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.exception.MQBrokerException;
import org.apache.rocketmq.client.exception.MQClientException;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.remoting.common.RemotingHelper;
import org.apache.rocketmq.remoting.exception.RemotingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by thinkpad on 2019/1/7.
 */
@Controller
public class UserControllerTest {
    @Autowired
    @Qualifier("rocketMQProducer")
    private RocketMQProducer producer;
    @Resource
    private MongoTemplate mongoTemplate;
    int s=0;
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test() throws MQClientException, RemotingException, MQBrokerException, InterruptedException {
        for (int i = 0; i < 1000; i++) {
            Message msg = new Message("TestTopic1", "*", (i + "浙C123VDspring温州").getBytes());
            SendResult result = producer.getDefaultMQProducer().send(msg);
//            System.out.println(result);
            s=i;
        }

//            new Message("TopicTestOrdered", "12", "KEY",
//                    ("Hello RocketMQ ").getBytes(RemotingHelper.DEFAULT_CHARSET));
//



//        ************************************************************
        try {
            //图片存储到本地
            //(1)转换json
            Vehicle vehicle = JSONObject.parseObject(StaticElement.testJson,Vehicle.class);//将string转为jsonobject
            JSONArray imgMsgArr=JSONArray.parseArray(vehicle.getSubImageList());
            String imgBase64_a=(String) imgMsgArr.getJSONObject(0).get("data");
            String imgBase64_b=(String) imgMsgArr.getJSONObject(1).get("data");
            //取得图片id
            String imgBase64_a_id=(String) imgMsgArr.getJSONObject(0).get("imageID");
            String imgBase64_b_id=(String) imgMsgArr.getJSONObject(1).get("imageID");

//            //（2）base64转图片
//            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd_HH");    //  20181031_16
////            SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd_HHmmss");
//            //（2.1）图片存放文件夹
//            String toDir = "/mnt/data/tollgate/wz_bayonet/" + sdf.format(vehicle.getPassTime());
//            File toFile = new File(toDir);
//            //判断文件夹是否存在,如果不存在则创建文件夹
//            StaticElement.createDir(toFile, toDir);
//
//            //（2.2）图片名称   图片id
//
////            String picName = StaticElement.getPicNameMill(sdf2.format(vehicle.getPassTime()));
//            //图片存储路径
//            String firstPicDir = toDir + "/" +imgBase64_a_id + "fir.png";
//            String secondPicDir = toDir+ "/" +imgBase64_b_id + "sec.png";
//            //BASE64转图片保存到目标路径下
//            StaticElement.Base64ToImage(imgBase64_a, firstPicDir);
//            StaticElement.Base64ToImage(imgBase64_b, secondPicDir);
            /**
             * 3入库mongodb
             */
            //3.1封装过车对象
//            vehicle.setStorageUrl1(firstPicDir);
//            vehicle.setStorageUrl2(secondPicDir);
            //3.2清空base64，太占空间
            vehicle.setSubImageList("");
            //入库mongodb
//            mongoTemplate.save(vehicle);
            TestClass.amqpTemplate.convertAndSend("test_match", "testkey", StaticElement.testJson);
        } catch (Exception e) {
            e.printStackTrace();
            //RECONSUME_LATER表示消费失败，稍后重新消费

        }

        return null;
    }
}
