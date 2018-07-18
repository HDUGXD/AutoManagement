package com.supconit.easy.ticket.permission.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.supconit.easy.ticket.permission.entities.HoPermission;
import com.supconit.easy.ticket.permission.entities.HoPermissionDTO;
import com.supconit.easy.ticket.permission.services.IHoPermissionService;
import com.supconit.easy.ticket.util.util.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
@RequestMapping("hoPermission")
public class HoPermissionController {
    @Resource(name="hoPermissionService")
    private IHoPermissionService hoPermissionService;

//    @RequestMapping(value = "/list", method = RequestMethod.GET)
//    public ResponseEntity<String> list(
//        BindingResult errors) {
//        if(errors.hasErrors())
//            return ResponseUtil.getResponseEntityWhenInvalidReqParams();
//
//        Map<String, Object> result = new HashMap<String, Object>();
//
//        List<Map<String, Object>> hoPermissionList = hoPermissionService.loadMaps(null, null, null, null, limitShowDTO.getCurPage(), limitShowDTO.getLimit());
//        long count = hoPermissionService.count();
//
//        result.put("rows", hoPermissionList);
//        result.put("total", count);
//
//        return ResponseUtil.getResEntityForGetAndJson(result);
//    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<String> show(@PathVariable("id") Long id) {
        Map<String, Object> hoPermissionModel = hoPermissionService.findMap(id);

        return ResponseUtil.getResEntityForGetAndJson(hoPermissionModel);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> create(
            @Validated
                    HoPermissionDTO hoPermissionDTO, BindingResult errors) {
        if(errors.hasErrors())
            return ResponseUtil.getResponseEntityWhenInvalidReqParams();

        HoPermission hoPermissionModel = hoPermissionDTO.toModel();

        return ResponseUtil.getResEntityForPPP(hoPermissionService.save(hoPermissionModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> update(@PathVariable("id") Long id,
        @Validated
        HoPermissionDTO hoPermissionDTO, BindingResult errors) {

        HoPermission hoPermissionModel = hoPermissionDTO.toModel();
        hoPermissionModel.setId(id);
        return ResponseUtil.getResEntityForPPP(hoPermissionService.update(hoPermissionModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> destory(@PathVariable("id") Long id) {
        return ResponseUtil.getResEntityForDel(hoPermissionService.delete(id));
    }

    @RequestMapping(value = "/deletes", method = RequestMethod.DELETE)
    public ResponseEntity<String> deletes(@RequestParam("primaryKeys") Long[] primaryKeys) {
        return ResponseUtil.getResEntityForDel(hoPermissionService.batchDelete(primaryKeys));
    }
}
