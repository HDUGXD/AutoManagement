package com.kdmt.gxd.easy.rolePermission.daos;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.rolePermission.entities.HoRolePermission;
import org.apache.ibatis.annotations.Param;

public interface HoRolePermissionMapper {
    int deleteByPrimaryKey();


    int insert(HoRolePermission record);

    int insertSelective(HoRolePermission record);

    HoRolePermission selectByPrimaryKey();

    int updateByPrimaryKeySelective(HoRolePermission record);

    int updateByPrimaryKey(HoRolePermission record);

    List<HoRolePermission> loadModels(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    List<Map<String, Object>> loadMaps(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    long count(@Param("parameters") String parameters, @Param("condition") String condition, @Param("isDistinct") boolean isDistinct);

    HoRolePermission findModel(@Param("parameters") String parameters);

    Map<String, Object> findMap(@Param("parameters") String parameters);
}
