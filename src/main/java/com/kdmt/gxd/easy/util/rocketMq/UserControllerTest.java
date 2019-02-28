//package com.kdmt.gxd.easy.util.rocketMq;
//
//import com.alibaba.rocketmq.client.exception.MQBrokerException;
//import com.alibaba.rocketmq.client.exception.MQClientException;
//import com.alibaba.rocketmq.client.producer.SendResult;
//import com.alibaba.rocketmq.common.message.Message;
//import com.alibaba.rocketmq.remoting.exception.RemotingException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//
//import java.util.Date;
//
///**
// * Created by thinkpad on 2019/1/7.
// */
//@Controller
//public class UserControllerTest {
//    @Autowired
//    @Qualifier("rocketMQProducer")
//    private RocketMQProducer producer;
//    int s=0;
//    @RequestMapping(value = "/test", method = RequestMethod.GET)
//    public String test() throws MQClientException, RemotingException, MQBrokerException, InterruptedException {
//        Date date = new Date();
//        for (int i = 0; i < 1000; i++) {
//            Message msg = new Message("TestTopic1", "TAG1", (i + "浙C123VDspring温州").getBytes());
//            SendResult result = producer.getDefaultMQProducer().send(msg);
////            System.out.println(result);
//            s=i;
//        }
//        long a=new Date().getTime()-date.getTime();
//        System.out.println(s+"*************************************"+a);
//
//        return null;
//    }
//
//}
