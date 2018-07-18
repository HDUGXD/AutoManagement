package com.supconit.easy.ticket.userRole.services;

import java.util.List;
import java.util.Map;

import com.supconit.easy.ticket.userRole.entities.HoUserRole;

public interface IHoUserRoleService {
    boolean save(HoUserRole hoUserRole);

    boolean update(HoUserRole hoUserRole);

    boolean delete();


    HoUserRole findModel();

    HoUserRole findModel(String[] parameters);

    Map<String, Object> findMap();

    Map<String, Object> findMap(String[][] parameters);

    List<HoUserRole> loadModels();

    List<HoUserRole> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<HoUserRole> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    long count();

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
}
