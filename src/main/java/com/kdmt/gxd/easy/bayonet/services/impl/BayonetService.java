package com.kdmt.gxd.easy.bayonet.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kdmt.gxd.easy.bayonet.daos.BayonetMapper;
import com.kdmt.gxd.easy.bayonet.entities.Bayonet;
import com.kdmt.gxd.easy.bayonet.services.IBayonetService;
import com.kdmt.gxd.easy.util.util.SqlUtil;
import org.springframework.stereotype.Service;



@Service
public class BayonetService implements IBayonetService {
    @Resource(name="bayonetMapper")
    private BayonetMapper bayonetMapper;

    @Override
    public boolean save(Bayonet bayonet) {
        return bayonetMapper.insert(bayonet) > 0;
    }

    @Override
    public boolean update(Bayonet bayonet) {
        return bayonetMapper.updateByPrimaryKeySelective(bayonet) >= 0;
    }

    @Override
    public boolean delete(Long id) {
        return bayonetMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public boolean batchDelete(Long[] primaryKeys) {
        return bayonetMapper.deleteByPrimaryKeys(primaryKeys) > 0;
    }

    @Override
    public Bayonet findModel(Long id) {
        return bayonetMapper.selectByPrimaryKey(id);
    }

    @Override
    public Bayonet findModel(Long id, String[] parameters) {
        return bayonetMapper.findModel(id, SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap(Long id) {
        String[][] parameters = {{"id", "id"}, {"device_id", "deviceId"}, {"agency_id", "agencyId"}, {"agency_key", "agencyKey"}, {"passport_name", "passportName"}, {"direction_name", "directionName"}, {"way_id", "wayId"}, {"way_name", "wayName"}, {"passtime", "passtime"}, {"plate_number", "plateNumber"}, {"plate_color", "plateColor"}, {"plate_type", "plateType"}, {"car_type", "carType"}, {"car_logo", "carLogo"}, {"car_model", "carModel"}, {"car_color", "carColor"}, {"car_length", "carLength"}, {"first_pic_path", "firstPicPath"}, {"second_pic_path", "secondPicPath"}, {"reserve_pic_path", "reservePicPath"}, {"speed", "speed"}, {"max_limit_speed", "maxLimitSpeed"}, {"min_limit_speed", "minLimitSpeed"}, {"little_area", "littleArea"}, {"first_pic", "firstPic"}, {"second_pic", "secondPic"}, {"reserve_pic", "reservePic"}, {"car_no_confide", "carNoConfide"}, {"car_rect", "carRect"}, {"bz1", "bz1"}, {"bz2", "bz2"}, {"page_no", "pageNo"}, {"page_size", "pageSize"}, {"count_day", "countDay"}, {"count_hour", "countHour"}, {"count_month", "countMonth"}, {"qy_code", "qyCode"}, {"gs_code", "gsCode"}};
        return this.findMap(id, parameters);
    }

    public Map<String, Object> findMap(Long id, String[][] parameters) {
        return bayonetMapper.findMap(id, SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<Bayonet> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<Bayonet> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Bayonet> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return bayonetMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"id", "id"}, {"device_id", "deviceId"}, {"agency_id", "agencyId"}, {"agency_key", "agencyKey"}, {"passport_name", "passportName"}, {"direction_name", "directionName"}, {"way_id", "wayId"}, {"way_name", "wayName"}, {"passtime", "passtime"}, {"plate_number", "plateNumber"}, {"plate_color", "plateColor"}, {"plate_type", "plateType"}, {"car_type", "carType"}, {"car_logo", "carLogo"}, {"car_model", "carModel"}, {"car_color", "carColor"}, {"car_length", "carLength"}, {"first_pic_path", "firstPicPath"}, {"second_pic_path", "secondPicPath"}, {"reserve_pic_path", "reservePicPath"}, {"speed", "speed"}, {"max_limit_speed", "maxLimitSpeed"}, {"min_limit_speed", "minLimitSpeed"}, {"little_area", "littleArea"}, {"first_pic", "firstPic"}, {"second_pic", "secondPic"}, {"reserve_pic", "reservePic"}, {"car_no_confide", "carNoConfide"}, {"car_rect", "carRect"}, {"bz1", "bz1"}, {"bz2", "bz2"}, {"page_no", "pageNo"}, {"page_size", "pageSize"}, {"count_day", "countDay"}, {"count_hour", "countHour"}, {"count_month", "countMonth"}, {"qy_code", "qyCode"}, {"gs_code", "gsCode"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"id", "id"}, {"device_id", "deviceId"}, {"agency_id", "agencyId"}, {"agency_key", "agencyKey"}, {"passport_name", "passportName"}, {"direction_name", "directionName"}, {"way_id", "wayId"}, {"way_name", "wayName"}, {"passtime", "passtime"}, {"plate_number", "plateNumber"}, {"plate_color", "plateColor"}, {"plate_type", "plateType"}, {"car_type", "carType"}, {"car_logo", "carLogo"}, {"car_model", "carModel"}, {"car_color", "carColor"}, {"car_length", "carLength"}, {"first_pic_path", "firstPicPath"}, {"second_pic_path", "secondPicPath"}, {"reserve_pic_path", "reservePicPath"}, {"speed", "speed"}, {"max_limit_speed", "maxLimitSpeed"}, {"min_limit_speed", "minLimitSpeed"}, {"little_area", "littleArea"}, {"first_pic", "firstPic"}, {"second_pic", "secondPic"}, {"reserve_pic", "reservePic"}, {"car_no_confide", "carNoConfide"}, {"car_rect", "carRect"}, {"bz1", "bz1"}, {"bz2", "bz2"}, {"page_no", "pageNo"}, {"page_size", "pageSize"}, {"count_day", "countDay"}, {"count_hour", "countHour"}, {"count_month", "countMonth"}, {"qy_code", "qyCode"}, {"gs_code", "gsCode"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return bayonetMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
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
        return bayonetMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }

    //
    @Override
    public List<Bayonet> getEcharts_1(Bayonet condition) {
        return bayonetMapper.getEcharts_1(condition);
    }
    @Override
    public List<Bayonet> getEcharts_2(Bayonet condition) {
        return bayonetMapper.getEcharts_2(condition);
    }
    @Override
    public List<Bayonet> getEcharts_3(Bayonet condition) {
        return bayonetMapper.getEcharts_3(condition);
    }
    @Override
    public List<Bayonet> getEcharts_4(Bayonet condition) {
        return bayonetMapper.getEcharts_4(condition);
    }
    @Override
    public List<Bayonet> getEcharts_5(Bayonet condition) {
        return bayonetMapper.getEcharts_5(condition);
    }
    @Override
    public List<Bayonet> getEcharts_6(Bayonet condition) {
        return bayonetMapper.getEcharts_6(condition);
    }
    //分页查询
    @Override
    public List<Bayonet> findByPage(Bayonet condition) {
        return bayonetMapper.findByPage(condition);
    }
    @Override
    public long getCount() {
        return bayonetMapper.getCount();
    }
    @Override
    public List<Bayonet> findAllByCondition(Bayonet condition) {
        return bayonetMapper.findAllByCondition(condition);
    }


}
