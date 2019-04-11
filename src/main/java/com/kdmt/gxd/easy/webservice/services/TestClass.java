package com.kdmt.gxd.easy.webservice.services;

import com.kdmt.gxd.easy.bayonet.services.IBayonetService;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by guoxiaodogn on 2018/12/19.
 * 注册成Spring组件 方便@Autowired注入
 */
@Component
public class TestClass {

    public static AmqpTemplate amqpTemplate;
//    public static IBayonetService bayonetService;

    @Autowired
    public void setComponent(AmqpTemplate amqpTemplate){
        TestClass.amqpTemplate = amqpTemplate;
//        TestClass.bayonetService=bayonetService;
    }

}
