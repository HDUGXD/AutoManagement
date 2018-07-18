package com.supconit.easy.ticket.role.services;

import java.util.List;
import java.util.Map;

import com.supconit.easy.ticket.role.entities.HoRole;

public interface IHoRoleService {
    boolean save(HoRole hoRole);

    boolean update(HoRole hoRole);

    boolean delete(Long id);

    boolean batchDelete(Long[] primaryKeys);

    HoRole findModel(Long id);

    HoRole findModel(Long id, String[] parameters);

    Map<String, Object> findMap(Long id);

    Map<String, Object> findMap(Long id, String[][] parameters);

    List<HoRole> loadModels();

    List<HoRole> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<HoRole> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    long count();

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
}
