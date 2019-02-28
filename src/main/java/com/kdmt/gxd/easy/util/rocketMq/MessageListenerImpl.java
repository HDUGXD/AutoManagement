//package com.kdmt.gxd.easy.util.rocketMq;
//
//import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
//import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
//import com.alibaba.rocketmq.client.consumer.listener.MessageListenerConcurrently;
//import com.alibaba.rocketmq.common.message.MessageExt;
//import org.apache.commons.logging.Log;
//
//import java.util.List;
//
///**
// * Created by thinkpad on 2019/1/7.
// */
//public class MessageListenerImpl implements MessageListenerConcurrently {
//
//    @Override
//    public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs, ConsumeConcurrentlyContext context) {
//        for (MessageExt msg : msgs) {
//            try {
//                System.out.println(">>>>" + new String(msg.getBody(), "GBK"));
//            } catch (Exception e) {
//                e.printStackTrace();
//                //RECONSUME_LATER表示消费失败，稍后重新消费
//                return ConsumeConcurrentlyStatus.RECONSUME_LATER;
//            }
//        }
//        System.out.println(ConsumeConcurrentlyStatus.CONSUME_SUCCESS);
//        // 如果没有异常会认为都成功消费
//        return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
//
//
//    }
//}
