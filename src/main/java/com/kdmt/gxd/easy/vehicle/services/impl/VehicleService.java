package com.kdmt.gxd.easy.vehicle.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kdmt.gxd.easy.util.util.SqlUtil;
import org.springframework.stereotype.Service;

import com.kdmt.gxd.easy.vehicle.entities.Vehicle;
import com.kdmt.gxd.easy.vehicle.services.IVehicleService;
import com.kdmt.gxd.easy.vehicle.daos.VehicleMapper;

@Service
public class VehicleService implements IVehicleService {
    @Resource(name="vehicleMapper")
    private VehicleMapper vehicleMapper;

    @Override
    public boolean save(Vehicle vehicle) {
        return vehicleMapper.insert(vehicle) > 0;
    }

    @Override
    public boolean update(Vehicle vehicle) {
        return vehicleMapper.updateByPrimaryKeySelective(vehicle) >= 0;
    }

    @Override
    public boolean delete(String id) {
        return vehicleMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public boolean batchDelete(String[] primaryKeys) {
        return vehicleMapper.deleteByPrimaryKeys(primaryKeys) > 0;
    }

    @Override
    public Vehicle findModel(String id) {
        return vehicleMapper.selectByPrimaryKey(id);
    }

    @Override
    public Vehicle findModel(String id, String[] parameters) {
        return vehicleMapper.findModel(id, SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap(String id) {
        String[][] parameters = {{"id", "id"}, {"vehicle_trunk", "vehicleTrunk"}, {"vehicle_wheel", "vehicleWheel"}, {"plate_reliability", "plateReliability"}, {"vehicle_window", "vehicleWindow"}, {"pass_time", "passTime"}, {"mark_time", "markTime"}, {"plate_color", "plateColor"}, {"has_plate", "hasPlate"}, {"storage_url1", "storageUrl1"}, {"storage_url2", "storageUrl2"}, {"appear_time", "appearTime"}, {"storage_url3", "storageUrl3"}, {"driving_status_code", "drivingStatusCode"}, {"is_modified", "isModified"}, {"vehicle_color_depth", "vehicleColorDepth"}, {"lane_no", "laneNo"}, {"motor_vehicleID", "motorVehicleid"}, {"vehicle_height", "vehicleHeight"}, {"using_properties_code", "usingPropertiesCode"}, {"film_color", "filmColor"}, {"vehicle_chassis", "vehicleChassis"}, {"brand_reliability", "brandReliability"}, {"is_covered", "isCovered"}, {"is_altered", "isAltered"}, {"vehicle_styles", "vehicleStyles"}, {"left_top_y", "leftTopY"}, {"left_top_x", "leftTopX"}, {"plate_char_reliability", "plateCharReliability"}, {"rearview_mirror", "rearviewMirror"}, {"vehicle_rear_item", "vehicleRearItem"}, {"wheel_printed_pattern", "wheelPrintedPattern"}, {"vehicle_roof", "vehicleRoof"}, {"plate_no_attach", "plateNoAttach"}, {"sub_image_list", "subImageList"}, {"event_sort", "eventSort"}, {"title", "title"}, {"type", "type"}, {"deviceID", "deviceid"}, {"security_level", "securityLevel"}, {"content_description", "contentDescription"}, {"file_format", "fileFormat"}, {"plate_describe", "plateDescribe"}, {"tollgateID", "tollgateid"}, {"side_of_vehicle", "sideOfVehicle"}, {"is_suspicious", "isSuspicious"}, {"vehicle_front_item", "vehicleFrontItem"}, {"disappear_time", "disappearTime"}, {"name_of_passed_road", "nameOfPassedRoad"}, {"safety_belt", "safetyBelt"}, {"speed", "speed"}, {"desc_of_front_item", "descOfFrontItem"}, {"vehicle_brand", "vehicleBrand"}, {"vehicle_shielding", "vehicleShielding"}, {"num_of_passenger", "numOfPassenger"}, {"desc_of_rear_item", "descOfRearItem"}, {"vehicle_class", "vehicleClass"}, {"vehicle_model", "vehicleModel"}, {"is_decked", "isDecked"}, {"hit_mark_info", "hitMarkInfo"}, {"direction", "direction"}, {"car_of_vehicle", "carOfVehicle"}, {"sourceID", "sourceid"}, {"vehicle_color", "vehicleColor"}, {"plate_class", "plateClass"}, {"plate_no", "plateNo"}, {"right_btm_x", "rightBtmX"}, {"vehicle_body_desc", "vehicleBodyDesc"}, {"vehicle_door", "vehicleDoor"}, {"right_btm_y", "rightBtmY"}, {"storage_url4", "storageUrl4"}, {"storage_url5", "storageUrl5"}, {"sunvisor", "sunvisor"}, {"vehicle_length", "vehicleLength"}, {"vehicle_width", "vehicleWidth"}, {"info_kind", "infoKind"}, {"calling", "calling"}, {"vehicle_hood", "vehicleHood"}, {"page_no", "pageNo"}, {"page_size", "pageSize"}, {"count_day", "countDay"}, {"count_hour", "countHour"}, {"count_month", "countMonth"}, {"qy_code", "qyCode"}, {"gs_code", "gsCode"}};
        return this.findMap(id, parameters);
    }

    public Map<String, Object> findMap(String id, String[][] parameters) {
        return vehicleMapper.findMap(id, SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<Vehicle> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<Vehicle> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Vehicle> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return vehicleMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"id", "id"}, {"vehicle_trunk", "vehicleTrunk"}, {"vehicle_wheel", "vehicleWheel"}, {"plate_reliability", "plateReliability"}, {"vehicle_window", "vehicleWindow"}, {"pass_time", "passTime"}, {"mark_time", "markTime"}, {"plate_color", "plateColor"}, {"has_plate", "hasPlate"}, {"storage_url1", "storageUrl1"}, {"storage_url2", "storageUrl2"}, {"appear_time", "appearTime"}, {"storage_url3", "storageUrl3"}, {"driving_status_code", "drivingStatusCode"}, {"is_modified", "isModified"}, {"vehicle_color_depth", "vehicleColorDepth"}, {"lane_no", "laneNo"}, {"motor_vehicleID", "motorVehicleid"}, {"vehicle_height", "vehicleHeight"}, {"using_properties_code", "usingPropertiesCode"}, {"film_color", "filmColor"}, {"vehicle_chassis", "vehicleChassis"}, {"brand_reliability", "brandReliability"}, {"is_covered", "isCovered"}, {"is_altered", "isAltered"}, {"vehicle_styles", "vehicleStyles"}, {"left_top_y", "leftTopY"}, {"left_top_x", "leftTopX"}, {"plate_char_reliability", "plateCharReliability"}, {"rearview_mirror", "rearviewMirror"}, {"vehicle_rear_item", "vehicleRearItem"}, {"wheel_printed_pattern", "wheelPrintedPattern"}, {"vehicle_roof", "vehicleRoof"}, {"plate_no_attach", "plateNoAttach"}, {"sub_image_list", "subImageList"}, {"event_sort", "eventSort"}, {"title", "title"}, {"type", "type"}, {"deviceID", "deviceid"}, {"security_level", "securityLevel"}, {"content_description", "contentDescription"}, {"file_format", "fileFormat"}, {"plate_describe", "plateDescribe"}, {"tollgateID", "tollgateid"}, {"side_of_vehicle", "sideOfVehicle"}, {"is_suspicious", "isSuspicious"}, {"vehicle_front_item", "vehicleFrontItem"}, {"disappear_time", "disappearTime"}, {"name_of_passed_road", "nameOfPassedRoad"}, {"safety_belt", "safetyBelt"}, {"speed", "speed"}, {"desc_of_front_item", "descOfFrontItem"}, {"vehicle_brand", "vehicleBrand"}, {"vehicle_shielding", "vehicleShielding"}, {"num_of_passenger", "numOfPassenger"}, {"desc_of_rear_item", "descOfRearItem"}, {"vehicle_class", "vehicleClass"}, {"vehicle_model", "vehicleModel"}, {"is_decked", "isDecked"}, {"hit_mark_info", "hitMarkInfo"}, {"direction", "direction"}, {"car_of_vehicle", "carOfVehicle"}, {"sourceID", "sourceid"}, {"vehicle_color", "vehicleColor"}, {"plate_class", "plateClass"}, {"plate_no", "plateNo"}, {"right_btm_x", "rightBtmX"}, {"vehicle_body_desc", "vehicleBodyDesc"}, {"vehicle_door", "vehicleDoor"}, {"right_btm_y", "rightBtmY"}, {"storage_url4", "storageUrl4"}, {"storage_url5", "storageUrl5"}, {"sunvisor", "sunvisor"}, {"vehicle_length", "vehicleLength"}, {"vehicle_width", "vehicleWidth"}, {"info_kind", "infoKind"}, {"calling", "calling"}, {"vehicle_hood", "vehicleHood"}, {"page_no", "pageNo"}, {"page_size", "pageSize"}, {"count_day", "countDay"}, {"count_hour", "countHour"}, {"count_month", "countMonth"}, {"qy_code", "qyCode"}, {"gs_code", "gsCode"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"id", "id"}, {"vehicle_trunk", "vehicleTrunk"}, {"vehicle_wheel", "vehicleWheel"}, {"plate_reliability", "plateReliability"}, {"vehicle_window", "vehicleWindow"}, {"pass_time", "passTime"}, {"mark_time", "markTime"}, {"plate_color", "plateColor"}, {"has_plate", "hasPlate"}, {"storage_url1", "storageUrl1"}, {"storage_url2", "storageUrl2"}, {"appear_time", "appearTime"}, {"storage_url3", "storageUrl3"}, {"driving_status_code", "drivingStatusCode"}, {"is_modified", "isModified"}, {"vehicle_color_depth", "vehicleColorDepth"}, {"lane_no", "laneNo"}, {"motor_vehicleID", "motorVehicleid"}, {"vehicle_height", "vehicleHeight"}, {"using_properties_code", "usingPropertiesCode"}, {"film_color", "filmColor"}, {"vehicle_chassis", "vehicleChassis"}, {"brand_reliability", "brandReliability"}, {"is_covered", "isCovered"}, {"is_altered", "isAltered"}, {"vehicle_styles", "vehicleStyles"}, {"left_top_y", "leftTopY"}, {"left_top_x", "leftTopX"}, {"plate_char_reliability", "plateCharReliability"}, {"rearview_mirror", "rearviewMirror"}, {"vehicle_rear_item", "vehicleRearItem"}, {"wheel_printed_pattern", "wheelPrintedPattern"}, {"vehicle_roof", "vehicleRoof"}, {"plate_no_attach", "plateNoAttach"}, {"sub_image_list", "subImageList"}, {"event_sort", "eventSort"}, {"title", "title"}, {"type", "type"}, {"deviceID", "deviceid"}, {"security_level", "securityLevel"}, {"content_description", "contentDescription"}, {"file_format", "fileFormat"}, {"plate_describe", "plateDescribe"}, {"tollgateID", "tollgateid"}, {"side_of_vehicle", "sideOfVehicle"}, {"is_suspicious", "isSuspicious"}, {"vehicle_front_item", "vehicleFrontItem"}, {"disappear_time", "disappearTime"}, {"name_of_passed_road", "nameOfPassedRoad"}, {"safety_belt", "safetyBelt"}, {"speed", "speed"}, {"desc_of_front_item", "descOfFrontItem"}, {"vehicle_brand", "vehicleBrand"}, {"vehicle_shielding", "vehicleShielding"}, {"num_of_passenger", "numOfPassenger"}, {"desc_of_rear_item", "descOfRearItem"}, {"vehicle_class", "vehicleClass"}, {"vehicle_model", "vehicleModel"}, {"is_decked", "isDecked"}, {"hit_mark_info", "hitMarkInfo"}, {"direction", "direction"}, {"car_of_vehicle", "carOfVehicle"}, {"sourceID", "sourceid"}, {"vehicle_color", "vehicleColor"}, {"plate_class", "plateClass"}, {"plate_no", "plateNo"}, {"right_btm_x", "rightBtmX"}, {"vehicle_body_desc", "vehicleBodyDesc"}, {"vehicle_door", "vehicleDoor"}, {"right_btm_y", "rightBtmY"}, {"storage_url4", "storageUrl4"}, {"storage_url5", "storageUrl5"}, {"sunvisor", "sunvisor"}, {"vehicle_length", "vehicleLength"}, {"vehicle_width", "vehicleWidth"}, {"info_kind", "infoKind"}, {"calling", "calling"}, {"vehicle_hood", "vehicleHood"}, {"page_no", "pageNo"}, {"page_size", "pageSize"}, {"count_day", "countDay"}, {"count_hour", "countHour"}, {"count_month", "countMonth"}, {"qy_code", "qyCode"}, {"gs_code", "gsCode"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return vehicleMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public long count() {
        return this.count(null, false);
    }

    @Override
    public long count(String condition, Object[] values) {
        return this.count(null, condition, values, false);
    }

    @Override
    public long count(String[] parameters, boolean isDistinct) {
        return this.count(parameters, null, null, isDistinct);
    }

    @Override
    public long count(String[] parameters, String condition, Object[] values, boolean isDistinct) {
        return vehicleMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }

}
