package com.kdmt.gxd.easy.role.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@RequestMapping("role")
@Controller
public class RoleController {


    @RequestMapping(value = "login", method = RequestMethod.POST)
    public String login(String IDCard, String password, ModelMap model,
                        HttpSession session, HttpServletRequest request) {

        return "mySystem/index";
    }


    //打开角色主页
    @RequestMapping(value = "roalManage", method = RequestMethod.GET)
    public String roalManage(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/core/role/rolesManage";
    }
    //角色列表
    @RequestMapping(value = "roleList", method = RequestMethod.GET)
    public String roleList(ModelMap model, HttpSession session, HttpServletRequest request) {
        return "mySystem/core/role/roleList";
    }
    //到添加页面
    @RequestMapping(value = "addRole", method = RequestMethod.GET)
    public String addRole(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/core/role/addRole";
    }

}



