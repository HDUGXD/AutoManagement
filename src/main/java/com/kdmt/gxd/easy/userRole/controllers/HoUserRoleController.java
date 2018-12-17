package com.kdmt.gxd.easy.userRole.controllers;

import java.util.Map;

import javax.annotation.Resource;

import com.kdmt.gxd.easy.userRole.entities.HoUserRoleDTO;
import com.kdmt.gxd.easy.userRole.services.IHoUserRoleService;
import com.kdmt.gxd.easy.util.util.ResponseUtil;
import com.kdmt.gxd.easy.userRole.entities.HoUserRole;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("hoUserRole")
public class HoUserRoleController {
    @Resource(name="hoUserRoleService")
    private IHoUserRoleService hoUserRoleService;

//    @RequestMapping(value = "/list", method = RequestMethod.GET)
//    public ResponseEntity<String> list(
//         BindingResult errors) {
//        if(errors.hasErrors())
//            return ResponseUtil.getResponseEntityWhenInvalidReqParams();
//
//        Map<String, Object> result = new HashMap<String, Object>();
//
//        List<Map<String, Object>> hoUserRoleList = hoUserRoleService.loadMaps(null, null, null, null, limitShowDTO.getCurPage(), limitShowDTO.getLimit());
//        long count = hoUserRoleService.count();
//
//        result.put("rows", hoUserRoleList);
//        result.put("total", count);
//
//        return ResponseUtil.getResEntityForGetAndJson(result);
//    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<String> show() {
        Map<String, Object> hoUserRoleModel = hoUserRoleService.findMap();

        return ResponseUtil.getResEntityForGetAndJson(hoUserRoleModel);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> create(
            @Validated
                    HoUserRoleDTO hoUserRoleDTO, BindingResult errors) {
        if(errors.hasErrors())
            return ResponseUtil.getResponseEntityWhenInvalidReqParams();

        HoUserRole hoUserRoleModel = hoUserRoleDTO.toModel();

        return ResponseUtil.getResEntityForPPP(hoUserRoleService.save(hoUserRoleModel));
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public ResponseEntity<String> update(
            @Validated
                    HoUserRoleDTO hoUserRoleDTO, BindingResult errors) {

        HoUserRole hoUserRoleModel = hoUserRoleDTO.toModel();
        return ResponseUtil.getResEntityForPPP(hoUserRoleService.update(hoUserRoleModel));
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public ResponseEntity<String> destory() {
        return ResponseUtil.getResEntityForDel(hoUserRoleService.delete());
    }

}
