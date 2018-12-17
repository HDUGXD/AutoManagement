package com.kdmt.gxd.easy.util.rabbitMq;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;

/**
 * Created by thinkpad on 2018/12/11.
 */
public class Consumor2 implements ChannelAwareMessageListener {
    /**
     *
     * @param message  消息实体
     * @param channel  当前通道
     * @throws Exception
     */

    @Override
    public void onMessage(Message message, Channel channel) throws Exception {
        String msg=  new String (message.getBody(),"utf-8");
        //消息的标识，false只确认当前一个消息收到，true确认所有consumer获得的消息
        /*channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);*/
        //ack返回false，并重新回到队列，api里面解释得很清楚
        /*channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true);*/
        //true拒绝消息  false确认接受到消息
        channel.basicReject(message.getMessageProperties().getDeliveryTag(), false);
        System.out.println("消费者2号消费掉了:"+msg+"------->>>>>");

    }
}
