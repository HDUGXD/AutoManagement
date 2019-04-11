//package com.kdmt.gxd.easy.util.mongodb;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.mongodb.core.FindAndModifyOptions;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
//import org.springframework.data.mongodb.core.mapping.event.BeforeSaveEvent;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.data.mongodb.core.query.Update;
//import org.springframework.stereotype.Component;
//import org.springframework.util.ReflectionUtils;
//
//import java.lang.reflect.Field;
//
///**
// * Created by thinkpad on 2018/11/21.
// */
//@Component
//public class SaveEventListener extends AbstractMongoEventListener<Object>{
//    @Autowired
//    private MongoTemplate mongoTemplate;
//
//    @Override
//    public void onBeforeSave(BeforeSaveEvent<Object> event) {
//       final  Object source = event.getSource();
//        if (source != null) {
//            ReflectionUtils.doWithFields(source.getClass(), new ReflectionUtils.FieldCallback() {
//                public void doWith(Field field) throws IllegalArgumentException, IllegalAccessException {
//                    ReflectionUtils.makeAccessible(field);
//                    System.out.println("************qwqweq*******");
//                    // 如果字段添加了我们自定义的AutoValue注解
//                    if (field.isAnnotationPresent(AutoValue.class) && field.get(source) instanceof Number
//                            && field.getLong(source) == 0) {
//                        // field.get(source) instanceof Number &&
//                        // field.getLong(source)==0
//                        // 判断注解的字段是否为number类型且值是否等于0.如果大于0说明有ID不需要生成ID
//                        // 设置自增ID
//                        field.set(source, getNextId(source.getClass().getSimpleName()));
//
//                    }
//                }
//            });
//        }
//    }
//
//    /**
//     * 获取下一个自增ID
//     *
//     * @param collName
//     *            集合（这里用类名，就唯一性来说最好还是存放长类名）名称
//     * @return 序列值
//     */
//    private Long getNextId(String collName) {
//        Query query = new Query(Criteria.where("coll_name").is(collName));
//        Update update = new Update();
//        update.inc("seq_id", 1);
//        FindAndModifyOptions options = new FindAndModifyOptions();
//        options.upsert(true);
//        options.returnNew(true);
//        SequenceId seq = mongoTemplate.findAndModify(query, update, options, SequenceId.class);
//        return seq.getSeqId();
//    }
//
//
//}
