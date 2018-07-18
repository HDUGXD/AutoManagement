package com.supconit.easy.ticket.permission.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.supconit.easy.ticket.permission.daos.HoPermissionMapper;
import com.supconit.easy.ticket.permission.entities.HoPermission;
import com.supconit.easy.ticket.permission.services.IHoPermissionService;
import com.supconit.easy.ticket.util.util.SqlUtil;
import org.springframework.stereotype.Service;


@Service
public class HoPermissionService implements IHoPermissionService {
    @Resource(name="hoPermissionMapper")
    private HoPermissionMapper hoPermissionMapper;

    @Override
    public boolean save(HoPermission hoPermission) {
        return hoPermissionMapper.insert(hoPermission) > 0;
    }

    @Override
    public boolean update(HoPermission hoPermission) {
        return hoPermissionMapper.updateByPrimaryKeySelective(hoPermission) >= 0;
    }

    @Override
    public boolean delete(Long id) {
        return hoPermissionMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public boolean batchDelete(Long[] primaryKeys) {
        return hoPermissionMapper.deleteByPrimaryKeys(primaryKeys) > 0;
    }

    @Override
    public HoPermission findModel(Long id) {
        return hoPermissionMapper.selectByPrimaryKey(id);
    }

    @Override
    public HoPermission findModel(Long id, String[] parameters) {
        return hoPermissionMapper.findModel(id, SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap(Long id) {
        String[][] parameters = {{"id", "id"}, {"url", "url"}, {"name", "name"}};
        return this.findMap(id, parameters);
    }

    public Map<String, Object> findMap(Long id, String[][] parameters) {
        return hoPermissionMapper.findMap(id, SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<HoPermission> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<HoPermission> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<HoPermission> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoPermissionMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"id", "id"}, {"url", "url"}, {"name", "name"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"id", "id"}, {"url", "url"}, {"name", "name"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoPermissionMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
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
        return hoPermissionMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }

}
