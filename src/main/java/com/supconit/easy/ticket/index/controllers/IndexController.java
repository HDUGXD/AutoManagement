package com.supconit.easy.ticket.index.controllers;


import com.supconit.easy.ticket.index.services.IIndexService;

import com.supconit.easy.ticket.user.entities.HoUser;
import com.supconit.easy.ticket.user.services.IHoUserService;
import com.supconit.easy.ticket.user.services.impl.HoUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;


/**
 * Created with IDEA.
 * Copyright(c) AI 2003-2015. AI中国
 * author:guoxiaodogn.
 * date:2018-03-05.
 * time:22:23.
 * Description:...
 */
@Controller
public class IndexController {
    @Autowired
    private IIndexService iIndexService;
    @Resource(name = "redisTemplate")
    private RedisTemplate redisTemplate;

    @Autowired
    private HoUserService userService;

    /**
     * Created with IDEA .
     * author:zhangxiaoqiang .
     * date:2018-03-05 22:31:15
     * description:..
     */
    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String index(ModelMap model,String username,String password) {
        model.put("init",iIndexService.indexInit());
        return "ticket/login";
    }
    //跳到登录页面
    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String login(ModelMap model) {
        model.put("init",iIndexService.indexInit());
        return "ticket/bookLogin";         //移动登录
//        return "mySystem/testMap";
//        return "mySystem/bookManage/bookLogin";
    }

     @RequestMapping(value = "toPersonInformation",method = RequestMethod.GET)
    public String toPersonInformation(String username, HttpSession session,ModelMap model) {
         //从session域中取出存放的登录对象
         HoUser user = (HoUser) session.getAttribute("user");
         model.put("user",user);

         int code = (int) session.getAttribute("code");
         model.put("code",code);
         return "user/person";
    }

//    @RequestMapping("/logout")
//    public String logout(HttpSession session) {
//        session.invalidate();
//        return "ticket/login";
//    }


    @RequestMapping(value="toHome",method = RequestMethod.GET)
    public String home(ModelMap model,HttpSession session,String error){
        //查当前的活动有哪些

        int code = (int) session.getAttribute("code");
        model.put("code",code);
        if(error !=null && !"".equals(error)) {
            try {
                error = URLDecoder.decode(error,"utf-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            model.put("error",error);
        }
        HoUser user = (HoUser) session.getAttribute("user");
        model.put("user",user);
        return "ticket/activity/home";
    }

    /**
     * 分页 显示首页详情数据
     * @return
     */
//    @RequestMapping(value = "toHome",method = RequestMethod.POST)
//    @ResponseBody
//    public String toHome(Pagination<ActivityInfo> pager) {
//        //查询当前用户下所有的详情 分页插
//        ActivityInfo condition = new ActivityInfo();
//        //分页后的列表
////        List<ActivityInfo> activityInfos = activetyService.findByPager(pager,condition);
//        if(pager.getPageNo()<1||pager.getPageSize()<1||pager.getPageSize()>Pagination.MAX_PAGE_SIZE){
//            return pager.toJson();
//        }
//        activetyService.findByPager(pager, condition);
//        return pager.toJson();
//    }
    @RequestMapping(value="error",method = RequestMethod.GET)
    public String error(ModelMap model,HttpSession session){
        //跳转到无权访问页面,然后刷新到抢票页面
        return "ticket/activity/error";
    }
}
