package com.supconit.easy.ticket.permission.services;

import java.util.List;
import java.util.Map;

import com.supconit.easy.ticket.permission.entities.HoPermission;

public interface IHoPermissionService {
    boolean save(HoPermission hoPermission);

    boolean update(HoPermission hoPermission);

    boolean delete(Long id);

    boolean batchDelete(Long[] primaryKeys);

    HoPermission findModel(Long id);

    HoPermission findModel(Long id, String[] parameters);

    Map<String, Object> findMap(Long id);

    Map<String, Object> findMap(Long id, String[][] parameters);

    List<HoPermission> loadModels();

    List<HoPermission> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<HoPermission> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    long count();

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
}
