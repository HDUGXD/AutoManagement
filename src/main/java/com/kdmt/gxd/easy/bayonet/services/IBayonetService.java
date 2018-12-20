package com.kdmt.gxd.easy.bayonet.services;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.bayonet.entities.Bayonet;

public interface IBayonetService {
    boolean save(Bayonet bayonet);

    boolean update(Bayonet bayonet);

    boolean delete(Long id);

    boolean batchDelete(Long[] primaryKeys);

    Bayonet findModel(Long id);

    Bayonet findModel(Long id, String[] parameters);

    Map<String, Object> findMap(Long id);

    Map<String, Object> findMap(Long id, String[][] parameters);

    List<Bayonet> loadModels();

    List<Bayonet> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Bayonet> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    long count();

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
    List<Bayonet> getEcharts_1(Bayonet condition);
    List<Bayonet> getEcharts_2(Bayonet condition);
    List<Bayonet> getEcharts_3(Bayonet condition);
    List<Bayonet> getEcharts_4(Bayonet condition);
    List<Bayonet> getEcharts_5(Bayonet condition);
    List<Bayonet> getEcharts_6(Bayonet condition);
    List<Bayonet> findByPage(Bayonet condition);
    //条件查询
    List<Bayonet> findAllByCondition(Bayonet condition);


    //得到所有
    long getCount();

}
