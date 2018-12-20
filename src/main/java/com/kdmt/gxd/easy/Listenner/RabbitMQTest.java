package com.kdmt.gxd.easy.Listenner;

import com.kdmt.gxd.easy.webservice.services.TestClass;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Created by thinkpad on 2018/12/20.
 */
@Component
public class RabbitMQTest {
    int num=1;
    @Scheduled(cron = "0/1 * * * * ? ")
    public void kafkaSendMeg(){
        try {
            TestClass.amqpTemplate.convertAndSend("mq.asdfExChange", "mq.asdf.send", "6666666666666666666666**************"+num);
            num++;
        }catch (Exception e){
            e.printStackTrace();
        }
    }


}
