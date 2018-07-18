package com.supconit.easy.ticket.permission.daos;

import java.util.List;
import java.util.Map;

import com.supconit.easy.ticket.permission.entities.HoPermission;
import org.apache.ibatis.annotations.Param;

public interface HoPermissionMapper {
    int deleteByPrimaryKey(@Param("id") Long id);

    int deleteByPrimaryKeys(@Param("primaryKeys") Long[] primaryKeys);

    int insert(HoPermission record);

    int insertSelective(HoPermission record);

    HoPermission selectByPrimaryKey(@Param("id") Long id);

    int updateByPrimaryKeySelective(HoPermission record);

    int updateByPrimaryKey(HoPermission record);

    List<HoPermission> loadModels(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    List<Map<String, Object>> loadMaps(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    long count(@Param("parameters") String parameters, @Param("condition") String condition, @Param("isDistinct") boolean isDistinct);

    HoPermission findModel(@Param("id") Long id, @Param("parameters") String parameters);

    Map<String, Object> findMap(@Param("id") Long id, @Param("parameters") String parameters);
}
