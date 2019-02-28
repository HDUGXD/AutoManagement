package com.kdmt.gxd.easy.role.controllers;


import com.alibaba.fastjson.JSONObject;
import com.kdmt.gxd.easy.role.entities.HoRole;
import com.kdmt.gxd.easy.user.services.IHoUserService;
import com.kdmt.gxd.easy.util.pager.PageInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.kdmt.gxd.easy.role.services.IHoRoleService;

import java.util.HashMap;
import java.util.List;


@RequestMapping("/role")
@Controller
public class RoleController {
    @Resource(name = "hoRoleService")
    private IHoRoleService hoRoleService;

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
    @RequestMapping(value = "/addRole", method = RequestMethod.GET)
    public String addRole(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/core/role/addRole";
    }
    @ResponseBody
    @RequestMapping(value = "addRole")
    public HashMap<String, Object> addRole(@RequestParam(required = true) String jsonStr){
        HoRole role = JSONObject.parseObject(jsonStr,HoRole.class);


        return null;
    }
    //分页
    @ResponseBody
    @RequestMapping(value = "findPager", method = RequestMethod.POST)
    public PageInfo list(HoRole condition, ModelMap model) {
        //总共条数
//        long count = hoUserService.count();
        //避免 “” 空字符串
//        if(condition.getName().equals("")){
//            condition.setName(null);
//        }

        int count = hoRoleService.findAllByCondition(condition).size();
        //条件查询 分页   封装传条件
        condition.setPageSize(condition.getPageSize());
        condition.setPageNo(condition.getPageNo()*condition.getPageSize());
        //查询
        List<HoRole> pagerList= hoRoleService.findByPage(condition);
        //封装返回
        PageInfo  pageInfo = new PageInfo();
        pageInfo.setRows(pagerList);
        pageInfo.setTotalCount(count);
        //每页 首行序号
        pageInfo.setStartRow(condition.getPageNo()+1);

        return pageInfo;
    }

}



