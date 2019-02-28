package com.kdmt.gxd.easy.propose.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kdmt.gxd.easy.util.beanUtil.SqlUtil;
import org.springframework.stereotype.Service;

import com.kdmt.gxd.easy.propose.entities.HoPropose;
import com.kdmt.gxd.easy.propose.daos.HoProposeMapper;
import com.kdmt.gxd.easy.propose.services.IHoProposeService;

@Service
public class HoProposeService implements IHoProposeService {
    @Resource(name="hoProposeMapper")
    private HoProposeMapper hoProposeMapper;

    @Override
    public boolean save(HoPropose hoPropose) {
        return hoProposeMapper.insert(hoPropose) > 0;
    }

    @Override
    public boolean update(HoPropose hoPropose) {
        return hoProposeMapper.updateByPrimaryKeySelective(hoPropose) >= 0;
    }

    @Override
    public boolean delete(Long id) {
        return hoProposeMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public boolean batchDelete(Long[] primaryKeys) {
        return hoProposeMapper.deleteByPrimaryKeys(primaryKeys) > 0;
    }

    @Override
    public HoPropose findModel(Long id) {
        return hoProposeMapper.selectByPrimaryKey(id);
    }

    @Override
    public HoPropose findModel(Long id, String[] parameters) {
        return hoProposeMapper.findModel(id, SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap(Long id) {
        String[][] parameters = {{"id", "id"}, {"propose_name", "proposeName"}, {"propose_code", "proposeCode"}, {"statu_code", "statuCode"}, {"start_person", "startPerson"}, {"start_time", "startTime"}, {"remark", "remark"}};
        return this.findMap(id, parameters);
    }

    public Map<String, Object> findMap(Long id, String[][] parameters) {
        return hoProposeMapper.findMap(id, SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<HoPropose> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<HoPropose> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<HoPropose> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoProposeMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"id", "id"}, {"propose_name", "proposeName"}, {"propose_code", "proposeCode"}, {"statu_code", "statuCode"}, {"start_person", "startPerson"}, {"start_time", "startTime"}, {"remark", "remark"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"id", "id"}, {"propose_name", "proposeName"}, {"propose_code", "proposeCode"}, {"statu_code", "statuCode"}, {"start_person", "startPerson"}, {"start_time", "startTime"}, {"remark", "remark"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoProposeMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
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
        return hoProposeMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }
    @Override
    public List<HoPropose> findByPage(HoPropose condition) {
        return hoProposeMapper.findByPage(condition);
    }
    @Override
    public long getCount() {
        return hoProposeMapper.getCount();
    }
    @Override
    public List<HoPropose> findAllByCondition(HoPropose condition) {
        return hoProposeMapper.findAllByCondition(condition);
    }
}
