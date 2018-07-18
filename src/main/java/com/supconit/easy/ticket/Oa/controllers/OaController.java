package com.supconit.easy.ticket.Oa.controllers;

import com.supconit.easy.ticket.user.entities.HoUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;

/**
 * Created by thinkpad on 2018/5/8.
 */
@RequestMapping("Oa")
@Controller
public class OaController {
    //主页面
    @RequestMapping(value="home", method= RequestMethod.GET)
    public String list(ModelMap model, HttpSession session){
        HoUser user = (HoUser) session.getAttribute("user");
        model.put("user",user);
        return "mySystem/home/home";
    }
    //表单填写页面
    @RequestMapping(value="info_reg", method= RequestMethod.GET)
    public String info_reg(ModelMap model, HttpSession session){
        HoUser user = (HoUser) session.getAttribute("user");
        model.put("user",user);
        return "mySystem/info_reg";
    }
    //list
    @RequestMapping(value="info_mgt", method= RequestMethod.GET)
    public String info_mgt(ModelMap model, HttpSession session){
        HoUser user = (HoUser) session.getAttribute("user");
        model.put("user",user);
        return "mySystem/info_mgt";
    }

}
