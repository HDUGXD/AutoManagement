package com.kdmt.gxd.easy.vehicle.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kdmt.gxd.easy.util.util.ResponseUtil;
import com.kdmt.gxd.easy.vehicle.entities.VehicleDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.kdmt.gxd.easy.vehicle.entities.Vehicle;
import com.kdmt.gxd.easy.vehicle.services.IVehicleService;


@Controller
@RequestMapping("vehicle")
public class VehicleController {
    @Resource(name="vehicleService")
    private IVehicleService vehicleService;

//    @RequestMapping(value = "/list", method = RequestMethod.GET)
//    public ResponseEntity<String> list(
//        @Validated
//        LimitShowDTO limitShowDTO, BindingResult errors) {
//        if(errors.hasErrors())
//            return ResponseUtil.getResponseEntityWhenInvalidReqParams();
//
//        Map<String, Object> result = new HashMap<String, Object>();
//
//        List<Map<String, Object>> vehicleList = vehicleService.loadMaps(null, null, null, null, limitShowDTO.getCurPage(), limitShowDTO.getLimit());
//        long count = vehicleService.count();
//
//        result.put("rows", vehicleList);
//        result.put("total", count);
//
//        return ResponseUtil.getResEntityForGetAndJson(result);
//    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<String> show(@PathVariable("id") String id) {
        Map<String, Object> vehicleModel = vehicleService.findMap(id);

        return ResponseUtil.getResEntityForGetAndJson(vehicleModel);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> create(
            @Validated
                    VehicleDTO vehicleDTO, BindingResult errors) {
        if(errors.hasErrors())
            return ResponseUtil.getResponseEntityWhenInvalidReqParams();

        Vehicle vehicleModel = vehicleDTO.toModel();

        return ResponseUtil.getResEntityForPPP(vehicleService.save(vehicleModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> update(@PathVariable("id") String id,
        @Validated
        VehicleDTO vehicleDTO, BindingResult errors) {

        Vehicle vehicleModel = vehicleDTO.toModel();
        vehicleModel.setId(id);
        return ResponseUtil.getResEntityForPPP(vehicleService.update(vehicleModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> destory(@PathVariable("id") String id) {
        return ResponseUtil.getResEntityForDel(vehicleService.delete(id));
    }

    @RequestMapping(value = "/deletes", method = RequestMethod.DELETE)
    public ResponseEntity<String> deletes(@RequestParam("primaryKeys") String[] primaryKeys) {
        return ResponseUtil.getResEntityForDel(vehicleService.batchDelete(primaryKeys));
    }
}
