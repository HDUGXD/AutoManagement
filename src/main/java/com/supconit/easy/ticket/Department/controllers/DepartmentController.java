package com.supconit.easy.ticket.Department.controllers;

import com.supconit.easy.ticket.Department.entieies.Department;
import com.supconit.easy.ticket.Department.services.DepartmentService;
import com.supconit.easy.ticket.index.entities.Pagination;
import com.supconit.easy.ticket.user.entities.HoUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@RequestMapping("department")
@Controller
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @RequestMapping(value="list",method= RequestMethod.GET)
    public String list(ModelMap model, HttpSession session){
        HoUser user = (HoUser) session.getAttribute("user");
        model.put("user",user);
        return "department/list";
    }

    @ResponseBody
    @RequestMapping(value="list",method=RequestMethod.POST)
    public String list(Pagination<Department> pager, @ModelAttribute Department condition, ModelMap model, HttpSession session){
        if(pager.getPageNo()<1||pager.getPageSize()<1||pager.getPageSize()> Pagination.MAX_PAGE_SIZE){
            return pager.toJson();
        }
        departmentService.findByPager(pager, condition);
        return pager.toJson();
    }

    @RequestMapping(value="departmentManage",method= RequestMethod.GET)
    public String departmentManage(ModelMap model, HttpSession session){
        HoUser user = (HoUser) session.getAttribute("user");
        model.put("user",user);
        return "mySystem/core/department/departmentManage";
    }


}
