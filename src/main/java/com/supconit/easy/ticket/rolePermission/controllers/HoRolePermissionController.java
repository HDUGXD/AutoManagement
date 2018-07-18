package com.supconit.easy.ticket.rolePermission.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.supconit.easy.ticket.rolePermission.entities.HoRolePermission;
import com.supconit.easy.ticket.rolePermission.entities.HoRolePermissionDTO;
import com.supconit.easy.ticket.rolePermission.services.IHoRolePermissionService;
import com.supconit.easy.ticket.util.util.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping("hoRolePermission")
public class HoRolePermissionController {
    @Resource(name="hoRolePermissionService")
    private IHoRolePermissionService hoRolePermissionService;

//    @RequestMapping(value = "/list", method = RequestMethod.GET)
//    public ResponseEntity<String> list(
//      BindingResult errors) {
//        if(errors.hasErrors())
//            return ResponseUtil.getResponseEntityWhenInvalidReqParams();
//
//        Map<String, Object> result = new HashMap<String, Object>();
//
//        List<Map<String, Object>> hoRolePermissionList = hoRolePermissionService.loadMaps(null, null, null, null, limitShowDTO.getCurPage(), limitShowDTO.getLimit());
//        long count = hoRolePermissionService.count();
//
//        result.put("rows", hoRolePermissionList);
//        result.put("total", count);
//
//        return ResponseUtil.getResEntityForGetAndJson(result);
//    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<String> show() {
        Map<String, Object> hoRolePermissionModel = hoRolePermissionService.findMap();

        return ResponseUtil.getResEntityForGetAndJson(hoRolePermissionModel);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> create(
            @Validated
                    HoRolePermissionDTO hoRolePermissionDTO, BindingResult errors) {
        if(errors.hasErrors())
            return ResponseUtil.getResponseEntityWhenInvalidReqParams();

        HoRolePermission hoRolePermissionModel = hoRolePermissionDTO.toModel();

        return ResponseUtil.getResEntityForPPP(hoRolePermissionService.save(hoRolePermissionModel));
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public ResponseEntity<String> update(
        @Validated
        HoRolePermissionDTO hoRolePermissionDTO, BindingResult errors) {

        HoRolePermission hoRolePermissionModel = hoRolePermissionDTO.toModel();
        return ResponseUtil.getResEntityForPPP(hoRolePermissionService.update(hoRolePermissionModel));
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public ResponseEntity<String> destory() {
        return ResponseUtil.getResEntityForDel(hoRolePermissionService.delete());
    }

}
