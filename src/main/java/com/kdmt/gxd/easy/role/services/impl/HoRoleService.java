package com.kdmt.gxd.easy.role.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kdmt.gxd.easy.role.entities.HoRole;
import com.kdmt.gxd.easy.util.util.SqlUtil;
import com.kdmt.gxd.easy.role.daos.HoRoleMapper;
import com.kdmt.gxd.easy.role.services.IHoRoleService;
import org.springframework.stereotype.Service;


@Service
public class HoRoleService implements IHoRoleService {
    @Resource(name="hoRoleMapper")
    private HoRoleMapper hoRoleMapper;

    @Override
    public boolean save(HoRole hoRole) {
        return hoRoleMapper.insert(hoRole) > 0;
    }

    @Override
    public boolean update(HoRole hoRole) {
        return hoRoleMapper.updateByPrimaryKeySelective(hoRole) >= 0;
    }

    @Override
    public boolean delete(Long id) {
        return hoRoleMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public boolean batchDelete(Long[] primaryKeys) {
        return hoRoleMapper.deleteByPrimaryKeys(primaryKeys) > 0;
    }

    @Override
    public HoRole findModel(Long id) {
        return hoRoleMapper.selectByPrimaryKey(id);
    }

    @Override
    public HoRole findModel(Long id, String[] parameters) {
        return hoRoleMapper.findModel(id, SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap(Long id) {
        String[][] parameters = {{"id", "id"}, {"name", "name"}, {"type", "type"}};
        return this.findMap(id, parameters);
    }

    public Map<String, Object> findMap(Long id, String[][] parameters) {
        return hoRoleMapper.findMap(id, SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<HoRole> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<HoRole> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<HoRole> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoRoleMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"id", "id"}, {"name", "name"}, {"type", "type"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"id", "id"}, {"name", "name"}, {"type", "type"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoRoleMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
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
        return hoRoleMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }
    @Override
    public List<HoRole> findByPage(HoRole condition) {
        return hoRoleMapper.findByPage(condition);
    }
    @Override
    public long getCount() {
        return hoRoleMapper.getCount();
    }
    @Override
    public List<HoRole> findAllByCondition(HoRole condition) {
        return hoRoleMapper.findAllByCondition(condition);
    }


}
