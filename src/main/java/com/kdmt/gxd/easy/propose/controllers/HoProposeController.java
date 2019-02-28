package com.kdmt.gxd.easy.propose.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.kdmt.gxd.easy.propose.entities.HoProposeDTO;
import com.kdmt.gxd.easy.util.beanUtil.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


import com.kdmt.gxd.easy.propose.entities.HoPropose;
import com.kdmt.gxd.easy.propose.services.IHoProposeService;


@Controller
@RequestMapping("hoPropose")
public class HoProposeController {
    @Resource(name="hoProposeService")
    private IHoProposeService hoProposeService;

    //用户中心的List子页面
    @RequestMapping(value = "proposeList", method = RequestMethod.GET)
    public String userList(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/bookManage/propose/proposeList";
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<String> show(@PathVariable("id") Long id) {
        Map<String, Object> hoProposeModel = hoProposeService.findMap(id);

        return ResponseUtil.getResEntityForGetAndJson(hoProposeModel);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> create(
            @Validated
                    HoProposeDTO hoProposeDTO, BindingResult errors) {
        if(errors.hasErrors())
            return ResponseUtil.getResponseEntityWhenInvalidReqParams();

        HoPropose hoProposeModel = hoProposeDTO.toModel();

        return ResponseUtil.getResEntityForPPP(hoProposeService.save(hoProposeModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> update(@PathVariable("id") Long id,
        @Validated
        HoProposeDTO hoProposeDTO, BindingResult errors) {

        HoPropose hoProposeModel = hoProposeDTO.toModel();
        hoProposeModel.setId(id);
        return ResponseUtil.getResEntityForPPP(hoProposeService.update(hoProposeModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> destory(@PathVariable("id") Long id) {
        return ResponseUtil.getResEntityForDel(hoProposeService.delete(id));
    }

    @RequestMapping(value = "/deletes", method = RequestMethod.DELETE)
    public ResponseEntity<String> deletes(@RequestParam("primaryKeys") Long[] primaryKeys) {
        return ResponseUtil.getResEntityForDel(hoProposeService.batchDelete(primaryKeys));
    }
}
