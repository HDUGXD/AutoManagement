package com.supconit.easy.ticket.rolePermission.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.supconit.easy.ticket.rolePermission.daos.HoRolePermissionMapper;
import com.supconit.easy.ticket.rolePermission.entities.HoRolePermission;
import com.supconit.easy.ticket.rolePermission.services.IHoRolePermissionService;
import com.supconit.easy.ticket.util.util.SqlUtil;
import org.springframework.stereotype.Service;



@Service
public class HoRolePermissionService implements IHoRolePermissionService {
    @Resource(name="hoRolePermissionMapper")
    private HoRolePermissionMapper hoRolePermissionMapper;

    @Override
    public boolean save(HoRolePermission hoRolePermission) {
        return hoRolePermissionMapper.insert(hoRolePermission) > 0;
    }

    @Override
    public boolean update(HoRolePermission hoRolePermission) {
        return hoRolePermissionMapper.updateByPrimaryKeySelective(hoRolePermission) >= 0;
    }

    @Override
    public boolean delete() {
        return hoRolePermissionMapper.deleteByPrimaryKey() > 0;
    }


    @Override
    public HoRolePermission findModel() {
        return hoRolePermissionMapper.selectByPrimaryKey();
    }

    @Override
    public HoRolePermission findModel(String[] parameters) {
        return hoRolePermissionMapper.findModel(SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap() {
        String[][] parameters = {{"rid", "rid"}, {"pid", "pid"}};
        return this.findMap(parameters);
    }

    public Map<String, Object> findMap(String[][] parameters) {
        return hoRolePermissionMapper.findMap(SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<HoRolePermission> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<HoRolePermission> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<HoRolePermission> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoRolePermissionMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"rid", "rid"}, {"pid", "pid"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"rid", "rid"}, {"pid", "pid"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoRolePermissionMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
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
        return hoRolePermissionMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }

}
