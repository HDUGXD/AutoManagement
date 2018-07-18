package com.supconit.easy.ticket.index.services;

import java.util.List;

/**
 * Created with IDEA.
 * Copyright(c) SUPCON 2003-2015. 浙江浙大中控信息技术有限公司
 * author:zhangxiaoqiang.
 * date:2018-03-05.
 * time:22:23.
 * Description:...
 */
public interface IIndexService {
    public String indexInit();


    List findTickerRecord(String username);

    //获取姓名
    String findName(String username);
    //获取身份证号
    String findIDCard(String username);
    //获取部门
    String findDepartment(String username);
    //获取单位
    String findCompany(String username);
    //获取手机号
    String findPhoneNumber(String username);

    boolean determineTicket(String username);
}

