//package com.kdmt.gxd.easy.util.rabbitMq;
//
//
//import com.alibaba.fastjson.JSONObject;
//import com.kdmt.gxd.easy.bayonet.entities.Bayonet;
//import com.kdmt.gxd.easy.util.cxf.StaticElement;
//import com.kdmt.gxd.easy.webservice.services.TestClass;
//import com.rabbitmq.client.Channel;
//import org.apache.http.HttpEntity;
//import org.apache.http.HttpResponse;
//import org.apache.http.StatusLine;
//import org.apache.http.client.methods.HttpPut;
//import org.apache.http.entity.StringEntity;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClientBuilder;
//import org.apache.http.util.EntityUtils;
//import org.springframework.amqp.core.Message;
//import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.charset.Charset;
//import java.util.ArrayList;
//import java.util.List;
//
//
///**
// * Created by thinkpad on 2018/12/11.
// */
//public class Consumor implements ChannelAwareMessageListener {
//
//    List<String> list = new ArrayList();
//
//    /**
//     *
//     * @param message  消息实体
//     * @param channel  当前通道
//     * @throws Exception
//     */
//    @Override
//    public void onMessage(Message message, Channel channel) throws Exception {
//        String msg=  new String (message.getBody(),"UTF-8");      //备用转换格式
//        //json转可获得属性的Object
//        JSONObject jsonObject = JSONObject.parseObject(msg);
//        /**
//         * 判断图片存储的文件夹
//         */
//        String toDir= (String) jsonObject.get("toDir");
//        File toFile = new File(toDir);
////        判断文件夹是否存在,如果不存在则创建文件夹
//        StaticElement.createDir(toFile,toDir);
//
//        /**
//         * Base64转图片
//         */
//        StaticElement.Base64ToImage((String) jsonObject.get("encodeBase64String1"), (String) jsonObject.get("firstPicPath"));
//        StaticElement.Base64ToImage((String) jsonObject.get("encodeBase64String2"), (String) jsonObject.get("secondPicPath"));
//        StaticElement.Base64ToImage((String) jsonObject.get("encodeBase64String3"), (String) jsonObject.get("reservPicPath"));
//        /**
//         * 转发rest
//         */
//        //    	String url = "http://60.191.115.11:5760//TPT/picture/3/33030000001320000003_20180920101155_00021";
//        //since 4.3 不再使用 DefaultHttpClient
//        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
////        HttpPut httpPut = new HttpPut("http://122.224.82.76:8089/CuServer/api/test/33030000001320000003_20180920101155_00001");
////        HttpPut httpPut = new HttpPut("http://60.191.115.11:6760//TPT/picture/1/"+StaticElement.getPicId()); //公司测试
//        HttpPut httpPut = new HttpPut("http://33.112.9.24:5760//TPT/picture/2/"+ StaticElement.getPicId()); //温州专网
//
//        System.out.println(StaticElement.getPicId());
//        httpPut.setHeader("Content-Type", "application/JSON");
//        httpPut.setEntity(new StringEntity(message.getBody().toString(), Charset.forName("utf-8")));
//
//        try {
//            /**
//             * 转发rest
//             */
//            HttpResponse httpResponse = httpClient.execute(httpPut);
//            HttpEntity entity = httpResponse.getEntity();
//            StatusLine statusLine = httpResponse.getStatusLine();
//            int statusCode = statusLine.getStatusCode();
//            System.out.println("statusCode:"+statusCode);
//            String entityStr = EntityUtils.toString(entity);
//            System.out.println("响应返回内容:"+entityStr);
//
//            /**
//             * 插入数据库
//             */
//               Bayonet bayonet = StaticElement.changeToBean(jsonObject);
//               TestClass.bayonetService.save(bayonet);
//
//        } catch (Exception e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        } finally{
//            try {
//                httpClient.close();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//        /**
//         * 消息ack应答
//         */
//        //消息的标识，false只确认当前一个消息收到，true确认所有consumer获得的消息
//        //调用basicAck 传入tagID
//        channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
//
//        //ack返回false，并重新回到队列，api里面解释得很清楚
//        /*channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true);*/
//        //true拒绝消息  false确认接受到消息
//        //channel.basicReject(message.getMessageProperties().getDeliveryTag(), false);
//        System.out.println("消费者1号消费掉了:------->>>1>>");
//
//    }
//}
