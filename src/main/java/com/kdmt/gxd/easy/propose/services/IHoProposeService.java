package com.kdmt.gxd.easy.propose.services;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.propose.entities.HoPropose;

public interface IHoProposeService {
    boolean save(HoPropose hoPropose);

    boolean update(HoPropose hoPropose);

    boolean delete(Long id);

    boolean batchDelete(Long[] primaryKeys);

    HoPropose findModel(Long id);

    HoPropose findModel(Long id, String[] parameters);

    Map<String, Object> findMap(Long id);

    Map<String, Object> findMap(Long id, String[][] parameters);

    List<HoPropose> loadModels();

    List<HoPropose> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<HoPropose> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    long count();

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
    List<HoPropose> findByPage(HoPropose condition);

    long getCount();
    List<HoPropose> findAllByCondition(HoPropose condition);
}
