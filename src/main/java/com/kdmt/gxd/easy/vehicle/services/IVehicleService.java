package com.kdmt.gxd.easy.vehicle.services;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.vehicle.entities.Vehicle;

public interface IVehicleService {
    boolean save(Vehicle vehicle);

    boolean update(Vehicle vehicle);

    boolean delete(String id);

    boolean batchDelete(String[] primaryKeys);

    Vehicle findModel(String id);

    Vehicle findModel(String id, String[] parameters);

    Map<String, Object> findMap(String id);

    Map<String, Object> findMap(String id, String[][] parameters);

    List<Vehicle> loadModels();

    List<Vehicle> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Vehicle> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    long count();

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
}
