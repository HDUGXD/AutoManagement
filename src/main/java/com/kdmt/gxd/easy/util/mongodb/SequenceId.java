//package com.kdmt.gxd.easy.util.mongodb;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
//import org.springframework.data.mongodb.core.mapping.Field;
//
///**
// * Created by thinkpad on 2018/11/21.
// */
//@Document(collection = "ids")
//public class SequenceId {
//    @Id
//    private String id;// 主键
//
//    @Field
//    private long seqId;
//
//    @Field
//    private String collName;
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public long getSeqId() {
//        return seqId;
//    }
//
//    public void setSeqId(long seqId) {
//        this.seqId = seqId;
//    }
//
//    public String getCollName() {
//        return collName;
//    }
//
//    public void setCollName(String collName) {
//        this.collName = collName;
//    }
//
//}
