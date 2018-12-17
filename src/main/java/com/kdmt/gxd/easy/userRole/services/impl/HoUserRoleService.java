package com.kdmt.gxd.easy.userRole.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kdmt.gxd.easy.userRole.daos.HoUserRoleMapper;
import com.kdmt.gxd.easy.userRole.services.IHoUserRoleService;
import com.kdmt.gxd.easy.util.util.SqlUtil;
import com.kdmt.gxd.easy.userRole.entities.HoUserRole;
import org.springframework.stereotype.Service;


@Service
public class HoUserRoleService implements IHoUserRoleService {
    @Resource(name="hoUserRoleMapper")
    private HoUserRoleMapper hoUserRoleMapper;

    @Override
    public boolean save(HoUserRole hoUserRole) {
        return hoUserRoleMapper.insert(hoUserRole) > 0;
    }

    @Override
    public boolean update(HoUserRole hoUserRole) {
        return hoUserRoleMapper.updateByPrimaryKeySelective(hoUserRole) >= 0;
    }

    @Override
    public boolean delete() {
        return hoUserRoleMapper.deleteByPrimaryKey() > 0;
    }


    @Override
    public HoUserRole findModel() {
        return hoUserRoleMapper.selectByPrimaryKey();
    }

    @Override
    public HoUserRole findModel(String[] parameters) {
        return hoUserRoleMapper.findModel(SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap() {
        String[][] parameters = {{"uid", "uid"}, {"rid", "rid"}};
        return this.findMap(parameters);
    }

    public Map<String, Object> findMap(String[][] parameters) {
        return hoUserRoleMapper.findMap(SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<HoUserRole> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<HoUserRole> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<HoUserRole> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoUserRoleMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"uid", "uid"}, {"rid", "rid"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"uid", "uid"}, {"rid", "rid"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoUserRoleMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
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
        return hoUserRoleMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }

}
