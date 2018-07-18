package com.supconit.easy.ticket.userRole.daos;

import java.util.List;
import java.util.Map;

import com.supconit.easy.ticket.userRole.entities.HoUserRole;
import org.apache.ibatis.annotations.Param;


public interface HoUserRoleMapper {
    int deleteByPrimaryKey();


    int insert(HoUserRole record);

    int insertSelective(HoUserRole record);

    HoUserRole selectByPrimaryKey();

    int updateByPrimaryKeySelective(HoUserRole record);

    int updateByPrimaryKey(HoUserRole record);

    List<HoUserRole> loadModels(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    List<Map<String, Object>> loadMaps(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    long count(@Param("parameters") String parameters, @Param("condition") String condition, @Param("isDistinct") boolean isDistinct);

    HoUserRole findModel(@Param("parameters") String parameters);

    Map<String, Object> findMap(@Param("parameters") String parameters);
}
