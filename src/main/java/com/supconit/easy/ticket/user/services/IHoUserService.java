package com.supconit.easy.ticket.user.services;

import com.supconit.easy.ticket.user.entities.HoUser;
import com.supconit.easy.ticket.util.pager.PageInfo;

import java.util.List;
import java.util.Map;


public interface IHoUserService {
    boolean save(HoUser hoUser);

    boolean update(HoUser hoUser);

    boolean delete(Long id);

    boolean batchDelete(Long[] primaryKeys);

    HoUser findModel(Long id);

    HoUser findModel(Long id, String[] parameters);

    Map<String, Object> findMap(Long id);

    Map<String, Object> findMap(Long id, String[][] parameters);

    List<HoUser> loadModels();

    List<HoUser> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<HoUser> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<HoUser> findAllByCondition(HoUser condition);
    long count();

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
    //分页查询
//    List<HoUser> findByPage(long  pageNo,long pageSize,HoUser condition);
    List<HoUser> findByPage(HoUser condition);

    long getCount();
}
