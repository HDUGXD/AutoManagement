package com.kdmt.gxd.easy.rabbitmq.controllers;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by thinkpad on 2018/12/11.
 */
@RestController
@RequestMapping("/send")
public class SendMsgController {
    @Autowired
    public AmqpTemplate amqpTemplate;

    public AmqpTemplate getAmqpTemplate() {
        return amqpTemplate;
    }

    public void setAmqpTemplate(AmqpTemplate amqpTemplate) {
        this.amqpTemplate = amqpTemplate;
    }

    public SendMsgController() {
        this.amqpTemplate=amqpTemplate;
    }

    @RequestMapping("/sendMsg")
    public String sendAmqbMsg(Model model, @RequestParam(value="msg",defaultValue="hello world!!!")String msg){
        if(model!=null&&!"".equals(msg)){
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String ss = msg+"********"+sdf.format(date);
            /**
             * quenen的名称
             * 匹配规则 binding
             */
            amqpTemplate.convertAndSend("mq.asdfExChange", "mq.asdf.send", ss);
        }else{
            amqpTemplate.convertAndSend("mq.asdfExChange", "mq.asdf.send", "hello world");
        }
        return "success";
    }
    @RequestMapping("/sendMsg2")
    public String sendAmqbMsg2(Model model,@RequestParam(value="msg",defaultValue="hello world!!!")String msg){
        if(model!=null&&!"".equals(msg)){
            amqpTemplate.convertAndSend("delayed_message_exchange","","这个世界很奇妙!!!");
        }else{
            amqpTemplate.convertAndSend("delayed_message_exchange","", "这个世界很奇妙");
        }
        return "success";
    }
    @RequestMapping("/sendMsg3")
    public String sendAmqbMsg3(Model model,@RequestParam(value="msg",defaultValue="hello world!!!")String msg){
        if(model!=null&&!"".equals(msg)){
            amqpTemplate.convertAndSend("mq.qwerExChange", "mq.qwer.send", "神奇的世界!!!");
        }else{
            amqpTemplate.convertAndSend("mq.qwerExChange", "mq.qwer.send", "神奇的世界");
        }
        return "success";
    }

}
