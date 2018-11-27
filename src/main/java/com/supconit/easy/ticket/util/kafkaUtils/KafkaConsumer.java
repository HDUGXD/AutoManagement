package com.supconit.easy.ticket.util.kafkaUtils;

import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

/**
 * Created by thinkpad on 2018/11/26.
 */
@Component
@EnableKafka
public class KafkaConsumer {

    @KafkaListener(id = "test1", topics="kafka_air", containerFactory="kafkaListenerContainerFactory1")
    public void processMessage(String content) throws InterruptedException {
        System.out.println("收到消息 1=>****************&&&&&&&********************" + content);
    }

    @KafkaListener(id = "test2", topics="kafka_air", containerFactory="kafkaListenerContainerFactory2")
    public void processMessage1(String content) throws InterruptedException {
      System.out.println("收到消息 2=>****************&&&&&&&********************" + content);
    }


}
