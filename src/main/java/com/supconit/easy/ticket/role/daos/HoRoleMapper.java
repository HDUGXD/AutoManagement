package com.supconit.easy.ticket.role.daos;

import java.util.List;
import java.util.Map;

import com.supconit.easy.ticket.role.entities.HoRole;
import org.springframework.data.repository.query.Param;


public interface HoRoleMapper {
    int deleteByPrimaryKey(@Param("id") Long id);

    int deleteByPrimaryKeys(@Param("primaryKeys") Long[] primaryKeys);

    int insert(HoRole record);

    int insertSelective(HoRole record);

    HoRole selectByPrimaryKey(@Param("id") Long id);

    int updateByPrimaryKeySelective(HoRole record);

    int updateByPrimaryKey(HoRole record);

    List<HoRole> loadModels(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    List<Map<String, Object>> loadMaps(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    long count(@Param("parameters") String parameters, @Param("condition") String condition, @Param("isDistinct") boolean isDistinct);

    HoRole findModel(@Param("id") Long id, @Param("parameters") String parameters);

    Map<String, Object> findMap(@Param("id") Long id, @Param("parameters") String parameters);
}
