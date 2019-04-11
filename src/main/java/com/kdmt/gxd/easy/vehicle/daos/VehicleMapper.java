package com.kdmt.gxd.easy.vehicle.daos;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;

import com.kdmt.gxd.easy.vehicle.entities.Vehicle;

public interface VehicleMapper {
    int deleteByPrimaryKey(@Param("id") String id);

    int deleteByPrimaryKeys(@Param("primaryKeys") String[] primaryKeys);

    int insert(Vehicle record);

    int insertSelective(Vehicle record);

    Vehicle selectByPrimaryKey(@Param("id") String id);

    int updateByPrimaryKeySelective(Vehicle record);

    int updateByPrimaryKey(Vehicle record);

    List<Vehicle> loadModels(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    List<Map<String, Object>> loadMaps(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    long count(@Param("parameters") String parameters, @Param("condition") String condition, @Param("isDistinct") boolean isDistinct);

    Vehicle findModel(@Param("id") String id, @Param("parameters") String parameters);

    Map<String, Object> findMap(@Param("id") String id, @Param("parameters") String parameters);
}
