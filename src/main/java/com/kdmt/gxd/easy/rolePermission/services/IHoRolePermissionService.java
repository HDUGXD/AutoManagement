package com.kdmt.gxd.easy.rolePermission.services;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.rolePermission.entities.HoRolePermission;

public interface IHoRolePermissionService {
    boolean save(HoRolePermission hoRolePermission);

    boolean update(HoRolePermission hoRolePermission);

    boolean delete();


    HoRolePermission findModel();

    HoRolePermission findModel(String[] parameters);

    Map<String, Object> findMap();

    Map<String, Object> findMap(String[][] parameters);

    List<HoRolePermission> loadModels();

    List<HoRolePermission> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<HoRolePermission> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    long count();

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
}
