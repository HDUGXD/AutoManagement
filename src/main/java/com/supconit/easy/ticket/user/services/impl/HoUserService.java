package com.supconit.easy.ticket.user.services.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.supconit.easy.ticket.user.daos.HoUserMapper;
import com.supconit.easy.ticket.user.entities.HoUser;
import com.supconit.easy.ticket.user.services.IHoUserService;
import com.supconit.easy.ticket.util.util.SqlUtil;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;


@Repository
@Service
public class HoUserService implements IHoUserService ,Serializable {
    @Resource(name="hoUserMapper")
    private HoUserMapper hoUserMapper;

    @Override
    public boolean save(HoUser hoUser) {
        return hoUserMapper.insert(hoUser) > 0;
    }

    @Override
    public boolean update(HoUser hoUser) {
        return hoUserMapper.updateByPrimaryKeySelective(hoUser) >= 0;
    }

    @Override
    public boolean delete(Long id) {
        return hoUserMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public boolean batchDelete(Long[] primaryKeys) {
        return hoUserMapper.deleteByPrimaryKeys(primaryKeys) > 0;
    }

    @Override
    public HoUser findModel(Long id) {
        return hoUserMapper.selectByPrimaryKey(id);
    }

    @Override
    public HoUser findModel(Long id, String[] parameters) {
        return hoUserMapper.findModel(id, SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap(Long id) {
        String[][] parameters = {{"id", "id"}, {"username", "username"}, {"email", "email"}, {"password", "password"}, {"create_time", "createTime"}, {"last_login_time", "lastLoginTime"}, {"status", "status"}, {"idcard", "idcard"}, {"department", "department"}, {"company", "company"}, {"phoneNumber", "phonenumber"}, {"remark", "remark"}};
        return this.findMap(id, parameters);
    }

    public Map<String, Object> findMap(Long id, String[][] parameters) {
        return hoUserMapper.findMap(id, SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<HoUser> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<HoUser> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<HoUser> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoUserMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"id", "id"}, {"username", "username"}, {"email", "email"}, {"password", "password"}, {"create_time", "createTime"}, {"last_login_time", "lastLoginTime"}, {"status", "status"}, {"idcard", "idcard"}, {"department", "department"}, {"company", "company"}, {"phoneNumber", "phonenumber"}, {"remark", "remark"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"id", "id"}, {"username", "username"}, {"email", "email"}, {"password", "password"}, {"create_time", "createTime"}, {"last_login_time", "lastLoginTime"}, {"status", "status"}, {"idcard", "idcard"}, {"department", "department"}, {"company", "company"}, {"phoneNumber", "phonenumber"}, {"remark", "remark"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return hoUserMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<HoUser> findAllByCondition(HoUser condition) {
        return hoUserMapper.findAllByCondition(condition);
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
        return hoUserMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }
    //分页查询
//    @Override
//    public List<HoUser> findByPage(long pageNo, long pageSize,HoUser condition) {
//        return hoUserMapper.findByPage(pageNo,pageSize,condition);
//    }
    @Override
    public List<HoUser> findByPage(HoUser condition) {
        return hoUserMapper.findByPage(condition);
    }
    @Override
    public long getCount() {
        return hoUserMapper.getCount();
    }


}
