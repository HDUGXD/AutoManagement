package com.kdmt.gxd.easy.user.controllers;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.kdmt.gxd.easy.user.services.impl.HoUserMongo;
import com.kdmt.gxd.easy.user.entities.HoUser;
import com.kdmt.gxd.easy.user.entities.HoUserDTO;
import com.kdmt.gxd.easy.user.services.IHoUserService;
import com.kdmt.gxd.easy.util.pager.PageInfo;
import com.kdmt.gxd.easy.util.util.DateUtil;
import com.kdmt.gxd.easy.util.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("hoUser")
public class HoUserController {
    @Resource(name = "hoUserService")
    private IHoUserService hoUserService;
    @Autowired
    private HoUserMongo hoUserMongo;
    //登录主页
    @RequestMapping(value = "login", method = RequestMethod.POST)
    public String login(String username, String password, ModelMap model,
                        HttpSession session, HttpServletRequest request) {
//        HoUser nowUser = new HoUser();
//        nowUser.setUsername();
//        return "mySystem/index";
        return "mySystem/testMap";
    }
    @RequestMapping(value = "mainn", method = RequestMethod.POST)
    public String main(HoUser hoUser, ModelMap model,
                       HttpSession session, HttpServletRequest request) {
        return "mySystem/index";
    }
    //退出到登录页面
//    @RequestMapping("/logout")
    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public String logout(HttpSession session) {
        session.invalidate();
        return "ticket/login";
    }
    //跳用户中心页面
    @RequestMapping(value = "userManage", method = RequestMethod.GET)
    public String userManage(ModelMap model, HttpSession session, HttpServletRequest request) {
        String permission= "user:userManage/add;user:userManage/delete;user:userManage/edit";
        String a []=permission.split(";");
        model.put("menuArr",a);
        return "mySystem/core/user/userManage";
    }
    //用户中心的List子页面
    @RequestMapping(value = "userList", method = RequestMethod.GET)
    public String userList(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/core/user/userList";
    }
    //到用户添加页面
    @RequestMapping(value = "addUser", method = RequestMethod.GET)
    public String addUser(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/core/user/addUser";
    }


//    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
//    public ResponseEntity<String> show(@PathVariable("id") Long id) {
//        Map<String, Object> hoUserModel = hoUserService.findMap(id);
//
//        return ResponseUtil.getResEntityForGetAndJson(hoUserModel);
//    }

    @RequestMapping(value = "addUser", method = RequestMethod.POST)
    public ResponseEntity<String> create(@Validated HoUserDTO hoUserDTO, BindingResult errors) {
        if (errors.hasErrors())
            return ResponseUtil.getResponseEntityWhenInvalidReqParams();

        HoUser hoUserModel = hoUserDTO.toModel();
        //创建时间
        hoUserModel.setCreateTime( DateUtil.parse(DateUtil.format(new Date())));
        hoUserService.save(hoUserModel);
//        hoUserService.insert(hoUserModel);      //mongodb
//          HoUserMongo hoUserMongo = new HoUserMongo();
//          hoUserMongo.insertMongo();

        return ResponseUtil.getResEntityForPPP(hoUserService.save(hoUserModel));
    }
    @ResponseBody      //返回数据实体  要用此标签
    @RequestMapping(value = "getAllByCondition", method = RequestMethod.POST)
    public List<HoUser> finAllByCondition(@Validated HoUserDTO hoUserDTO, BindingResult errors) {

        HoUser hoUserModel = hoUserDTO.toModel();
        List<HoUser> userList= hoUserService.findAllByCondition(hoUserModel);
        return userList;
    }

//    //分页
//    @ResponseBody
//    @RequestMapping(value = "findPager", method = RequestMethod.POST)
//    public PageInfo list(int pageSize, int pageNo,HoUser condition,ModelMap model) {
//        //总共条数
//        long count = hoUserService.count();
//        //条件查询 分页   封装传条件
//
//        //查询
//        List<HoUser> pagerList= hoUserService.findByPage(pageNo*pageSize,pageSize);
//        //封装返回
//        PageInfo  pageInfo = new PageInfo();
//        pageInfo.setRows(pagerList);
//        pageInfo.setTotalCount((int)count);
//        //每页 首行序号
//        pageInfo.setStartRow(pageNo*pageSize+1);
//
//        return pageInfo;
//    }

    //分页
    @ResponseBody
    @RequestMapping(value = "findPager", method = RequestMethod.POST)
    public PageInfo list(HoUser condition,ModelMap model) {
        //总共条数
//        long count = hoUserService.count();
        //避免 “” 空字符串
        if(condition.getUsername().equals("")){
            condition.setUsername(null);
        }

        int count = hoUserService.findAllByCondition(condition).size();
        //条件查询 分页   封装传条件
        condition.setPageSize(condition.getPageSize());
        condition.setPageNo(condition.getPageNo()*condition.getPageSize());
        //查询
        List<HoUser> pagerList= hoUserService.findByPage(condition);
        //封装返回
        PageInfo  pageInfo = new PageInfo();
        pageInfo.setRows(pagerList);
        pageInfo.setTotalCount(count);
        //每页 首行序号
        pageInfo.setStartRow(condition.getPageNo()+1);

        return pageInfo;
    }
    @ResponseBody
    @RequestMapping(value = "getCount", method = RequestMethod.POST)
    public long getCount(HttpSession session, HttpServletRequest request) {
        long listCount=hoUserService.getCount();
        return listCount;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> update(@PathVariable("id") Long id,
                                         @Validated
                                                 HoUserDTO hoUserDTO, BindingResult errors) {

        HoUser hoUserModel = hoUserDTO.toModel();
        hoUserModel.setId(id);
        return ResponseUtil.getResEntityForPPP(hoUserService.update(hoUserModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> destory(@PathVariable("id") Long id) {
        return ResponseUtil.getResEntityForDel(hoUserService.delete(id));
    }

    @RequestMapping(value = "/deletes", method = RequestMethod.DELETE)
    public ResponseEntity<String> deletes(@RequestParam("primaryKeys") Long[] primaryKeys) {
        return ResponseUtil.getResEntityForDel(hoUserService.batchDelete(primaryKeys));
    }
}
