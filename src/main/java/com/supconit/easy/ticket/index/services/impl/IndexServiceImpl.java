package com.supconit.easy.ticket.index.services.impl;

import com.supconit.easy.ticket.index.services.IIndexService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeUnit;

/**
 * Created with IDEA.
 * Copyright(c) SUPCON 2003-2015. 浙江浙大中控信息技术有限公司
 * author:zhangxiaoqiang.
 * date:2018-03-05.
 * time:22:23.
 * Description:...
 */
@Service
public class IndexServiceImpl implements IIndexService{

    @Resource(name = "redisTemplate")
    private RedisTemplate redisTemplate;

    //生成队列
    BlockingQueue<String> queue = new LinkedBlockingDeque<>(2000);

    //是否抢到票的标记
    boolean flag = false;


    /**
     * Created with IDEA .
     * author:zhangxiaoqiang .
     * date:2018-03-05 22:24:43
     * description:..
     */
    @Override
    public String indexInit() {
        return "初始化成功";
    }

    @Override
    public List findTickerRecord(String username) {
        //抢票记录
        Object phondeNumber = redisTemplate.opsForHash().get(username, "phoneNumber");
        List range = redisTemplate.opsForList().range(phondeNumber, 0, -1);
        return range;
    }

    @Override
    public String findName(String username) {
        String name = (String)redisTemplate.opsForHash().get(username, "name");
        return name;
    }

    @Override
    public String findIDCard(String username) {
        String IDCard = (String)redisTemplate.opsForHash().get(username, "IDCard");
        return IDCard;
    }

    @Override
    public String findDepartment(String username) {
        String department = (String)redisTemplate.opsForHash().get(username, "department");
        return department;
    }

    @Override
    public String findCompany(String username) {
        String company = (String)redisTemplate.opsForHash().get(username, "company");
        return company;
    }

    @Override
    public String findPhoneNumber(String username) {
        String phoneNumber = (String)redisTemplate.opsForHash().get(username, "phoneNumber");
        return phoneNumber;
    }

    @Override
    public boolean determineTicket (final String username) {

        //开启一个线程向队列中放数据
        new Thread(){
            @Override
            public void run() {
                //是否继续存到序列的标记
                boolean keepFlag = true;
                try{
                    while(keepFlag){
                        queue.put(username);
                    }
                }catch(Exception e){
                    e.printStackTrace();
                }

            }
        }.start();

        //开启一个线程从队列中取数据
        new Thread(){
            @Override
            public void run(){
                //是否继续读取序列的标记
                boolean readFlag = true;

                try{
                    while(readFlag){
                        //有数据是直接从队列的队首取走,无数据阻塞,在2s内有数据,取走,
                        String name = queue.poll(2, TimeUnit.SECONDS);
                        if(null!=name){
                            //抢票成功
                            flag=true;
                        }else{
                            //超过2s还没数据,返回失败
                            readFlag=false;

                        }
                    }
                }catch(Exception e){
                    e.printStackTrace();
                }
            }

        }.start();


     return flag;


    }



}
