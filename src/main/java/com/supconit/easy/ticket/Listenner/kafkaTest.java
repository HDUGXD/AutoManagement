package com.supconit.easy.ticket.Listenner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * Created by thinkpad on 2018/11/26.
 */
@Component
public class kafkaTest {
    @Autowired
    private KafkaTemplate kafkaTemplate2;
    int num=1;
    @Scheduled(cron = "0/1 * * * * ? ")
    public void kafkaSendMeg(){

        kafkaTemplate2.send("kafka_air","65f5f5f55v6s5d5vs5d5vs5dv5s6dv5s65dvsd65sd8s7dvsd76v7s");
        String s="1234";
        System.out.println(s);
         num++;
    }
}
