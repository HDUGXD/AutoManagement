package com.supconit.easy.ticket.user.services.impl;

import com.alibaba.druid.util.StringUtils;
import com.mongodb.*;
import com.supconit.easy.ticket.user.entities.HoUser;
import com.supconit.easy.ticket.user.entities.HoUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by thinkpad on 2018/11/20.
 */
@Service
public class HoUserMongo {
    private static final String host = "192.168.11.69";
    private static final int port = 27017;
    private static final String userName = "gxd";
    private static final String password = "gxd";
    private static final String dataBaseName = "gxd";
    private static DB db;

    public static void insertMongo(){
        System.out.println( "Hello World!" );
        try {
            connMongoDB();
        }catch (Exception e){
            e.printStackTrace();
        }
        DBObject newObj = new BasicDBObject();
        newObj.put("name", "xiaoming");
        newObj.put("desc", "i am xiaoming");
        insert("gxd",newObj);


    }
    public static void connMongoDB() throws Exception {
        Mongo mongo = new Mongo(host, port);
        db = mongo.getDB(dataBaseName);
        if (!StringUtils.isEmpty(userName) || !StringUtils.isEmpty(password)) {
            db.authenticate(userName, password.toCharArray());
        }
    }
    public static boolean insert(String tableName, DBObject obj){
        DBCollection dbCollection = db.getCollection(tableName);
        long num = dbCollection.count();
        dbCollection.insert(obj);
        if(dbCollection.count() - num > 0){
            System.out.println("插入数据成功！");
            return true;
        }else{
            return false;
        }
    }


}
